import { Person } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';

export default function PersonJsonLd() {
  return (
    <JsonLd<Person>
      item={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Almaz Bisenbaev",
        "alternateName": [
          "Almaz Bissenbayev",
          "Алмаз Бисенбаев",
          "Алмаз Бисембаев"
        ],
        "url": "https://helloalmaz.com",
        "sameAs": [
          "https://twitter.com/almazbisenbaev",
          "https://www.youtube.com/@webdevandstuff",
          "https://www.threads.com/@almazbisenbaev"
        ],
        "jobTitle": "Full-Stack Web Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        },
        "description": "Professional Full-Stack Web Developer with expertise in WordPress, React, and modern web development.",
        "knowsAbout": [
          "Web Development",
          "WordPress",
          "React",
          "Node.js",
          "JavaScript",
          "UX Design"
        ]
      }}
    />
  );
}
