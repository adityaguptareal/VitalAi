import { React, use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import supabase from "../supabaseClient";
import Navbar from "../components/Navbar";
function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    gettingUser()
  },[])

const gettingUser=async()=>{
  const {data:{user}}=await supabase.auth.getUser();
  if(user){
    navigate('/dashboard');
    r;
  }else{
    return
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setLoading(false);
      toast.error("Login failed!" + error.message);
      console.error("Login Error:", error.message);
      setEmail("");
      setPassword("");
      return;
    } else {
      setLoading(false);
      toast.success("Login successful");
      navigate("/dashboard");
      setEmail("");
      setPassword("");
      return;
    }

  
  };

  return (
    <>
      <div className="h-screen overflow-hidden bg-background w-full flex flex-col md:flex-row justify-start md:justify-center gap-20">
        <div id="left" className="hidden md:block w-1/2">
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1478476868527-002ae3f3e159?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Healthcare Background"
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative z-10 text-center text-white px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to {import.meta.env.VITE_APP_NAME ||"SwasthVani"}
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Seamless healthcare access, just a click away!
              </p>
              <button onClick={() => {
                navigate("/about");
              }} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <nav className="block md:hidden">
          <Navbar />
        </nav>
        <div id="right" className="w-full md:w-1/2 flex flex-col justify-center items-stretch space-x-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-8 py-20 space-y-6 bg-white rounded-lg shadow-lg"
          >
            <div className=" p-8 rounded-lg  w-full ">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Login to {import.meta.env.VITE_APP_NAME ||"SwasthVani"}
              </h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Loading in..." : "Login"}
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Login;
