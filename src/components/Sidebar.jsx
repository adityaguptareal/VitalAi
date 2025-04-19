import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  LogIn,
  LogOut,
  BookOpen,
  Users,
  Contact,
  Activity,
  Camera,
  Mic,
  MapPin,
  Video,
  AlertCircle,
  PhoneCall,
} from "lucide-react"; // Icons
import { useLocation } from "react-router-dom";
import supabase from "../supabaseClient";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state
  const navigate = useNavigate();

  // Sidebar menu items
  const menuItems = [
    { name: "Home", icon: <Home />, path: "/dashboard" },
    { name: "Health Analyzer", icon: <Activity />, path: "/dashboard/symptoms" },
    { name: "Wound Scanner", icon: <Camera />, path: "/dashboard/scan" },
    { name: "Voice Assistant", icon: <Mic />, path: "/dashboard/voice" },
    { name: "Find a Clinic", icon: <MapPin />, path: "/dashboard/appointments" },
    { name: "Doctor Connect", icon: <Video />, path: "/dashboard/help" },
    { name: "AI SOS Assistant", icon: <AlertCircle />, path: "/dashboard/sos" },
    { name: "Emergency Contacts", icon: <PhoneCall />, path: "/dashboard/contacts" }

    // { name: "Logout", icon: <LogOut />, path: "/" },
  ];
  const location = useLocation();

  // Function to check if the menu item is active
  const isActive = (path) => location.pathname === path;
  return (
    <div
      className={`h-screen bg-background text-grey transition-all px-2 duration-300 shadow-lg ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex justify-between items-center">
        {isOpen && (
          <h2 className="text-xl font-bold text-text-blue">
            {import.meta.env.VITE_APP_NAME || "SwatshVani"}
          </h2>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="text-text-blue">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-4">
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <div className="group">
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-2 rounded-md transition ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </div>
            </li>
          ))}
          <li
            onClick={async () => {
              let { error } = await supabase.auth.signOut();
              if (error) {
                toast.error("Error", error.message);
              } else {
                toast.success("Logged Out");
                navigate("/");
              }
            }}
            className={`flex items-center gap-4 px-4 py-2 cursor-pointer rounded-md transition ${
              isActive("/") ? "bg-primary text-white" : "hover:bg-blue-100"
            }`}
          >
            <LogOut />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
