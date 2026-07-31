import React from "react";

import PicsCarousel from "@/components/carousel/pics-carousel";
import Button from "@/components/button/button";
import { Separator } from "@/components/ui/separator";
import { works } from "@/lib/data";

/**
 * Portfolio / "Recent projects" list, shared between the home page and the
 * WordPress landing page. Driven by the `works` data in `@/lib/data`.
 *
 * @param {Object} props
 * @param {string} [props.title="Recent projects"] - Section heading.
 * @param {Array}  [props.items=works] - Projects to render.
 * @param {string} [props.id] - Optional id for in-page anchor links (e.g. "work").
 */
export default function PortfolioSection({
  title = "Recent projects",
  items = works,
  id,
}) {
  return (
    <div id={id} className="container px-5 py-20 scroll-mt-10">

      <div className="block-header">
        <div className="block-header-title">{title}</div>
      </div>

      <Separator className="my-10" />

      {items.map((project) => (
        <div key={project.title}>

          {project.media?.length ? (
            <div className="mb-14">
              <PicsCarousel images={project.media} />
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
              <div className="flex gap-2">
                <div className="text-xs">{project.year}</div>
                {project.client ? (
                  <>
                    <div className="text-xs">•</div>
                    <div className="text-xs">
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
                ) : null}
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2">
              <div className="text-sm mb-3">{project.description}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.skills?.map((skill) => (
                  <div key={skill} className="text-xs font-medium">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="-ml-1 mt-10">
            <Button href={project.url}>
              {project.buttonText}
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
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Button>
          </div>

          <Separator className="my-10" />

        </div>
      ))}

    </div>
  );
}
