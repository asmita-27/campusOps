import React from 'react';
import './PageNavigation.css';

function PageNavigation() {
  return (
    <nav className="page-navigation">
      <div className="nav-container">
        <span className="nav-label">On this page</span>
        <div className="nav-links">
          <a href="#event-report" className="nav-link">Event Report Generator</a>
          <a href="#feedback" className="nav-link">Feedback Analyzer</a>
          <a href="#image-services" className="nav-link">Image Services</a>
          <a href="#about" className="nav-link">About CampusOps</a>
        </div>
      </div>
    </nav>
  );
}

