import React from 'react';
import './FeatureShowcase.css';

function FeedbackAnalyzerShowcase() {
  return (
    <section id="feedback" className="feature-showcase">
      <div className="container">
        <div className="feature-grid right-text">
          {/* Product Preview - Left */}
          <div className="feature-preview">
            <div className="preview-card with-glow">
              <div className="preview-mockup feedback-mockup">
                <div className="mockup-header">
                  <div className="mockup-title">Feedback Analyzer</div>
                  <div className="mockup-subtitle">Analyze feedback with AI insights</div>
                </div>
                <div className="mockup-body">
                  <div className="mockup-section">
                    <div className="mockup-label">Upload CSV</div>
                    <div className="upload-zone">
                      <i className="fas fa-file-csv"></i>
                      <p>Choose feedback file</p>
                    </div>
                  </div>
                  <div className="mockup-stats">
                    <div className="stat-box">
                      <div className="stat-value">87%</div>
                      <div className="stat-label">Positive</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-value">9%</div>
                      <div className="stat-label">Neutral</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-value">4%</div>
                      <div className="stat-label">Negative</div>
                    </div>
                  </div>
                  <button className="mockup-button">Analyze CSV</button>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content - Right */}
          <div className="feature-content">
            <span className="feature-label">FEATURE</span>
            <h2 className="feature-heading">Feedback Analyzer</h2>
            <p className="feature-description">
              Upload your feedback CSV file and let AI analyze sentiment, extract themes, and generate actionable insights. 
              Understand your audience instantly with visual analytics and detailed reports.
            </p>

            <div className="feature-bullets">
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Analyze sentiment instantly</span>
              </div>
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Aggregate scores automatically</span>
              </div>
              <div className="bullet-item">
                <i className="fas fa-check-circle"></i>
                <span>Download detailed analytics</span>
              </div>
            </div>

            <a href="/feedback-analyzer" className="cta-button primary-btn">
              Explore Tool
              <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedbackAnalyzerShowcase;
