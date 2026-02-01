import TechIcon from "@/components/TechIcon";
import TitleHeader from "@/components/TitleHeader";
import { iconsList } from "@/data/index";

const TechStack = () => {
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
        <div className="md:mt-5 mt-2 relative">
          <div className=" w-36 h-full absolute bottom-0 left-0 z-20"></div>
          <div className=" w-36 h-full absolute bottom-0 right-0 z-20"></div>
          <div className="marquee h-52">
            <div className="marquee-box md:gap-12 gap-5">
              {iconsList.map((icon, index) => (
                <TechIcon key={index} icon={icon} />
              ))}
              {iconsList.map((icon, index) => (
                <TechIcon key={index} icon={icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
