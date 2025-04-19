import "./App.css";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactForm from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import DashboardLayout from "./pages/DashboardLayout";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import HealthAnalyzer from "./pages/HealthAnalyzer";
import WoundScanner from "./pages/WoundScanner";
import VoiceAssistant from "./pages/VoiceAssistant";
import FindClinic from "./pages/FindClinic";
import DoctorConnect from "./pages/DoctorConnect";
import AiSosAssistant from "./pages/AiSosAssistant";
import EmergencyContacts from "./pages/EmergencyContacts";
import AppointmentsList from "./pages/AppointmentsList";


function App() {
  return (
    <>
     
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactForm/>}/>
        </Route>
        {/* without nav & footer */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<DashboardLayout/>}>
        <Route index element={<UserDashboard />} />
          <Route path="symptoms" element={<HealthAnalyzer />} />
          <Route path="scan" element={<WoundScanner />} />
          <Route path="voice" element={<VoiceAssistant />} />
          <Route path="appointments" element={<FindClinic />} />
          <Route path="help" element={<DoctorConnect />} />
          <Route path="sos" element={<AiSosAssistant />} />
          <Route path="contacts" element={<EmergencyContacts />} />
          <Route path="my" element={<AppointmentsList />} />
        </Route>
        <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />

    </>
  );
}

export default App;
