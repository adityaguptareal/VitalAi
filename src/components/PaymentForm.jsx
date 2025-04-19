import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import toast from "react-hot-toast";

const PaymentForm = ({ formData, doctor, onClose }) => {
  const [upiId, setUpiId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      setUserId(user.id);
    };
    fetchUserId();
  }, []);

  const handlePayment = () => {
    if (!upiId) {
      alert("Enter UPI ID!");
      return;
    }
    window.location.href = `upi://pay?pa=${upiId}&pn=Doctor Appointment&am=${doctor.fees}&cu=INR`;
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(file);  // Assuming `screenshot` is a state variable
    }
  };

  const handleSubmit = async () => {
    toast.loading("Submitting your appointment...");
    if (!screenshot) {
      alert("Please upload payment proof!");
      return;
    }
  
    // Upload payment proof to Supabase Storage
    const filePath = `payment_${Date.now()}_${screenshot.name}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from("paymentproofs") // Make sure this matches your bucket name in Supabase
      .upload(filePath, screenshot);
  
    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      alert("Failed to upload payment proof!");
      return;
    }
  
    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from("paymentproofs")
      .getPublicUrl(filePath);
    
    const paymentProofUrl = publicUrlData.publicUrl;
  
    // Save appointment details in Supabase Database
    const { data, error } = await supabase
      .from("appointments")
      .insert([{ 
        ...formData, 
        doctorid: doctor.id, 
        user_id: userId, // Link the appointment to the user
        upiId, 
        payment_proof_url: paymentProofUrl // Save file URL instead of file name
      }]);

    toast.dismiss(); // Dismiss the loading toast

    if (error) {
      console.error("Error saving appointment:", error.message);
      toast.error("Failed to save appointment!");
    } else {
      toast.success("Appointment booked successfully!");
      onClose();
    }
  };
  
  return (
    <div className="mt-4">
      <label className="block text-gray-700">Enter UPI ID</label>
      <input
        type="text"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Pay Now
      </button>

      <label className="block text-gray-700 mt-2">Upload Payment Proof</label>
      <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />

      <button
        onClick={handleSubmit}
        className={`mt-4 w-full text-white py-2 rounded ${uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={uploading}
      >
        {uploading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default PaymentForm;
