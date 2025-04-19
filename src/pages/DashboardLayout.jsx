import { use, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";


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
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
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

  if (!user) return (<p className="text-center">Dashboard Loading...</p>);

  return (
    <div className="flex bg-background">
      <Sidebar />
      <main className="flex-1 p-4">
        {/* <div className="flex justify-center items-center">Hello {userName || "user"}</div> */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
