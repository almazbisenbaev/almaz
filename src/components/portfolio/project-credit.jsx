export default function ProjectCredit({ project }) {
  const name = project.client || project.name;

  return (
    <span>
      For {project.clientUrl
        ? <a className="underline underline-offset-2" href={project.clientUrl} target="_blank" rel="noopener noreferrer">{name}</a>
        : name}
    </span>
  );
}
