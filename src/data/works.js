/**
 * Client projects, rendered by `components/portfolio-section` (English pages)
 * and by the Russian landing page, which looks entries up by `name`.
 *
 * Shape of an entry:
 *   name        Project name shown as the heading.
 *   title       Domain shown in the portfolio list; also the React key.
 *   url         Where the CTA points: an external site, or an internal case
 *               study such as `/silverskin`.
 *   buttonText  CTA label, which differs for case studies vs. live sites.
 *   year        Delivery year.
 *   description One line under the heading.
 *   category    Disciplines involved.
 *   client      Agency the work was delivered through; absent for direct
 *               clients, and the attribution line is then omitted.
 *   clientUrl   The agency's site.
 *   skills      Tags listed beside the description.
 *   homepage    Include in the curated set on the home and WordPress pages.
 *   media       Screenshots and screen recordings for the gallery. `width`
 *               and `height` are the file's real pixel dimensions — they size
 *               the slide and reserve its box, so they must stay accurate.
 *               `type: "video"` marks a clip; a `poster` still frame is
 *               optional but makes a clip appear instantly while it streams.
 */
export const works = [
  {
    name: "Funky Ramen",
    title: "funky-ramen.de",
    url: "https://funky-ramen.de",
    buttonText: "Visit Website",
    year: "2026",
    description: "A WordPress website for a café for anime lovers. WordPress.",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["JavaScript", "GSAP", "WordPress"],
    homepage: true,
    media: [
      { src: "/images/portfolio/funky-ramen-1.jpg", width: 960, height: 540, alt: "Funky Ramen homepage hero with the restaurant's anime-styled artwork" },
      { src: "/images/portfolio/funky-ramen-2.jpg", width: 960, height: 540, alt: "Funky Ramen menu section listing dishes with prices" },
      { src: "/images/portfolio/funky-ramen-3.jpg", width: 960, height: 540, alt: "Funky Ramen about section describing the café" },
      { src: "/images/portfolio/funky-ramen-4.jpg", width: 258, height: 540, alt: "Funky Ramen website shown on a mobile screen" },
    ],
  },
  {
    name: "Prince Food",
    title: "prince-food.de",
    url: "https://prince-food.de",
    buttonText: "Visit Website",
    year: "2025",
    description: "B2B website that sells frozen fruits and vegetables. WordPress.",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["JavaScript", "GSAP", "WordPress"],
    homepage: true,
    media: [
      { src: "/portfolio/prince-food-1.mp4", width: 2880, height: 1600, type: "video", alt: "Screen recording of the Prince Food B2B site scrolling through its frozen fruit and vegetable catalogue" },
    ],
  },
  {
    name: "Factory SL",
    title: "factorysl.de",
    url: "https://factorysl.de/",
    buttonText: "Visit Website",
    year: "2025",
    description: "An automotive workshop specializing in high-end vehicle detailing, maintenance, and performance tuning",
    category: "Frontend, Backend Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WordPress", "Frontend"],
    homepage: true,
    media: [
      { src: "/portfolio/factorysl-1.mp4", width: 2880, height: 1632, type: "video", alt: "Screen recording of the Factory SL site showing its vehicle detailing and tuning services" },
    ],
  },
  {
    name: "M Javed Aslam",
    title: "mjavedaslam.com",
    url: "https://mjavedaslam.com",
    buttonText: "Visit Website",
    year: "2025",
    description: "A personal website for a freelance digital marketer and copywriter",
    category: "UX Design, Frontend, Backend Development",
    skills: ["UX Design", "WordPress", "Frontend", "Backend"],
  },
  {
    name: "Silverskin Coffee",
    title: "silverskincoffee.ie",
    url: "/silverskin",
    buttonText: "View Details",
    year: "2024",
    description: "E-Commerce website that sells coffee beans. WordPress, Woocommerce.",
    category: "Development",
    skills: ["WordPress", "WooCommerce"],
    homepage: true,
    media: [
      { src: "/videos/silverskin-home.webm", width: 1920, height: 1080, type: "video", alt: "Screen recording of the Silverskin Coffee homepage and its coffee bean shop" },
      { src: "/videos/silverskin-hamburger.webm", width: 3420, height: 1942, type: "video", alt: "Screen recording of the Silverskin Coffee full-screen navigation menu opening" },
    ],
  },
  {
    name: "Muafaktur",
    title: "muafaktur.de",
    url: "//muafaktur.de",
    buttonText: "Visit Website",
    year: "2023",
    description: "WooCommerce website for a company offering beauty products and training courses",
    category: "UX Design, Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WooCommerce", "UX Design"],
    homepage: true,
    media: [
      { src: "/portfolio/mua-1.jpg", width: 1560, height: 800, alt: "Muafaktur storefront homepage with its beauty product range" },
      { src: "/portfolio/mua-1-1.jpg", width: 828, height: 1792, alt: "Muafaktur homepage shown on a mobile screen" },
      { src: "/portfolio/mua-2.jpg", width: 1560, height: 1099, alt: "Muafaktur WooCommerce product listing page" },
      { src: "/portfolio/mua-3.jpg", width: 828, height: 1792, alt: "Muafaktur training course page shown on a mobile screen" },
    ],
  },
  {
    name: "Monitask",
    title: "monitask.com",
    url: "//monitask.com",
    buttonText: "Visit Website",
    year: "2021",
    description: "Multilingual WordPress website with hundreds of pages all generated and updated automatically",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WordPress", "Automation"],
    homepage: true,
    media: [
      { src: "/portfolio/monitask.jpg", width: 1560, height: 781, alt: "Monitask marketing site homepage, one of its hundreds of auto-generated multilingual pages" },
    ],
  },
];

/** The curated subset shown on the home page and the WordPress landing page. */
export const homepageWorks = works.filter((work) => work.homepage);

/** Look up a project by `name`, which is how localized pages reference them. */
export const findWork = (name) => works.find((work) => work.name === name);
