import { useState } from "react";
import supabase from "../supabaseClient";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { nav } from "framer-motion/client";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // 🔹 Email Sign-Up
  const handleEmailSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      toast.error("Signed Up failed!" + error.message);
      console.error("Signup Error:", error.message);
      toast.error("Please try again !", { icon: "⚠️", duration: 2000 });
      setEmail("");
      setPassword("");
    } else {
      setLoading(false);
      toast.success("Signed Up successfully");
      toast("Please Confirm Your Email", { icon: "📧", duration: 8000 });
      setEmail("");
      setPassword("");
      navigate("/login");
    }
  };


  return (
    <div className="h-screen overflow-hidden bg-background w-full flex flex-col md:flex-row justify-start md:justify-center gap-20 ">
      <div id="left" className="hidden md:block w-1/2">
        <div className="relative h-full flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthcare Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-65"></div>
          </div>
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Better Care, Just a Click Away!{" "}
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Your personal health assistant—anytime, anywhere.
            </p>
            <button
              onClick={() => {
                navigate("/about");
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      <nav className="block md:hidden">
        <Navbar />
      </nav>
      <div
        id="right"
        className="w-full md:w-1/2 flex flex-col justify-center items-stretch space-x-2 md:items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 py-20 space-y-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Your Account
          </h2>

          {/* Email Signup */}
          <div className="space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              value={email}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              value={password}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEmailSignup}
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Please wait ..." : "Sign Up with Email"}
            </motion.button>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="absolute px-2 text-gray-500 bg-white">OR</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign In with Google
          </motion.button>

          {/* Phone Signup */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
