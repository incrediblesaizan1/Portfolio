import { testimonials } from "@/data/index";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  useGSAP(() => {
    gsap.to(".testimonial-card", {
      scrollTrigger: {
        trigger: "#testimonials",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:-px-5 md:px-5">
        <TitleHeader
          title="TESTIMONIALS"
          number="06"
          text="Watch our clients are saying about us"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonials.map((testimonial, index) => (
            <GlowCard
              card={testimonial}
              key={index}
              index={index}
              className="testimonial-card opacity-0 translate-y-20"
            >
              <div className="flex items-center gap-3">
                <div>
                  <img src={testimonial.imgPath} alt="" />
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
