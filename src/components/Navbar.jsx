"use client";
import Image from "next/image";
import React, { useCallback, useState, useEffect } from "react";
import { IoIosFlower } from "react-icons/io";
import openIcon from "../../public/icon-hamburger.svg";
import closeIcon from "../../public/icon-close.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const pages = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Stats",
    href: "#stats",
  },
  {
    title: "Projects",
    href: "#project",
  },
  {
    title: "Experience",
    href: "#work",
  },
  {
    title: "Tech Stack",
    href: "#techstack",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const path = usePathname();
  const isActive = useCallback((href) => path == href, [path]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed bg-[#030813]/90 md:bg-transparent md:h-36 h-20 top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-0 md:pl-10 lg:pt-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <IoIosFlower className="my-6 h-10 w-10 sm:h-14 sm:w-14 md:w-16 md:h-16 text-4xl sm:text-6xl text-[#52ced6]" />

      <button
        onClick={() => setisOpen(!isOpen)}
        className="relative z-20 w-6 h-6 md:hidden"
      >
        <Image
          src={closeIcon}
          alt="Menu Open"
          className={`transition ${isOpen ? "opacity-100" : "opacity-0"} absolute top-1/2 right-0 -translate-y-1/2 w-full h-full`}
        />

        <Image
          src={openIcon}
          alt="Menu Close"
          className={`transition ${!isOpen ? "opacity-100" : "opacity-0"} absolute top-1/2 right-0 -translate-y-1/2 w-full h-full`}
        />
      </button>

      <div className="bar grow hidden lg:block h-0.5 bg-white/70 transition-x-8 relative z-20"></div>

      <ul
        className={`list-none bg-[#97979729] transition rounded-l-md backdrop-blur-xl fixed top-0 right-0 h-screen w-64 z-0 pt-28 pl-8 md:relative md:h-24 md:w-fit md:px-4 lg:px-8 xl:px-12 md:pt-0 md:translate-x-0 md:flex md:justify-center md:items-center md:gap-x-3 lg:gap-x-6 xl:gap-x-10 lg:min-w-[50vw] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {pages.map((item, index) => (
          <Link
            className="nav-text uppercase relative text-white md:h-full text-sm md:text-xs lg:text-sm"
            key={index}
            href={item.href}
            onClick={(e) => {
              setisOpen(false);
              if (item.href === "#") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <li
              className={`flex items-center mb-8 md:mb-0 w-full transition border-r-2 border-transparent gap-x-3 [&:not(.active)]:hover:border-white/50 [&.active]:border-white
                            md:w-fit md:border-r-0 md:border-b-4 md:h-full whitespace-nowrap ${
                              isActive(item.href) && "active"
                            }`}
            >
              <span className="block font-bold">{item.title}</span>
              {isActive(item.href) && (
                <motion.span
                  layoutId="underline"
                  className="absolute bottom-0 right-0 h-full w-1 md:w-full md:h-1 bg-white"
                />
              )}
            </li>
          </Link>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
