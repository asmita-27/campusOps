import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        <div className="row mb-4">
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
          {/* About Content */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="card-title mb-3">
                  <i className="fas fa-lightbulb text-warning me-2"></i>
                  Our Mission
                </h4>
                <p className="card-text">
                  CampusOps is an AI-powered event management and reporting platform designed to streamline 
                  the entire event lifecycle. We leverage cutting-edge technologies like Groq and OpenAI 
                  to provide intelligent automation for event planning, feedback analysis, and content generation.
                </p>
                <p className="card-text">
                  Our platform empowers event organizers with data-driven insights, automated report generation, 
                  and advanced image processing capabilities to make informed decisions and create memorable experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="col-lg-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="card-title mb-3">
                  <i className="fas fa-star text-warning me-2"></i>
                  Key Features
                </h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    AI-powered event report generation
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Intelligent feedback analysis with sentiment detection
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Automated image captioning for event photos
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    OCR text extraction with AI corrections
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    RAG (Retrieval-Augmented Generation) for enhanced insights
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    RESTful API for seamless integration
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="card-title mb-4 text-center">
                  <i className="fas fa-code text-primary me-2"></i>
                  Technology Stack
                </h4>
                <div className="row text-center">
                  <div className="col-md-3 mb-3" data-tooltip="Frontend Framework">
                    <div className="p-3">
                      <i className="fab fa-react fa-3x text-info mb-2"></i>
                      <h6>React.js</h6>
                      <small className="text-muted">Frontend Framework</small>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3" data-tooltip="Backend Framework">
                    <div className="p-3">
                      <i className="fab fa-python fa-3x text-primary mb-2"></i>
                      <h6>FastAPI</h6>
                      <small className="text-muted">Backend Framework</small>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3" data-tooltip="LLM & Vision Models">
                    <div className="p-3">
                      <i className="fas fa-brain fa-3x text-success mb-2"></i>
                      <h6>Groq AI</h6>
                      <small className="text-muted">LLM & Vision Models</small>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3" data-tooltip="UI Framework">
                    <div className="p-3">
                      <i className="fab fa-bootstrap fa-3x text-purple mb-2"></i>
                      <h6>Bootstrap 5</h6>
                      <small className="text-muted">UI Framework</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Documentation Link */}
          <div className="col-12 text-center">
            <div className="card shadow-sm border-primary">
              <div className="card-body p-4">
                <h5 className="card-title">
                  <i className="fas fa-book text-primary me-2"></i>
                  API Documentation
                </h5>
                <p className="card-text text-muted">
                  Access our comprehensive API documentation to integrate CampusOps services into your applications
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <a 
                    href="http://localhost:8000/docs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                  >
                    <i className="fas fa-external-link-alt me-2"></i>
                    Swagger UI
                  </a>
                  <a 
                    href="http://localhost:8000/redoc" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-primary"
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