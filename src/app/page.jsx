"use client";
import { useState, useEffect } from "react";
import About from "@/sections/About";
import OverlayText from "@/sections/OverLayText";
import ScrollAnimation from "@/sections/ScrollAnimation";
import TerminalAnimation from "@/sections/TerminalAnimation";
import Projects from "@/sections/Projects";
import Experiences from "@/sections/Experiences";
import TechStack from "@/sections/TechStack";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Approach from "@/sections/Approach";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    if (showMainContent) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [showMainContent]);

  const handleAnimationComplete = () => {
    setShowMainContent(true);
  };

  return (
    <main className="relative bg-background text-foreground ">
      <TerminalAnimation onAnimationComplete={handleAnimationComplete} />

      <div
        className={`relative transition-opacity duration-1000 ${showMainContent ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <div className="relative">
          <Navbar />
          <OverlayText />
          <ScrollAnimation />
        </div>
        <About />
        <Projects />
        <Experiences />
        <TechStack />
        <Approach />
        <Testimonials />
        <Contact />
      </div>
    </main>
  );
}
