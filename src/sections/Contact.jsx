import { useState, useRef } from "react";
import TitleHeader from "@/components/TitleHeader.jsx";
import Alert from "../components/Alert";
import { motion } from "framer-motion";

const Contact = () => {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/glorioussaizan1@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        },
      );

      if (response.ok) {
        setAlert({
          show: true,
          title: "Message Sent",
          message:
            "Thank you for reaching out! I'll get back to you as soon as possible.",
          type: "success",
        });
        e.target.reset();
      } else {
        setAlert({
          show: true,
          title: "Error",
          message:
            "Something went wrong while sending your message. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setAlert({
        show: true,
        title: "Error",
        message: "Something went wrong. Please check your internet connection.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <section className="mt-20 md:mt-50 md:mx-10" id="contact">
      <Alert
        isOpen={alert.show}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />

      <TitleHeader
        title="Contact"
        number={"08"}
        text={"Let’s create something users will love."}
      />

      <motion.div
        className="relative flex items-center justify-center flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Desktop Image */}
        <img
          src="/terminal.png"
          alt="terminal-bg"
          className="absolute inset-0 md:h-[95vh] lg:h-[130vh] mx-auto hidden md:block" // Hidden on small screens, shown on md+
        />
        {/* Mobile Image */}
        <img
          src="/terminalphone.png"
          alt="terminal-bg"
          className="absolute inset-0 h-[130vh] block md:hidden" // Shown on small screens, hidden on md+
        />

        <div className="contact-container mt-22">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600">
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I’m here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            {/* FormSubmit Hidden Settings */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                required
                className="field-input"
                placeholder="ex., Saizan Khan"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                required
                className="field-input"
                placeholder="ex., glorioussaizan1@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Subject</span>
              <input
                type="text"
                name="subject"
                className="field-input"
                placeholder="What’s this about?"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="field-input resize-none"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
              <img
                src="/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
