import { useState } from "react";
import PaymentForm from "./PaymentForm";

const AppointmentForm = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_age: "",
    problem_description: "",
  });
  const [proceedToPayment, setProceedToPayment] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    if (!formData.patient_name || !formData.patient_age || !formData.problem_description) {
      alert("Please fill all fields!");
      return;
    }
    setProceedToPayment(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-2">
        Book with Dr. {doctor.name}
      </h2>
      <p className="text-gray-600">{doctor.specialization} | ₹{doctor.fees}</p>

      {!proceedToPayment ? (
        <div className="mt-4">
          <label className="block text-gray-700">Patient Name</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <label className="block text-gray-700 mt-2">Patient Age</label>
          <input
            type="number"
            name="patient_age"
            value={formData.patient_age}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <label className="block text-gray-700 mt-2">Describe Your Problem</label>
          <textarea
            name="problem_description"
            value={formData.problem_description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>

          <button
            onClick={handleProceed}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </div>
      ) : (
        <PaymentForm formData={formData} doctor={doctor} onClose={onClose} />
      )}
    </div>
  );
};

export default AppointmentForm;
