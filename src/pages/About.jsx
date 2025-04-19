import { motion } from "framer-motion";
import { PhoneCall, HeartPulse, Mic, AlertTriangle, Camera, CalendarCheck } from "lucide-react";

const features = [
  { name: "Health Analyzer", description: "AI-powered symptom checker.", icon: <HeartPulse /> },
  { name: "Wound Scanner", description: "Detects wounds using camera AI.", icon: <Camera /> },
  { name: "Voice Assistant", description: "Hands-free health assistant.", icon: <Mic /> },
  { name: "Emergency SOS", description: "AI call assistant & report sharing.", icon: <AlertTriangle /> },
  { name: "Appointment Booking", description: "Find & book nearby clinics.", icon: <CalendarCheck /> },
  { name: "Emergency Contacts", description: "Quick access to emergency numbers.", icon: <PhoneCall /> },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1590416987174-07c40dd1bc29?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxoZWFsdGhjYXJlJTIwYXBwfGVufDB8fDB8fHwy"
          alt="Health App"
          className="w-full h-[400px] object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="text-4xl font-bold mb-2">
            Your AI-Powered Health Companion
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
            className="text-lg">
            Get quick, reliable, and AI-driven health support anytime, anywhere.
          </motion.p>
        </div>
      </div>

      {/* How It Helps Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">How Our App Helps</h2>
        <p className="text-lg text-gray-600">
          Our AI-based healthcare assistant provides instant symptom analysis, emergency support, and seamless doctor appointments, 
          ensuring you get timely care when needed.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <div className="text-blue-500 text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-lg mb-6">Have questions or need help? Contact us anytime.</p>
          <a href="mailto:support@healthapp.com"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
