"use client";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

import { myProjects } from "@/data/index";
import TitleHeader from "@/components/TitleHeader";

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" },
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="relative sm:px-10 md:px-10 pt-40" id="project">
      {/* head-text replaced */}
      <TitleHeader
        title="MY WORK"
        number="03"
        text="Crafting Real-World Solutions Through Code and Creativity"
      />

      <motion.div
        className="grid lg:grid-cols-2 grid-cols-1 mt-8 gap-y-0 lg:gap-5 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 pb-0 sm:pb-10 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div className="relative z-10">
            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
              style={currentProject.logoStyle}
            >
              <img
                className="w-10 h-10 shadow-sm"
                src={currentProject.logo}
                alt="logo"
              />
            </div>

            <div className="flex flex-col gap-5 text-white-600 my-5 min-h-[12rem]">
              <p className="text-white text-2xl font-semibold animatedText">
                {currentProject.title}
              </p>

              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  /* tech-logo replaced */
                  <div
                    key={index}
                    className="w-10 h-10 rounded-md p-2 bg-neutral-100 bg-opacity-10 backdrop-filter backdrop-blur-lg flex justify-center items-center"
                  >
                    <img src={tag.path} alt={tag.name} />
                  </div>
                ))}
              </div>

              <a
                className="flex items-center gap-2 cursor-pointer text-white-600"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
              >
                <p>Check Live Site</p>
                <img src="/arrow-up.png" alt="arrow" className="w-3 h-3" />
              </a>
            </div>

            <div className="flex justify-between items-center mt-7">
              {/* arrow-btn replaced */}
              <button
                className="w-10 h-10 p-3 cursor-pointer active:scale-95 transition-all rounded-full arrow-gradient"
                onClick={() => handleNavigation("previous")}
              >
                <img src="/left-arrow.png" alt="left arrow" />
              </button>

              {/* arrow-btn replaced */}
              <button
                className="w-10 h-10 p-3 cursor-pointer active:scale-95 transition-all rounded-full arrow-gradient"
                onClick={() => handleNavigation("next")}
              >
                <img
                  src="/right-arrow.png"
                  alt="right arrow"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>

        <a
          href={currentProject.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center rounded-lg h-96 md:h-full mt-[-95px] lg:mt-0 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src={currentProject.image}
            className="w-full h-full object-contain"
            alt={currentProject.title}
          />
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
