import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Ban, Plus, ScanText } from "lucide-react";

function HealthAnalyzer() {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined Symptoms
  const symptomOptions = ["Fever", "Cough", "Headache", "Fatigue", "Shortness of breath"];

  // Add symptom (predefined or custom)
  const addSymptom = (symptom) => {
    if (symptom.trim() && !selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom.trim()]);
    }
    setInputValue(""); // Clear input field
  };

  // Remove symptom
  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  // Call API for diagnosis
  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom!");
      return;
    }

    setLoading(true);
    setError(null);
    setDiagnosis(null);

    // Show loading toast
    const toastId = toast.loading("Analyzing symptoms, please wait...");

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/Zabihin/Symptom_to_Diagnosis",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: selectedSymptoms.join(", ") }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      if (Array.isArray(result) && result.length > 0) {
        const sortedResults = result[0].sort((a, b) => b.score - a.score);
        setDiagnosis(sortedResults);
        console.log(result);
      } else {
        setDiagnosis([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch diagnosis. Please try again.");
    } finally {
      setLoading(false);
      setStep(4);
      toast.dismiss(toastId); // Dismiss the loading toast
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">🩺 Health Analyzer</h1>

        {/* Step 1: Symptom Selection */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold mb-3">Select Symptoms:</h2>
            <div className="grid grid-cols-2 gap-2">
              {symptomOptions.map((symptom) => (
                <motion.button
                  key={symptom}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-2 rounded-lg border ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-200"
                  }`}
                  onClick={() => addSymptom(symptom)}
                >
                  {symptom}
                </motion.button>
              ))}
            </div>

            {/* Custom Symptom Input */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add custom symptom..."
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <button
                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary"
                onClick={() => addSymptom(inputValue)}
              >
                    <Plus size={20} />
              </button>
            </div>

            {/* Display Selected Symptoms */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedSymptoms.map((symptom, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer"
                  onClick={() => removeSymptom(symptom)}
                >
                 <span className="flex items-center gap-2"> {symptom} <Ban size={16} /></span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={selectedSymptoms.length === 0}
            >
              Next ➡️
            </button>
          </motion.div>
        )}

        {/* Step 2: Review Symptoms */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold text-center mb-4 text-blue-600">Your Selected Symptoms:</h2>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {selectedSymptoms.map((symptom, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full shadow-md cursor-pointer"
              onClick={() => removeSymptom(symptom)}
            >
              <span className="flex items-center gap-2">
                {symptom} <Ban size={16} />
              </span>
            </motion.div>
                ))}
              </div>

              <div className="mt-6 flex gap-4 justify-center">
                <button
            onClick={() => setStep(1)}
            className="w-1/3 bg-gray-400 text-white px-4 py-3 rounded-lg hover:bg-gray-500 shadow-md transition-all duration-200"
                >
            ⬅️ Back
                </button>
                <button
            onClick={analyzeSymptoms}
            className="w-1/3 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-3 flex gap-2 rounded-lg hover:from-green-500 hover:to-green-700 shadow-md transition-all duration-200"
                >
            Analyze <ScanText size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Loading Animation */}
        {step === 3 && loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold text-center">Analyzing... ⏳</h2>
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Diagnosis Result */}
        {step === 4 && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold">🔬 Diagnosis Results:</h2>
            {error ? (
              <p className="text-red-600 mt-2">{error}</p>
            ) : (
              <ul className="mt-2">
                {diagnosis && diagnosis.length > 0 ? (
                  diagnosis.slice(0, 5).map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.label}</span>
                      <span className="font-bold text-blue-600">
                        {(item.score * 100).toFixed(2)}%
                      </span>
                    </li>
                  ))
                ) : (
                  <p>No diagnosis found. Try again.</p>
                )}
              </ul>
            )}

            <button
              onClick={() => setStep(1)}
              className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Restart 🔄
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default HealthAnalyzer;
