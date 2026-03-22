import { motion } from "framer-motion";
import GradientText from "../components/ui/GradientText";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => {
  return (
    <section className="hero-section" id="home">

      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-left">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <GradientText>
              Build. Innovate. Automate.
            </GradientText>
          </motion.h1>

          <p className="hero-name">
            I'm <span>Ebirone Michael</span>
          </p>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            I create AI-powered tools and modern web experiences
            that solve real-world problems.
          </motion.p>

          <div className="hero-buttons">
            <button
              className="hero-btn primary"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </button>

            <button
              className="hero-btn secondary"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </button>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">
          <img
            src="/hero.png"   // 🔥 put your image in public folder
            alt="Ebirone Michael"
            className="hero-image"
          />
        </div>

      </div>

    </section>
  );
};

export default Hero;