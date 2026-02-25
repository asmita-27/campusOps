import React, { useState, useEffect } from 'react';
import './SectionNavigation.css';

function SectionNavigation() {
  const [activeSection, setActiveSection] = useState('event-report');

  const sections = [
    { id: 'event-report', label: 'Event Report Generator' },
    { id: 'feedback', label: 'Feedback Analyzer' },
    { id: 'image-services', label: 'Image Services' },
    { id: 'about', label: 'About CampusOps' },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      for (let section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // return (
    // <nav className="section-navigation sticky-top">
    //   <div className="nav-container">
    //     <div className="nav-tabs">
    //       {sections.map((section) => (
    //         <button
    //           key={section.id}
    //           className={`nav-tab ${activeSection === section.id ? 'active' : ''}`}
    //           onClick={() => handleNavClick(section.id)}
    //         >
    //           {section.label}
    //         </button>
    //       ))}
    //     </div>
    //   </div>
    // </nav>
  // );
}

export default SectionNavigation;
