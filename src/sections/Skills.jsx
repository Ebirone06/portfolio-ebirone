import { motion } from "framer-motion";
import GradientText from "../components/ui/GradientText";

const skills = [
  {
    title: "Python",
    desc: "Built AI-powered tools like PDF redaction using computer vision and automation."
  },
  {
    title: "React",
    desc: "Created modern web apps with animations, reusable components, and scalable UI."
  },
  {
    title: "JavaScript",
    desc: "Developed dynamic UI, interactions, and logic-driven web experiences."
  },
  {
    title: "AI / ML",
    desc: "Worked on intelligent systems for pattern detection and automation."
  },
  {
    title: "Computer Vision",
    desc: "Built image-based detection and document processing systems."
  },
  {
    title: "UI/UX Design",
    desc: "Designed clean, modern interfaces with strong visual hierarchy."
  }
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">

      <h2 className="skills-title">
        <GradientText>What I Build</GradientText>
      </h2>

      <div className="skills-scroll">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <h3 className="skill-title">{skill.title}</h3>
            <p className="skill-desc">{skill.desc}</p>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Skills;