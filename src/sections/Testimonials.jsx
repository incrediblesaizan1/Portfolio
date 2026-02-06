import { testimonials } from "@/data/index";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { motion } from "framer-motion";

const Testimonials = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="testimonials" className="flex-center mt-20 md:mt-50 md:mx-4">
      <div className="w-full h-full md:-px-5 md:px-5">
        <TitleHeader
          title="TESTIMONIALS"
          number="06"
          text="Watch our clients are saying about us"
        />

        <motion.div
          className="lg:columns-3 md:columns-2 columns-1 mt-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="mb-4 break-inside-avoid"
            >
              <GlowCard
                card={testimonial}
                index={index}
                className="testimonial-card"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
