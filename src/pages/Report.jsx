import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion'; // For subtle animations
import { HiArrowLeft } from 'react-icons/hi'; // For back button icon

const Report = () => {
  const location = useLocation();
  const reportData = location.state || 'No report data available'; // Fallback if no state is passed

  // Animation variants for smooth entrance
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  // Custom Markdown components for styling
  const markdownComponents = {
    h1: ({ children }) => <h3 className="text-3xl font-semibold text-teal-700 mb-4">{children}</h3>,
    h2: ({ children }) => <h4 className="text-2xl font-medium text-gray-800 mt-6 mb-3">{children}</h4>,
    p: ({ children }) => <p className="text-red-600 leading-relaxed mb-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 text-gray-800 mb-5">{children}</ul>,
    li: ({ children }) => <li className="mb-3">{children}</li>,
    strong: ({ children }) => <span className="font-bold text-teal-600 text-base">{children}</span>,
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-teal-50 to-white px-8 py-16 flex items-center justify-center">
      <motion.div
        className="max-w-4xl w-full bg-white rounded-3xl shadow-3xl p-16 border border-teal-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800">
            <span className="text-teal-600">MediScan</span> Health Report
          </h2>
          <p className="text-gray-600 mt-4 text-xl font-medium">
            AI-powered insights based on your medical image and symptoms
          </p>
        </div>

        {/* Report Content */}
        {typeof reportData === 'string' ? (
          <div className="space-y-10">
            <div className="border-t border-teal-200 pt-8">
              <ReactMarkdown components={markdownComponents}>{reportData}</ReactMarkdown>
            </div>

            {/* Disclaimer */}
            {/* <div className="mt-12 p-8 bg-amber-50 border border-amber-300 rounded-2xl">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Important Disclaimer</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                This report provides a possible diagnosis based on the submitted image and symptoms. MediScan is an AI tool and cannot offer definitive medical diagnoses. A proper diagnosis requires a physical examination and medical history review by a qualified healthcare professional. Do not self-treat based solely on this information. Please consult your physician for accurate diagnosis and treatment.
              </p>
            </div> */}
          </div>
        ) : (
          <div className="text-center text-red-600 bg-red-50 p-8 rounded-xl">
            <p className="text-xl font-semibold">No report data available. Please try submitting your symptoms again.</p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-xl font-semibold shadow-lg transition duration-300 transform hover:scale-105"
          >
            <HiArrowLeft className="mr-3 text-2xl group-hover:-translate-x-1 transition-transform" />
            Back to Symptom Check
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Report;
