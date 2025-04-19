import { motion } from "framer-motion";
import Button from "./Button";
import Piles from "./Piles";
import Stats from "./Stats";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import {useNavigate} from 'react-router-dom'
import { nav } from "framer-motion/client";

const Hero = () => {
  const navigate = useNavigate()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };



  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-10">
   <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center flex flex-col justify-self-center items-center ">
          <Piles>AI-Powered Healthcare</Piles>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold  text-primary font-montserrat mb-6"
            variants={itemVariants}
          >
            Your AI-Powered
            <span className="text-gray-700 block">Health Companion</span>
          </motion.h1>
          <motion.p
            className=" text-grey font-poppins text-md mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Experience a future where AI meets healthcare, providing
            personalized medical guidance and support 24/7.
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Button onClick={()=>{
              navigate("/signup")
            }} size="large">
              Get Started <ArrowRight color="#ffffff" size="20" />{" "}
            </Button>
            <Button onClick={()=>{
              navigate("/signup")
            }} variant="withoutOutline" size="large">
              <span className="group flex items-center gap-1">
                Check Symptoms{" "}
                <CircleCheckBig size="20" className="group-hover:text-white" />
              </span>
            </Button>
          </motion.div>
          <motion.div className="mt-16" variants={itemVariants}>
            <img
              src="https://images.unsplash.com/photo-1609188076864-c35269136b09?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AI Health Assistant"
              className="max-w-5xl mx-auto w-full rounded-2xl"
            />
          </motion.div>
        </div>
      </motion.div>
      <Stats/>
    </section>
  );
};

export default Hero;
