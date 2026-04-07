"use client";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from './button/button';
import './PortfolioAccordion.css';

const works = [
  {
    title: "funky-ramen.de",
    url: "https://funky-ramen.de",
    year: "2026",
    description: "A WordPress website for a café for anime lovers. WordPress.",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["JavaScript", "GSAP", "WordPress"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "prince-food.de",
    url: "https://prince-food.de",
    year: "2025",
    description: "B2B website that sells frozen fruits and vegetables. WordPress.",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["JavaScript", "GSAP", "WordPress"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "factorysl.de",
    url: "https://factorysl.de/",
    year: "2025",
    description: "An automotive workshop specializing in high-end vehicle detailing, maintenance, and performance tuning",
    category: "Frontend, Backend Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WordPress", "Frontend"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "autosl.de",
    url: "//autosl.de",
    year: "2024",
    description: "A company that sells expensive cars. Wordpress, a custom plugin for API integration.",
    category: "UX Design, Frontend, Backend Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WordPress", "Custom Plugin", "API Integration"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "mjavedaslam.com",
    url: "https://mjavedaslam.com",
    year: "2025",
    description: "A personal website for a freelance digital marketer and copywriter",
    category: "UX Design, Frontend, Backend Development",
    skills: ["UX Design", "WordPress", "Frontend", "Backend"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "silverskincoffee.ie",
    url: "//silverskincoffee.ie",
    year: "2024",
    description: "E-Commerce website that sells coffee beans. WordPress, Woocommerce.",
    category: "Development",
    skills: ["WordPress", "WooCommerce"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "muafaktur.de",
    url: "//muafaktur.de",
    year: "2023",
    description: "WooCommerce website for a company offering beauty products and training courses",
    category: "UX Design, Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WooCommerce", "UX Design"],
    // image: "/images/project-glowy.jpg" 
  },
  {
    title: "monitask.com",
    url: "//monitask.com",
    year: "2021",
    description: "Multilingual WordPress website with hundreds of pages all generated and updated automatically",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    skills: ["WordPress", "Automation"],
    // image: "/images/project-glowy.jpg" 
  },
];

const PortfolioAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="portfolio-accordion">
      {works.map((work, index) => (
        <div key={index} className="portfolio-item">
          <div 
            className="portfolio-header"
            onClick={() => toggleItem(index)}
          >
            <div className="portfolio-text">
                <h3 className="portfolio-title">{work.title}</h3>
                <div className="portfolio-skills">
                  {work.skills && work.skills.join(', ')}
                </div>
            </div>
            <button 
                className={`portfolio-toggle ${openIndex === index ? 'is-open' : ''}`}
            >
              <Plus 
                size={24} 
                strokeWidth={1.5} 
                className={`portfolio-icon ${openIndex === index ? 'is-open' : ''}`} 
              />
            </button>
          </div>

          <div 
            className={`portfolio-content-wrapper ${openIndex === index ? 'is-open' : ''}`}
          >
            <div className="portfolio-content">
                <p className="portfolio-description">{work.description}</p>
                {/* <div className="portfolio-image">
                     <Image 
                        src={work.image} 
                        alt={work.title}
                        width={1200}
                        height={800}
                     />
                </div> */}
                <Button 
                    href={work.url} 
                    variant="outline-white"
                >
                    Visit Website 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioAccordion;
