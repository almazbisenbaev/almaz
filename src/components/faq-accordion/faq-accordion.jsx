"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className="border-b border-black/15">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full min-h-14 items-center justify-between gap-4 py-5 sm:gap-6 sm:py-6 text-left text-base sm:text-xl font-semibold leading-snug cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-4"
        >
          {question}
          <Plus
            size={20}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${open ? "rotate-45" : "rotate-0"}`}
          />
        </button>
      </h3>
      {/* Keep answers in the server-rendered HTML for search and animate both
          directions without a fixed height, including when text wraps. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-5 sm:pb-6 sm:pr-6 text-base text-neutral-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }) {
  return (
    <div className="min-w-0 border-t border-black/15">
      {items.map((item) => <FaqItem key={item.question} {...item} />)}
    </div>
  );
}
