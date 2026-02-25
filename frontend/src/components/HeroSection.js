import React from 'react';
import './HeroSection.css';

function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('.hero-wrapper .row.mt-5');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero-wrapper">
      <div className="container">
        <div className="row align-items-center min-vh-50">
          <div className="col-lg-6">
            <h1 className="display-3 fw-bold mb-4">
              Welcome to <span className="text-warning">CampusOps</span>
            </h1>
            <p className="lead mb-4">
              AI-Powered Event Management & Reporting Platform
            </p>
            <p className="fs-5 mb-4">
              Transform your event management with intelligent automation. Generate comprehensive reports, 
              analyze feedback, extract insights from images, and leverage AI to make data-driven decisions.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#event-report" className="btn btn-warning btn-lg">
                <i className="fas fa-rocket me-2"></i>Get Started
              </a>
              <a href="#about" className="btn btn-outline-light btn-lg">
                <i className="fas fa-info-circle me-2"></i>Learn More
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center mt-5 mt-lg-0">
            <div className="hero-illustration">
              <i className="fas fa-chart-line text-warning opacity-75"></i>
            </div>
          </div>
        </div>
        
        {/* Features Overview */}
        <div className="row mt-5 pt-5 g-4">
          <div className="col-md-3 text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-file-invoice fa-3x text-warning"></i>
            </div>
            <h5>Event Reports</h5>
            <p className="small">Generate comprehensive event planning documents</p>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-chart-bar fa-3x text-warning"></i>
            </div>
            <h5>Feedback Analysis</h5>
            <p className="small">AI-powered sentiment and insights extraction</p>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-camera fa-3x text-warning"></i>
            </div>
            <h5>Image Captioning</h5>
            <p className="small">Automatic image description generation</p>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="feature-icon mb-3">
              <i className="fas fa-text-width fa-3x text-warning"></i>
            </div>
            <h5>OCR Services</h5>
            <p className="small">Extract text from images with precision</p>
          </div>
        </div>
      </div>

      {/* Optional Scroll Indicator */}
      <div className="scroll-indicator" onClick={scrollToFeatures}>
        <span>Scroll</span>
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
}

export default HeroSection;