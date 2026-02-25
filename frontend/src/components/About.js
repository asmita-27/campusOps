import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
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
            </p>
          </div>
        </div>

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
              </div>
              <h4>All-in-one Event Automation</h4>
              <p>Complete event lifecycle management with AI</p>
            </div>
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
              </div>
              <h4>Advanced Image Processing</h4>
              <p>OCR and automatic caption generation</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
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
