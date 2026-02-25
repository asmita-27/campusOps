import React from 'react';
import './FeatureShowcase.css';

function EventReportGeneratorShowcase() {
  return (
    <section id="event-report" className="feature-showcase">
      <div className="container">
        <div className="feature-grid left-text">
          {/* Text Content */}
          <div className="feature-content">
            <span className="feature-label">FEATURE</span>
            <h2 className="feature-heading">Event Report Generator</h2>
            <p className="feature-description">
              Create comprehensive event reports, summaries, and detailed insights from modern campus operations. 
              Generate polished documents effortlessly with AI assistance for faster feedback and better organization.
            </p>

            <div className="feature-bullets">
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Generate smart event reports</span>
              </div>
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Include images & attachments</span>
              </div>
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Download reports in multiple formats</span>
              </div>
            </div>

            <a href="/event-reports" className="cta-button primary-btn">
              Explore Tool
              <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>

          {/* Product Preview */}
          <div className="feature-preview">
            <div className="preview-card with-glow">
              <div className="preview-mockup event-report-mockup">
                <div className="mockup-header">
                  <div className="mockup-title">Event Report Generator</div>
                  <div className="mockup-subtitle">Create comprehensive event documentation</div>
                </div>
                <div className="mockup-body">
                  <div className="mockup-section">
                    <div className="mockup-label">Document Type</div>
                    <div className="mockup-control">Event Plan ↓</div>
                  </div>
                  <div className="mockup-section">
                    <div className="mockup-label">Description</div>
                    <div className="mockup-textarea">Describe your event...</div>
                  </div>
                  <div className="mockup-section">
                    <div className="mockup-label">Upload Materials</div>
                    <div className="upload-zone">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <p>Click or drag images</p>
                    </div>
                  </div>
                  <button className="mockup-button">Generate Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventReportGeneratorShowcase;
