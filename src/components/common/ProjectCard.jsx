const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      
      <h3 className="project-title">{project.title}</h3>

      <p className="project-desc">{project.description}</p>

      <div className="project-tech">
        {project.tech.map((t, i) => (
          <span key={i} className="project-tag">{t}</span>
        ))}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        
      </a>

    </div>
  );
};

export default ProjectCard;