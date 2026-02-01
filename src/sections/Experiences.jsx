import { Timeline } from "../components/Timeline";
import TitleHeader from "../components/TitleHeader";
import { experiences } from "@/data/index";
const Experiences = () => {
  return (
    <section className=" mt-50 mx-10 " id="work">
      <TitleHeader
        title="Work Experience"
        number="03"
        text="My professional journey"
      />
      <Timeline data={experiences} />
    </section>
  );
};

export default Experiences;
