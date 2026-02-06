"use client";
import { motion } from "framer-motion";

const TitleHeader = ({ title, number, text }) => {
  return (
    <div className="flex justify-between items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="gradient-title font-semibold md:text-6xl text-4xl uppercase">
          {title}
        </h1>
        <motion.p
          className="md:text-3xl md:mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {text}
        </motion.p>
      </motion.div>
      <motion.div
        className="items-center gap-7 hidden md:flex"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-36 border border-white-50"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <p className="gradient-title text-6xl">{number}</p>
      </motion.div>
    </div>
  );
};

export default TitleHeader;
