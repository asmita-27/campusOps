import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">
              <i className="fas fa-calendar-alt me-2"></i>
              CampusOps
            </h5>
            <p className="text-muted">
              AI-powered event management and reporting platform for modern organizations.
            </p>
            <div className="social-links">
              <a 
                href="https://github.com/asmita-27/campusOps" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white me-3"
                title="GitHub"
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a 
                href="#" 
                className="text-white me-3"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a 
                href="#" 
                className="text-white me-3"
                title="Twitter"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#home" className="text-muted text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#event-report" className="text-muted text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Event Reports
                </a>
              </li>
              <li className="mb-2">
                <a href="#feedback" className="text-muted text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Feedback Analysis
                </a>
              </li>
              <li className="mb-2">
                <a href="#image-services" className="text-muted text-decoration-none">
                  <i className="fas fa-chevron-right me-2"></i>Image Services
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-4">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="http://localhost:8000/docs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted text-decoration-none"
                >
                  <i className="fas fa-book me-2"></i>API Documentation
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="https://github.com/asmita-27/campusOps" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted text-decoration-none"
                >
                  <i className="fab fa-github me-2"></i>GitHub Repository
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-muted text-decoration-none">
                  <i className="fas fa-info-circle me-2"></i>About Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        {/* Copyright */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 text-muted">
              &copy; {currentYear} CampusOps. Built with <i className="fas fa-heart text-danger"></i> by{' '}
              <a 
                href="https://github.com/asmita-27" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-decoration-none"
              >
                asmita-27 & Team
              </a>
            </p>
            {/* <small className="text-muted">
              Powered by Groq AI & FastAPI
            </small> */}
          </div>
        </div>
      </div>

      {/* Scroll to top button (optional - can be enabled with state) */}
      {/* <div className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fas fa-arrow-up"></i>
      </div> */}
    </footer>
  );
}

export default Footer;