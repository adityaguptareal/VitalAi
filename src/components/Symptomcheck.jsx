import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineUpload } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SymptomCheck = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const imageFile = watch('image');
  const navigate = useNavigate(); // 🧭 React Router navigation
//   const { isLoaded, isSignedIn, user } = useUser();
//   if ( !isLoaded && !isSignedIn ||  !user) {
//     return <RedirectToSignIn />;
//   }
  
  const onSubmit = async (data) => {
  
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("symptoms", data.symptoms);
    // formData.append("userId", user.id);
    // formData.append("email", user.primaryEmailAddress?.emailAddress || "");
    // formData.append("fullName", `${user.firstName || ""} ${user.lastName || ""}`.trim());

    try {
      setLoading(true);
      const res = await axios.post("https://mediscan-backend-rvc7.onrender.com/symptom-check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const resultData = res.data;
      // console.log( resultData.result.parts[0].text);

      // Redirect to /reports with result as state
      navigate('/reports', { state: resultData.result.parts[0].text });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      console.error("Diagnosis error:", errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-white px-6 py-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 border border-teal-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Welcome to <span className="text-teal-600">MediScan</span>
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Upload your medical image and describe your symptoms to get instant AI-powered health insights.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Medical Image</label>
            <label className="cursor-pointer block">
              {imageFile?.[0] ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(imageFile[0])}
                    alt="Uploaded preview"
                    className="rounded-xl w-full max-h-72 object-contain border border-teal-300"
                  />
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-teal-400 rounded-xl p-6 flex flex-col items-center justify-center bg-teal-50 hover:bg-teal-100 transition duration-200">
                  <HiOutlineUpload className="text-4xl text-teal-600 mb-2" />
                  <p className="text-gray-600 text-sm">Click or drag & drop your image here</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                className="hidden"
              />
            </label>
            {errors.image && <p className="text-red-600 text-sm mt-2">{errors.image.message}</p>}
          </div>

          {/* Symptom Textarea */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Symptom Description</label>
            <textarea
              rows="4"
              placeholder="e.g., Red rash, itching, and swelling on the forearm"
              {...register("symptoms", {
                required: "Symptom description is required",
                minLength: { value: 5, message: "Enter at least 5 characters" },
              })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            {errors.symptoms && <p className="text-red-600 text-sm mt-2">{errors.symptoms.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold shadow transition duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Diagnosing..." : "Diagnose with MediScan"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SymptomCheck;
