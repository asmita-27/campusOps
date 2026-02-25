import React from 'react';
import './FeatureShowcase.css';

function ImageServicesShowcase() {
  return (
    <section id="image-services" className="feature-showcase">
      <div className="container">
        <div className="feature-grid left-text">
          {/* Text Content */}
          <div className="feature-content">
            <span className="feature-label">FEATURE</span>
            <h2 className="feature-heading">Image Services</h2>
            <p className="feature-description">
              Extract text from images with precision, generate automatic captions for photos, and unlock AI insights 
              from visual content. Perfect for digitizing event documents and enriching your content library.
            </p>

            <div className="feature-bullets">
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>OCR for event documents</span>
              </div>
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Automatic caption generation</span>
              </div>
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>AI-powered image insights</span>
              </div>
            </div>

            <a href="/image-services" className="cta-button primary-btn">
              Explore Tool
              <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>

          {/* Product Preview */}
          <div className="feature-preview">
            <div className="preview-card with-glow">
              <div className="preview-mockup image-services-mockup">
                <div className="mockup-header">
                  <div className="mockup-title">Image Services</div>
                  <div className="mockup-subtitle">OCR & Caption Generation</div>
                </div>
                <div className="mockup-body">
                  <div className="image-preview-area">
                    <div className="image-placeholder">
                      <i className="fas fa-image"></i>
                      <p>Upload or select image</p>
                    </div>
                  </div>
                  <div className="service-tabs">
                    <div className="service-tab active">OCR</div>
                    <div className="service-tab">Captions</div>
                    <div className="service-tab">Analysis</div>
                  </div>
                  <div className="result-area">
                    <p className="result-text">Extracted text will appear here...</p>
                  </div>
                  <button className="mockup-button">Process Image</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageServicesShowcase;
