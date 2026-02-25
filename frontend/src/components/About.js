import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-info-circle text-primary me-2"></i>
              About CampusOps
            </h2>
            <p className="lead text-muted">
              The Future of Event Management with AI
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* About Content - Full Width */}
          <div className="col-12">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body p-5">
                <h4 className="card-title mb-4">
                  <i className="fas fa-lightbulb text-warning me-2"></i>
                  Our Mission
                </h4>
                <p className="card-text fs-5 mb-4">
                  CampusOps is an AI-powered event management and reporting platform designed to streamline 
                  the entire event lifecycle. We leverage cutting-edge technologies like Groq and OpenAI 
                  to provide intelligent automation for event planning, feedback analysis, and content generation.
                </p>
                <p className="card-text fs-5">
                  Our platform empowers event organizers with data-driven insights, automated report generation, 
                  and advanced image processing capabilities to make informed decisions and create memorable experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features - Three in One Line */}
          <div className="col-12 mt-4">
            <h4 className="text-center mb-4 section-subtitle">
              <i className="fas fa-star text-warning me-2"></i>
              Key Features
            </h4>
            <div className="features-row">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-file-alt text-primary"></i>
                </div>
                <h5>AI Report Generation</h5>
                <p>Automated event planning documents</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-chart-line text-success"></i>
                </div>
                <h5>Feedback Analysis</h5>
                <p>AI sentiment & insights extraction</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="fas fa-camera text-info"></i>
                </div>
                <h5>Image Services</h5>
                <p>Captioning & OCR text extraction</p>
              </div>
            </div>
          </div>

          {/* API Documentation Link */}
          <div className="col-12 text-center mt-5">
            <div className="api-card">
              <div className="card-body p-5">
                <h5 className="api-title">
                  <i className="fas fa-book text-primary me-2"></i>
                  API Documentation
                </h5>
                <p className="api-description">
                  Access our comprehensive API documentation to integrate CampusOps services into your applications
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a 
                    href="http://localhost:8000/docs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-lg"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Swagger UI
                  </a>
                  <a 
                    href="http://localhost:8000/redoc" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-primary btn-lg"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    ReDoc
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;