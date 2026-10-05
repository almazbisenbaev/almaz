import { cn } from "@/lib/utils"

function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
  const direction = orientation === "vertical" ? "vertical" : "horizontal";

  return (
    <div
      data-slot="separator"
      data-orientation={direction}
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative && direction === "vertical" ? direction : undefined}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props} />
  );
}

export { Separator }
