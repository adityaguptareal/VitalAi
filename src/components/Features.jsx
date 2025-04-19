import { motion } from 'framer-motion';
import Piles from './Piles';
import { Brain, CircleAlert, Mic, Video } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'AI Powered Health Analysis',
      description: 'Advanced AI algorithms analyze your health data to provide personalized insights and recommendations.',
      icon: <Brain color="#2986EB"  size={36}/>
    },
    {
      title: 'Virtual Health Checkup',
      description: 'Get instant health assessments and preliminary diagnoses through our AI-driven system.',
      icon: <Video size={36} color="#2986EB" />
    },
    {
      title: 'Emergency SOS Alerts',
      description: 'Quick emergency response system with real-time location tracking and medical history access.',
      icon: <CircleAlert size={36} color="#2986EB" />
    },
    {
      title: 'Smart Health Records',
      description: 'Digitized health records with secure storage and easy access for better healthcare management.',
      icon: <Mic size={36} color="#2986EB" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center ">
        <Piles>Core Features</Piles>
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          >
          <motion.h2
            className="text-3xl md:text4x-xl font-bold text-text-blue font-montserrat mb-4"
            variants={itemVariants}
            >
            Advanced AI Technology
            <span className="text-grey block">for Your Healthcare Needs</span>
          </motion.h2>
          <motion.p
            className="text-y font-poppins max-w-[580px] mx-auto"
            variants={itemVariants}
          >
            Discover how our AI-powered platform revolutionizes healthcare delivery and patient care.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4 bg-blue-100 rounded-lg p-2 w-fit">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 font-montserrat mb-2">
                {feature.title}
              </h3>
              <p className="text-grey text-sm  font-poppins">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;