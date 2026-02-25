import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
<<<<<<< HEAD
        {/* Section Header */}
        <div className="about-header">
          <h2 className="about-title">
            <i className="fas fa-info-circle"></i>
            About CampusOps
          </h2>
          <p className="about-subtitle">
            The Future of Event Management with AI
          </p>
        </div>

        {/* Main Cards Grid */}
        <div className="about-cards-grid">
          {/* Our Mission Card */}
          <div className="about-card">
            <div className="card-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="card-heading">Our Mission</h3>
            <p className="card-text">
              CampusOps is an AI-powered event management and reporting platform designed to streamline 
              the entire event lifecycle. We leverage cutting-edge technologies like Groq and OpenAI 
              to provide intelligent automation for event planning, feedback analysis, and content generation.
=======
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-info-circle text-primary me-2"></i>
              About CampusOps
            </h2>
            <p className="lead text-muted">
              The Future of Event Management with AI
>>>>>>> 67a555b2f1fcfb68503665870eae2d8fecfdc03f
            </p>
          </div>
        </div>

<<<<<<< HEAD
        {/* Key Features Grid */}
        <div className="features-grid-section">
          <h3 className="card-heading centered features-title">
            <i className="fas fa-star"></i>
            Key Features
          </h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
=======
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
>>>>>>> 67a555b2f1fcfb68503665870eae2d8fecfdc03f
              </div>
              <h4>All-in-one Event Automation</h4>
              <p>Complete event lifecycle management with AI</p>
            </div>
<<<<<<< HEAD
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h4>Intelligent Feedback Analysis</h4>
              <p>Real-time sentiment and theme extraction</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-image"></i>
=======
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
>>>>>>> 67a555b2f1fcfb68503665870eae2d8fecfdc03f
              </div>
              <h4>Advanced Image Processing</h4>
              <p>OCR and automatic caption generation</p>
            </div>
<<<<<<< HEAD
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
=======
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
>>>>>>> 67a555b2f1fcfb68503665870eae2d8fecfdc03f
              </div>
              <h4>RAG-Powered Insights</h4>
              <p>Retrieval-augmented generation for answers</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-plug"></i>
              </div>
              <h4>RESTful API Integration</h4>
              <p>Easy integration with your applications</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h4>Enterprise Security</h4>
              <p>Secure data handling and authentication</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Card
        <div className="tech-stack-card">
          <h3 className="card-heading centered">
            <i className="fas fa-code"></i>
            Technology Stack
          </h3>
          <div className="tech-grid">
            <div className="tech-item">
              <i className="fab fa-react"></i>
              <h4>React.js</h4>
              <p>Frontend</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-python"></i>
              <h4>FastAPI</h4>
              <p>Backend</p>
            </div>
            <div className="tech-item">
              <i className="fas fa-brain"></i>
              <h4>Groq AI</h4>
              <p>LLM & Vision</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-bootstrap"></i>
              <h4>Bootstrap 5</h4>
              <p>UI Framework</p>
            </div>
          </div>
        </div> */}

        {/* API Documentation Card
        <div className="api-card">
          <div className="api-content">
            <h3 className="card-heading">
              <i className="fas fa-book"></i>
              API Documentation
            </h3>
            <p className="card-text">
              Access our comprehensive API documentation to integrate CampusOps services into your applications
            </p>
            <div className="api-buttons">
              <a 
                href="http://localhost:8000/docs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="api-link primary"
              >
                <i className="fas fa-external-link-alt"></i>
                Swagger UI
              </a>
              <a 
                href="http://localhost:8000/redoc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="api-link secondary"
              >
                <i className="fas fa-external-link-alt"></i>
                ReDoc
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default About;
