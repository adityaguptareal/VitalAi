import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    {
      value: '99.8%',
      label: 'Accuracy Rate',
      description: 'AI-powered diagnosis accuracy'
    },
    {
      value: '24/7',
      label: 'Availability',
      description: 'Round-the-clock healthcare support'
    },
    {
      value: '10k+',
      label: 'Medical Conditions',
      description: 'Active platform users'
    },
  
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
    <section className="py-20 bg-background ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 justify-center items-center">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl py-6 px-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-4xl md:text-4xl font-bold text-primary font-montserrat mb-2">
                  {stat.value}
                </div>
               
                <p className="text-grey font-poppins text-sm">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;