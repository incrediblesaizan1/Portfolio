"use client";
import { motion } from "framer-motion";
import { mySocials } from "@/data/index";

const Footer = () => {
  return (
    <motion.section
      className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space mt-32 md:mt-48"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </motion.div>
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {mySocials.map((social, index) => (
          <motion.a
            href={social.href}
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </motion.a>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        SK © 2026 All rights reserved.
      </motion.p>
    </motion.section>
  );
};

export default Footer;
