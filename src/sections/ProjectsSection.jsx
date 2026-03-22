import { projects } from "../data/projects";
import ProjectCard from "../components/common/ProjectCard";
import { motion } from "framer-motion";
import GradientText from "../components/ui/GradientText";

const ProjectsSection = () => {
  return (
    <section className="projects-section" id="projects">

      <h2 className="projects-title">
        <GradientText>My Projects</GradientText>
      </h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default ProjectsSection;