import PicsCarousel from "@/components/pics-carousel/pics-carousel";
import Button from "@/components/button/button";
import { Separator } from "@/components/ui/separator";

/** Stroked diagonal arrow used on the project CTAs. */
const ArrowOut = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

/**
 * "Recent projects" list, shared between the home page and the WordPress
 * landing page. Entries come from `@/data/works`.
 *
 * @param {Array}  props.items - Projects to render.
 * @param {string} [props.title="Recent projects"] - Section heading.
 * @param {string} [props.description] - Optional intro line under the heading.
 * @param {string} [props.id] - Anchor target for in-page links (e.g. "work").
 */
export default function PortfolioSection({ items, title = "Recent projects", description, id }) {
  return (
    <div id={id} className="container px-5 py-20 scroll-mt-10">

      <div className="block-header">
        <h2 className="block-header-title">{title}</h2>
      </div>

      {description && (
        <p className="-mt-6 md:-mt-14 mb-2 text-lg md:text-xl text-neutral-600 leading-snug max-w-2xl">
          {description}
        </p>
      )}

      <Separator className="my-15" />

      {items.map((project) => (
        <div key={project.title}>

          {project.media?.length > 0 && (
            <div className="mb-14">
              <PicsCarousel images={project.media} label={project.name} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
              <div className="flex gap-2 text-xs">
                <div>{project.year}</div>
                {project.client && (
                  <>
                    <div>•</div>
                    <div>
                      For{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.clientUrl}
                        className="hover:underline"
                      >
                        {project.client}
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">{project.description}</div>
              <div className="flex flex-wrap gap-2 mb-2 text-xs font-medium">
                {project.skills?.map((skill) => (
                  <div key={skill}>{skill}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href={project.url}>
              {project.buttonText}
              <ArrowOut />
            </Button>
          </div>

          <Separator className="my-10" />

        </div>
      ))}

    </div>
  );
}
