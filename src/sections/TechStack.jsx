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
        <div className="md:mt-5 mt-8 flex justify-center items-center md:mx-10">
          <div className="grid grid-cols-3 sm:grid-cols-4  md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center w-full px-15 md:px-0">
            {iconsList.map((icon, index) => (
              <TechIcon key={index} icon={icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
