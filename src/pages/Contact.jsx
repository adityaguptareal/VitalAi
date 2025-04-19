import { Import } from "lucide-react";
import React, { useState } from "react";
import supabase from "../supabaseClient";
import toast from "react-hot-toast";

function Contact() {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from("contactForm").insert([formData]); 
    if (error) {
      toast.success("Something went wrong",error.message);
      console.error(error);
      setResponse({ type: "error", message: error.message });
      setLoading(false);
      return;
    } else {
      setResponse({type:"success",message:"Form submitted successfully"});
      toast.success("Form submitted successfully");
      setFormData({name:"",email:"",message:""});
      setLoading(false);

      return;
    }

    // Handle form submission logic here

  };

  return (
    <div className="h-full bg-background w-full">
      <form
        className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-text-blue font-bold font-poppins text-center">
          Contact us
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block font-inter text-gray-700 font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-inter text-gray-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block font-inter text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
