"use client";
import React, { useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import './PortfolioAccordion.css';

const works = [
  {
    title: "silverskincoffee.ie",
    url: "//silverskincoffee.ie",
    year: "2024",
    description: "E-Commerce website that sells coffee beans. WordPress, Woocommerce.",
    category: "Development",
    image: "/images/project-glowy.jpg" 
  },
  {
    title: "autosl.de",
    url: "//autosl.de",
    year: "2024",
    description: "A company that sells expensive cars. Wordpress, a custom plugin for API intergration.",
    category: "UX Design, Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    image: "/images/project-glowy.jpg" 
  },
  {
    title: "muafaktur.de",
    url: "//muafaktur.de",
    year: "2023",
    description: "WooCommerce website for a company offering beauty products and training courses",
    category: "UX Design, Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    image: "/images/project-glowy.jpg" 
  },
  {
    title: "monitask.com",
    url: "//monitask.com",
    year: "2021",
    description: "Multilingual WordPress website with hundreds of pages all generated and updated automatically",
    category: "Development",
    client: "Mindlind",
    clientUrl: "//mindlind.de",
    image: "/images/project-glowy.jpg" 
  }
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
                <p className="portfolio-description">{work.description}</p>
            </div>
            <button 
                className={`portfolio-toggle ${openIndex === index ? 'is-open' : ''}`}
            >
              <Plus 
                size={48} 
                strokeWidth={0.75} 
                className={`portfolio-icon ${openIndex === index ? 'is-open' : ''}`} 
              />
            </button>
          </div>
          
          <div 
            className={`portfolio-content-wrapper ${openIndex === index ? 'is-open' : ''}`}
          >
            <div className="portfolio-content">
                {/* <div className="portfolio-image">
                     <Image 
                        src={work.image} 
                        alt={work.title}
                        width={1200}
                        height={800}
                     />
                </div> */}
                <a 
                    href={work.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="portfolio-link"
                >
                    Visit Website <ExternalLink size={16} />
                </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioAccordion;
