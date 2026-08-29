/**
 * The site's top-right arrow glyph, used to mark links that leave the site.
 * Inherits the surrounding text colour and scales with its font size.
 */
export default function ArrowUpRight({ className = '' }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-auto shrink-0 ${className}`.trim()}
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}
