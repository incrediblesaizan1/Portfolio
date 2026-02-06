import TechIcon from "@/components/TechIcon";
import TitleHeader from "@/components/TitleHeader";
import { iconsList } from "@/data/index";
import { motion } from "framer-motion";

const TechStack = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section id="techstack" className="overflow-hidden md:mt-50">
      <div className="mt-5 ">
        <div className="relative md:left-10 md:w-[95vw] md:left-2">
          <TitleHeader
            title="TECH STACK"
            number="04"
            text="My Go-To Tools for Crafting Solutions"
          />
        </div>
        <div className="md:mt-10 mt-8 flex justify-center items-center md:mx-10">
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4  md:grid-cols-6 lg:grid-cols-10 gap-4 justify-items-center w-full px-15 md:px-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {iconsList.map((icon, index) => (
              <motion.div key={index} variants={item}>
                <TechIcon icon={icon} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
