import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const ScrollIndicator = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const circleRef = useRef(null);
  const timeoutRef = useRef(null);

  useGSAP(() => {
    if (!circleRef.current) return;

    gsap.to(circleRef.current, {
      y: 50,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={clsx(
        "fixed z-10 top-4/5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 transition-opacity duration-500",
        isScrolling ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="relative w-10 h-16">
        <div className="flex justify-between opacity-50">
          <div className="w-px h-16 bg-white" />
          <div className="w-px h-16 bg-white" />
        </div>

        <div
          ref={circleRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 size-4 border border-white rounded-full"
        />
      </div>

      <div className="text-xs md:text-sm tracking-wider text-white">
        SCROLL TO EXPLORE
      </div>
    </div>
  );
};

export default ScrollIndicator;
