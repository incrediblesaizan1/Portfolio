"use client";
import { motion } from "framer-motion";
import { Timeline } from "../components/Timeline";
import TitleHeader from "../components/TitleHeader";
import { experiences } from "@/data/index";

const Experiences = () => {
  return (
    <section className=" md:mt-50 md:mx-10 pt-10" id="work">
      <TitleHeader
        title="Work Experience"
        number="04"
        text="My professional journey"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Timeline data={experiences} />
      </motion.div>
    </section>
  );
};

export default Experiences;
