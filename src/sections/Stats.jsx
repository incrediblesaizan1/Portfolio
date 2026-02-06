"use client";
import { motion } from "framer-motion";
import TitleHeader from "../components/TitleHeader";
import GithubCard from "../components/GithubCard";
import LeetCodeCard from "../components/LeetCodeCard";

const Stats = () => {
  return (
    <section className=" mt-20 md:mx-10 px-5" id="stats">
      <TitleHeader
        title="STATS"
        number="02"
        text="My coding journey in numbers"
      />

      <motion.div
        className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <LeetCodeCard />
        </motion.div>
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GithubCard />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Stats;
