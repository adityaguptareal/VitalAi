import { useState, useEffect } from "react";
import supabase from "../supabaseClient"; // Ensure this is correctly configured
import toast from "react-hot-toast";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState({}); // Store doctor details in a dictionary

  // Fetch logged-in user's appointments
  const fetchAppointments = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) {
        setError("User not signed in.");
        return;
      }

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setAppointments(data);

      // Fetch doctors' details for appointments
      const doctorIds = [...new Set(data.map((appt) => appt.doctorid))];
      if (doctorIds.length > 0) {
        const { data: doctorData, error: doctorError } = await supabase
          .from("doctors")
          .select("*")
          .in("id", doctorIds); // Fetch doctor details

        if (doctorError) throw doctorError;

        // Store doctors in an object for quick lookup
        const doctorMap = {};
        doctorData.forEach((doctor) => {
          doctorMap[doctor.id] = doctor;
        });

        setDoctors(doctorMap);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    console.log(appointments);
  }, []);

  if (loading) return <div className="text-center py-8">Loading data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2> */}

      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              {/* <h3 className="font-bold text-md">{appointment.patient_name}</h3>
              <p className="text-gray-600">Age: {appointment.patient_age}</p> */}
              <p className="text-gray-600">
              <span className="font-semibold">Scheduled</span>: {new Date(appointment.created_at).toISOString().split("T")[0]}
              </p>
              <p className="text-gray-600"><span className="font-semibold">Status</span>: {appointment.status}</p>
              <p className="text-gray-600"><span className="font-semibold">Meeting Code</span>: {appointment.zego_room_id}</p>

              {/* Display Doctor's Name if Found */}
              <p className="text-gray-600">
                <span className="font-semibold">Doctor</span>:{" "}
                {doctors[appointment.doctorid]
                  ? doctors[appointment.doctorid].name
                  : "Unknown"}
              </p>

            
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsList;
