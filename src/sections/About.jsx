import { useRef, useEffect, useState } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import TitleHeader from "../components/TitleHeader";

const About = () => {
  const grid2Container = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative sm:px-10 section-spacing overflow-hidden my-20 sm:mb-50"
      id="about"
    >
      <TitleHeader
        title="About Me"
        number="01"
        text="Passionate Creator, Lifelong Learner"
      />

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 right-10 w-3 h-3 bg-cyan-500 rounded-full animate-ping opacity-75"></div>
      <div
        className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping opacity-75"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/3 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
          {/* Grid 1 */}
          <div
            className={`col-span-1 md:col-span-3 lg:col-span-3 row-span-1 md:row-span-2 flex items-end bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 relative overflow-hidden border border-gray-800 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] grid-1 ${isVisible ? "animate-fadeInUp" : "opacity-0"} min-h-[20rem] md:min-h-full`}
          >
            <img
              src="/coding-pov.png"
              className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-80"
              alt="Coding"
            />
            <div className="z-10">
              <p className="headtext text-white font-bold text-4xl mb-2">
                Hi, I'm Saizan Khan
              </p>
              <p className="subtext text-gray-400 text-lg leading-relaxed">
                Over the last 4 years, I developed my frontend and backend dev
                skills to deliver dynamic and software and web applications.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-black via-cyan-950/20 to-transparent" />

            {/* Decorative corner element */}
            <div className="absolute -top-3 -right-3 w-12 h-12 border-2 border-cyan-500 rounded-full opacity-40"></div>
          </div>

          {/* Grid 2 */}
          <div
            className={`col-span-1 md:col-span-3 lg:col-span-3 row-span-1 md:row-span-1 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 relative overflow-hidden border border-gray-800 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition-all duration-500 hover:scale-[1.02] grid-2 ${isVisible ? "animate-fadeInUp" : "opacity-0"} min-h-[15rem] md:min-h-full`}
            style={{ animationDelay: "0.1s" }}
          >
            <div
              ref={grid2Container}
              className="flex items-center justify-center w-full h-full relative"
            >
              <p className="flex items-end text-4xl md:text-6xl text-gray-700 font-black tracking-tight transform-gpu">
                CODE IS CRAFT
              </p>
              <Card
                style={{ rotate: "75deg", top: "30%", left: "20%" }}
                text="GRASP"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                text="SOLID"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
                text="Design Patterns"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                text="Design Principles"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "20deg", top: "10%", left: "38%" }}
                text="SRP"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "30deg", top: "70%", left: "70%" }}
                image="/logos/csharp-pink.png"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "-45deg", top: "70%", left: "25%" }}
                image="/logos/dotnet-pink.png"
                containerRef={grid2Container}
              />
              <Card
                style={{ rotate: "-45deg", top: "5%", left: "10%" }}
                image="/logos/blazor-pink.png"
                containerRef={grid2Container}
              />
            </div>

            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Grid 3 */}
          <div
            className={`col-span-1 md:col-span-3 lg:col-span-3 row-span-1 md:row-span-1 bg-gradient-to-br from-black to-gray-950 rounded-2xl p-6 relative overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-[1.02] grid-3 ${isVisible ? "animate-fadeInUp" : "opacity-0"} min-h-[15rem] md:min-h-full`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="z-10 w-full md:w-[60%] lg:w-[50%]">
              <p className="headtext text-white font-bold text-3xl mb-2">
                Time Zone
              </p>
              <p className="subtext text-gray-400 text-nowrap text-lg leading-relaxed">
                I'm based in Mars, and open to remote work worldwide
              </p>
            </div>
            <figure className="absolute left-[50%] md:left-[40%] top-[20%] scale-75 md:scale-100 animate-float opacity-50 md:opacity-100 pointer-events-none">
              <Globe />
            </figure>

            {/* Decorative elements */}
            <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-cyan-400 rounded-full opacity-30"></div>
            <div className="absolute top-1/2 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>

          {/* Grid 4 */}
          <div
            className={`col-span-1 md:col-span-3 lg:col-span-2 row-span-1 md:row-span-1 bg-gradient-to-br from-cyan-950 to-gray-950 rounded-2xl p-6 relative overflow-hidden border border-cyan-500/50 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-all duration-500 hover:scale-[1.02] grid-4 group ${isVisible ? "animate-fadeInUp" : "opacity-0"} min-h-[15rem] md:min-h-full`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex flex-col items-center justify-center gap-4 size-full relative z-10">
              <p className="text-center headtext text-white font-bold text-3xl px-4">
                Do you want to start a project together?
              </p>
              <CopyEmailButton />
            </div>

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-50"></div>
          </div>

          {/* Grid 5 */}
          <div
            className={`col-span-1 md:col-span-3 lg:col-span-4 row-span-1 md:row-span-1 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 relative overflow-hidden border border-gray-800 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition-all duration-500 hover:scale-[1.02] grid-5 ${isVisible ? "animate-fadeInUp" : "opacity-0"} min-h-[15rem] md:min-h-full`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="z-10 w-full md:w-[50%] lg:w-full">
              <p className="headText text-white font-bold text-3xl mb-2">
                Tech Stack
              </p>
              <p className="subtext text-gray-400 text-md leading-relaxed">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </div>
            <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[30%] md:start-[50%] scale-150 md:scale-125 opacity-30 md:opacity-100 pointer-events-none">
              <Frameworks />
            </div>

            {/* Decorative dots */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
