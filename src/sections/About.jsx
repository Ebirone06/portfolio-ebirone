import { motion } from "framer-motion";
import GradientText from "../components/ui/GradientText";

const About = () => {
  return (
    <section className="about-section" id="about">

      <h2 className="about-title">
        <GradientText>About Me</GradientText>
      </h2>

      <motion.p
        className="about-text"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        I am a technology-focused developer who builds real-world solutions using 
        AI, automation, and full-stack development. My approach is not just learning — 
        I focus on creating practical systems that solve real problems.
      </motion.p>

      <motion.p
        className="about-text"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        From AI-powered PDF redaction tools to full-stack web applications, I design 
        and develop projects that combine logic, creativity, and performance.
      </motion.p>

      <motion.p
        className="about-highlight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        My goal is to build impactful digital products and become a high-level developer 
        who creates innovative technology solutions.
      </motion.p>

    </section>
  );
};

export default About;