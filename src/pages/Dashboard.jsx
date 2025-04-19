import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { toast } from "react-hot-toast";
import {
  Home,
  User,
  Calendar,
  Plus,
  Mic,
  AlertTriangle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          toast.error(`Error fetching user: ${error.message}`);
          console.error(`Error fetching user: ${error.message}`);
          navigate("/login");
          return;
        }
        if (!user) {
          toast.error("No user found");
          console.error("No user found");
          navigate("/login");
          return;
        }
        setUser(user);
        setUserName(user.email.split("@")[0]);
      } catch (error) {
        toast.error("Error fetching user:", error.message);
        console.error("Error fetching user:", error.message);
        navigate("/login");
      }
    };
    getUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-700 text-white flex flex-col items-center py-6 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="text-white w-6 h-6" />
        </button>
        <h1 className="text-3xl font-poppins font-bold mb-8">{import.meta.env.VITE_APP_NAME ||"SwasthVani"}</h1>
        <nav className="flex flex-col gap-4 w-full px-4">
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/dashboard")}
          >
            <Home />
            <span className="text-lg">Dashboard</span>
          </button>
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/profile")}
          >
            <User />
            <span className="text-lg">Profile</span>
          </button>
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/book-appointment")}
          >
            <Calendar />
            <span className="text-lg">Book Appointment</span>
          </button>
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/my-appointments")}
          >
            <Plus />
            <span className="text-lg">My Appointments</span>
          </button>
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/voice-commands")}
          >
            <Mic />
            <span className="text-lg">Voice Commands</span>
          </button>
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/emergency-sos")}
          >
            <AlertTriangle />
            <span className="text-lg">Emergency SOS</span>
          </button>
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-600 transition mt-auto"
            onClick={handleLogout}
          >
            <LogOut />
            <span className="text-lg">Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="text-blue-700 w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:ml-64">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
          Welcome, {userName || "User"}!
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Add your dashboard content here */}
          <p className="text-gray-600 text-lg">
            Dashboard content goes here. Add your widgets, charts, or other
            components to make this space more functional and engaging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
