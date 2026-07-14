"use client";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../button/button';

import { works } from '@/lib/data';

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
                  {work.buttonText || "Visit Website"}
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
