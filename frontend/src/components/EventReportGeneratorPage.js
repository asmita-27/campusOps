import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EventReportGenerator from './EventReportGenerator';
import './FeaturePages.css';

function EventReportGeneratorPage() {
  return (
    <div className="feature-page feature-page-light">
      <Navbar />
      <main className="feature-page-inner">
        {/* Hero */}
        <section className="feature-section" style={{ marginTop: '96px' }}>
          <div className="feature-hero-shell">
            <div className="feature-hero-grid">
              <div>
                <div className="feature-label">AI REPORTING</div>
                <h1 className="feature-hero-title">Generate Professional Event Reports in Minutes</h1>
                <p className="feature-hero-subtitle">
                  Turn messy event notes, photos, and details into polished, share-ready reports
                  that look like they were crafted by your communications team.
                </p>
                <div className="feature-hero-actions">
                  <a href="#event-report-tool" className="feature-primary-btn">
                    <i className="fas fa-magic" />
                    Generate Report
                  </a>
                  <a href="#event-report-sample" className="feature-secondary-btn">
                    <i className="fas fa-eye" />
                    View Sample
                  </a>
                </div>
              </div>

              <div className="feature-hero-preview">
                <div className="feature-preview-card" style={{ minHeight: '320px' }}>
                  <div className="feature-preview-glow" />
                  <div className="feature-preview-inner">
                    <div className="feature-preview-header">
                      <div>
                        <div className="feature-preview-title">Campus Event Report</div>
                        <div className="feature-preview-meta">Draft • AI generated</div>
                      </div>
                      <span className="badge bg-gradient">PDF</span>
                    </div>
                    <div className="feature-preview-body-lines">
                      <div className="feature-line long" />
                      <div className="feature-line medium" />
                      <div className="feature-line short" />
                    </div>
                    <div className="feature-preview-body-lines" style={{ marginTop: '10px' }}>
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

        {/* How it works */}
        <section className="feature-section">
  <div className="feature-wide-container">
    <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 m-0">How It Works</h2>
            <p className="text-muted mb-0">Three simple steps from idea to polished report.</p>
          </div>
          <div className="feature-steps-grid">
            <div className="feature-step-card">
              <div className="feature-step-icon">
                <i className="fas fa-keyboard" />
              </div>
              <h3 className="feature-step-title">Enter Event Details</h3>
              <p className="feature-step-text">
                Describe your campus event, objectives, agenda, and key stakeholders.
              </p>
            </div>
            <div className="feature-step-card">
              <div className="feature-step-icon">
                <i className="fas fa-images" />
              </div>
              <h3 className="feature-step-title">Add Media &amp; Notes</h3>
              <p className="feature-step-text">
                Attach photos and raw notes so the AI understands what actually happened.
              </p>
            </div>
            <div className="feature-step-card">
              <div className="feature-step-icon">
                <i className="fas fa-file-download" />
              </div>
              <h3 className="feature-step-title">Generate &amp; Download</h3>
              <p className="feature-step-text">
                Get a structured, shareable report you can export or copy instantly.
              </p>
            </div>
             </div>
  </div> 
</section>

        {/* Main tool */}
{/* ⭐ MAIN TOOL — FIXED LAYOUT ⭐ */}
<section className="feature-section feature-tool-section" id="event-report-tool">
  <div className="feature-wide-container">

    {/* Wide SaaS wrapper (same as Feedback page) */}
    <div className="feature-tool-wrapper tool-fullwidth-reset">
      <EventReportGenerator />
    </div>

  </div>
</section>

        {/* Benefits */}
        <section className="feature-section" id="event-report-sample">
          <div className="feature-two-column">
            <div className="feature-benefits-list">
              <h2 className="h4 mb-3">Why student teams love CampusOps reports</h2>
              <div className="feature-benefit-item">
                <span className="feature-benefit-icon">
                  <i className="fas fa-check-circle" />
                </span>
                <span>Standardized formats that match what faculty and administration expect.</span>
              </div>
              <div className="feature-benefit-item">
                <span className="feature-benefit-icon">
                  <i className="fas fa-check-circle" />
                </span>
                <span>Save hours of writing time after every major event or fest.</span>
              </div>
              <div className="feature-benefit-item">
                <span className="feature-benefit-icon">
                  <i className="fas fa-check-circle" />
                </span>
                <span>Capture learnings and highlights in one place for next-year planning.</span>
              </div>
            </div>
            <div className="feature-mini-mockup">
              <div className="feature-mini-mockup-inner">
                <div className="feature-mini-header">
                  <div className="feature-mini-title">Sample Output</div>
                  <span className="feature-mini-tag">Event recap</span>
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
            <h2 className="feature-final-cta-title">Streamline Your Campus Reporting</h2>
            <p className="text-muted mb-4">
              Move away from last-minute Word documents and let AI prepare clean, structured
              reports your team can trust.
            </p>
            <a href="#event-report-tool" className="feature-primary-btn">
              Start Generating Reports
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default EventReportGeneratorPage;
