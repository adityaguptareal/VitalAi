import React, { useState } from "react";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { GoogleGenAI } from "@google/genai";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";

// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ReportScanner = () => {
  const [summary, setSummary] = useState(""); // Will store simplified output
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const processFile = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      let extractedText = "";

      if (file.type === "application/pdf") {
        extractedText = await extractTextFromPDF(file);
      } else if (file.type.startsWith("image/")) {
        extractedText = await extractTextFromImage(file);
      } else {
        toast.error("Please upload a PDF or image file.");
        return;
      }

      await analyzeTextWithGemini(extractedText);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromImage = async (file) => {
    const image = URL.createObjectURL(file);
    const result = await Tesseract.recognize(image, "eng");
    return result.data.text;
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let extracted = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 2 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      const dataUrl = canvas.toDataURL("image/png");
      const result = await Tesseract.recognize(dataUrl, "eng");
      extracted += result.data.text + "\n";
    }

    return extracted;
  };

  const analyzeTextWithGemini = async (inputText) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You are a friendly Indian medical assistant.

Read the medical report below and give a very short summary in clear, simple English. Follow these rules:

- Do **not** describe every line or test in the report.
- Just tell the **main health issue(s)** found in the report.
- Use **bullet points** with simple words so that any Indian person without medical knowledge can understand.
- Explain any medical terms briefly if used.
- Give **basic advice** on what the person should do next (like diet, lifestyle, or seeing a doctor).

Make sure the whole summary is short, focused, and helpful.

Report:

${inputText}
                `,
              },
            ],
          },
        ],
      });

      const resultText = response.candidates[0].content.parts[0].text;
      setSummary(resultText);
    } catch (error) {
      console.error("Gemini API error:", error);
      toast.error("Error analyzing with Gemini.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Report Simplifier</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF or Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" accept="application/pdf,image/*" onChange={handleFileUpload} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF or Image files only</p>
                    {file && <p className="text-sm text-gray-600 mt-2">Selected: {file.name}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={processFile}
                  disabled={!file || loading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                    loading || !file ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Simplify Medical Report"
                  )}
                </button>
              </div>

              {summary && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-green-800 mb-3">📝 Easy Summary:</h3>
                  <div className="bg-green-50 border-l-4 border-green-400 rounded-md p-4 text-gray-800 text-sm font-medium leading-relaxed">
                    <ReactMarkdown>{summary}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportScanner;
