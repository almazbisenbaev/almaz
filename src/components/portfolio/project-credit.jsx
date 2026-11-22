export default function ProjectCredit({ project }) {
  if (!project.client) return null;

  return (
    <>
      <span>
        For {project.clientUrl
          ? <a href={project.clientUrl} target="_blank" rel="noopener noreferrer">{project.client}</a>
          : project.client}
      </span>
      <span aria-hidden="true">·</span>
    </>
  );
}
