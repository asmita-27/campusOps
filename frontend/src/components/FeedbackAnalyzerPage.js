import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FeedbackAnalyzer from './FeedbackAnalyzer';
import './FeaturePages.css';

function FeedbackAnalyzerPage() {
  return (
    <div className="feature-page feature-page-light">
      <Navbar />
      <main className="feature-page-inner">
        {/* Hero */}
        <section className="feature-section" style={{ marginTop: '96px' }}>
          <div className="feature-hero-shell">
            <div className="feature-hero-grid">
              <div>
                <div className="feature-label">AI ANALYTICS</div>
                <h1 className="feature-hero-title">Turn Raw Feedback Into Actionable Insights</h1>
                <p className="feature-hero-subtitle">
                  Upload feedback from any campus event and instantly see sentiment, themes,
                  and trends your organizing team can act on.
                </p>
                <div className="feature-hero-actions">
                  <a href="#feedback-tool" className="feature-primary-btn">
                    <i className="fas fa-chart-line" />
                    Analyze Feedback
                  </a>
                </div>
              </div>

              <div className="feature-hero-preview">
                <div className="feature-preview-card" style={{ minHeight: '320px' }}>
                  <div className="feature-preview-glow" />
                  <div className="feature-preview-inner">
                    <div className="feature-preview-header">
                      <div>
                        <div className="feature-preview-title">Feedback Dashboard</div>
                        <div className="feature-preview-meta">Live overview</div>
                      </div>
                      <span className="badge bg-gradient">AI</span>
                    </div>
                    <div className="feature-preview-body-lines">
                      <div className="feature-line medium" />
                      <div className="feature-line short" />
                    </div>
                    <div className="feature-preview-body-lines" style={{ marginTop: '12px' }}>
                      <div className="feature-line long" />
                      <div className="feature-line medium" />
                      <div className="feature-line long" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key capabilities */}
        <section className="feature-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 m-0">Key Capabilities</h2>
          </div>
          <div className="feature-capabilities-grid">
            <div className="feature-capability-card">
              <div className="feature-capability-icon">
                <i className="fas fa-smile" />
              </div>
              <h3 className="feature-capability-title">Sentiment Detection</h3>
              <p className="feature-capability-text">
                Quickly see how positive, neutral, or negative your overall feedback is.
              </p>
            </div>
            <div className="feature-capability-card">
              <div className="feature-capability-icon">
                <i className="fas fa-tags" />
              </div>
              <h3 className="feature-capability-title">Theme Extraction</h3>
              <p className="feature-capability-text">
                Group comments into themes like logistics, content, speakers, and more.
              </p>
            </div>
            <div className="feature-capability-card">
              <div className="feature-capability-icon">
                <i className="fas fa-percentage" />
              </div>
              <h3 className="feature-capability-title">Instant Score Aggregation</h3>
              <p className="feature-capability-text">
                Turn raw ratings into simple scores that any committee can review.
              </p>
            </div>
          </div>
        </section>

        {/* Main tool */}
        <section className="feature-section" id="feedback-tool">
          <div className="feature-tool-shell">
            <div className="feature-tool-card">
              <FeedbackAnalyzer />
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="feature-section">
          <div className="feature-two-column">
            <div>
              <h2 className="h4 mb-3">Where Feedback Analyzer shines</h2>
              <ul className="feature-simple-list">
                <li>
                  <i className="fas fa-university" />
                  <span>College fests and cultural events</span>
                </li>
                <li>
                  <i className="fas fa-chalkboard-teacher" />
                  <span>Workshops, guest lectures, and bootcamps</span>
                </li>
                <li>
                  <i className="fas fa-laptop-code" />
                  <span>Hackathons and tech competitions</span>
                </li>
                <li>
                  <i className="fas fa-user-friends" />
                  <span>Faculty and internal feedback surveys</span>
                </li>
              </ul>
            </div>
            <div className="feature-mini-mockup">
              <div className="feature-mini-mockup-inner">
                <div className="feature-mini-header">
                  <div className="feature-mini-title">Insights Snapshot</div>
                  <span className="feature-mini-tag">Top themes</span>
                </div>
                <div className="feature-mini-body">
                  <div className="feature-mini-pill" />
                  <div className="feature-mini-pill" />
                  <div className="feature-mini-pill" />
                  <div className="feature-mini-pill" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="feature-section">
          <div className="feature-final-cta-shell text-center">
            <h2 className="feature-final-cta-title">Understand Your Audience Better</h2>
            <p className="text-muted mb-4">
              See beyond raw comments. Turn spreadsheets into clear narratives your
              organizing team can align around.
            </p>
            <a href="#feedback-tool" className="feature-primary-btn">
              Upload Feedback CSV
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FeedbackAnalyzerPage;
