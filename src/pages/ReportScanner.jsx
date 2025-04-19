import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const ReportScanner = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setText('');
    setAnalysis('');
    setLoading(true);

    const fileType = selectedFile.type;

    if (fileType === 'application/pdf') {
      await handlePDF(selectedFile);
    } else if (fileType.startsWith('image/')) {
      await handleImage(selectedFile);
    } else {
      alert('Unsupported file type');
    }

    setLoading(false);
  };

  const handlePDF = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();

      // If content is empty, fallback to OCR
      if (content.items.length > 0) {
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      } else {
        const canvas = document.createElement('canvas');
        const viewport = page.getViewport({ scale: 2 });
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const imageData = canvas.toDataURL('image/png');
        const ocrResult = await Tesseract.recognize(imageData, 'eng');
        fullText += ocrResult.data.text + '\n';
      }
    }

    setText(fullText);
    analyzeReport(fullText);
  };

  const handleImage = async (imgFile) => {
    const imageData = URL.createObjectURL(imgFile);
    const result = await Tesseract.recognize(imageData, 'eng');
    setText(result.data.text);
    analyzeReport(result.data.text);
  };

//   const analyzeReport = async (textContent) => {
//     try {
//       const res = await fetch('https://your-gemini-api-endpoint.com/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`
//         },
//         body: JSON.stringify({
//           prompt: `Explain this medical report in a way that a normal person can easily understand:\n\n${textContent}`
//         })
//       });

//       const data = await res.json();
//       setAnalysis(data?.summary || data?.result || 'No summary returned.');
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setAnalysis('Error analyzing the report.');
//     }
//   };
const analyzeReport = async (textContent) => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Explain this medical report in simple, easy-to-understand terms for a non-medical person:\n\n${textContent}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await res.json();
      const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnalysis(result || 'No summary returned.');
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis('Error analyzing the report.');
    }
  };
  

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Medical Report</h2>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      {loading && <p className="text-blue-600 mt-4">Processing file...</p>}

      {text && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Extracted Text:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm max-h-64 overflow-auto">{text}</pre>
        </div>
      )}

      {analysis && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Simplified Report:</h3>
          <div className="bg-green-50 p-3 rounded border border-green-300">{analysis}</div>
        </div>
      )}
    </div>
  );
};

export default ReportScanner;
