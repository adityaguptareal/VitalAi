import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import AppointmentForm from "./AppointmentForm";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase.from("doctors").select("*").limit(5);

      if (error) {
        console.error("Error fetching doctors:", error.message);
      } else {
        setDoctors(data);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto p-4">

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialization}</p>
            <p className="text-gray-500">Experience: {doctor.experience} years</p>
            <p className="text-gray-500">Fees: ₹{doctor.fees}</p>
            <button
              onClick={() => setSelectedDoctor(doctor)}
              className="mt-3  text-primary bg-blue-100 hover:text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Step 1: Appointment Form as Overlay */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <AppointmentForm
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
