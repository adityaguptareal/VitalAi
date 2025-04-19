import { motion } from 'framer-motion';


const Experience = () => {
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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg">
        <div className="flex flex-col items-center mb-8">

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-text-blue text-center md:text-left font-montserrat"
            >
              Experience the Future of
              <span className="text-grey block">Healthcare with AI</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-grey font-poppins"
            >
              Our proprietary AI algorithm has been trained on millions of medical cases and continuously
              learns from new data. It provides a preliminary analysis to help you make informed decisions
              about your health.
            </motion.p>
            <motion.ul
              variants={containerVariants}
              className="space-y-4  text-sm"
            >
              {[
                'Medical-grade accuracy',
                'HIPAA compliant',
                'Regular updates',
                'Personalized insights'
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-2 text-grey font-poppins"
                > 
                  <span className="w-2 h-2 bg-text-blue rounded-full" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2340&auto=format&fit=crop"
              alt="Modern Medical Facility"
              className="rounded-2xl shadow-xl w-full  object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;