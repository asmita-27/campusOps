import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageServices from './ImageServices';
import './FeaturePages.css';

function ImageServicesPage() {
  return (
    <div className="feature-page feature-page-light">
      <Navbar />

      <main className="feature-page-inner">

        {/* HERO */}
        <section className="feature-section" style={{ marginTop: '96px' }}>
          <div className="feature-hero-shell">
            <div className="feature-hero-grid">
              <div>
                <div className="feature-label">AI VISION</div>
                <h1 className="feature-hero-title">
                  Extract Insights From Event Images Instantly
                </h1>
                <p className="feature-hero-subtitle">
                  Let AI read posters, banners, and crowd photos so you can focus on
                  running the event—not documenting it.
                </p>

                <div className="feature-hero-actions">
                  <a href="#image-services-tool" className="feature-primary-btn">
                    <i className="fas fa-upload" />
                    Upload Image
                  </a>
                </div>
              </div>

              <div className="feature-hero-preview">
                <div className="feature-preview-card" style={{ minHeight: '320px' }}>
                  <div className="feature-preview-glow" />
                  <div className="feature-preview-inner">
                    <div className="feature-preview-header">
                      <div>
                        <div className="feature-preview-title">Image Insight Panel</div>
                        <div className="feature-preview-meta">OCR • Captions • Tags</div>
                      </div>
                      <span className="badge bg-gradient">
                        <i className="fas fa-eye" />
                      </span>
                    </div>

                    <div className="feature-preview-body-lines">
                      <div className="feature-line long" />
                      <div className="feature-line medium" />
                    </div>

                    <div className="feature-preview-body-lines" style={{ marginTop: '12px' }}>
                      <div className="feature-line medium" />
                      <div className="feature-line short" />
                      <div className="feature-line long" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SERVICES OVERVIEW */}
        <section className="feature-section">
          <div className="feature-wide-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 m-0">Image Services Overview</h2>
            </div>

            <div className="feature-services-grid">
              <div className="feature-service-card">
                <div className="feature-service-icon"><i className="fas fa-file-alt" /></div>
                <h3 className="feature-service-title">OCR Extraction</h3>
                <p className="feature-service-text">
                  Pull searchable text from posters, banners and schedules.
                </p>
              </div>

              <div className="feature-service-card">
                <div className="feature-service-icon"><i className="fas fa-comment-dots" /></div>
                <h3 className="feature-service-title">Caption Generation</h3>
                <p className="feature-service-text">
                  Generate captions for reports, posts and archives.
                </p>
              </div>

              <div className="feature-service-card">
                <div className="feature-service-icon"><i className="fas fa-hashtag" /></div>
                <h3 className="feature-service-title">Smart Tagging</h3>
                <p className="feature-service-text">
                  Auto-tag images by event, venue and activity.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ⭐ MAIN TOOL — FIXED LAYOUT ⭐ */}
        <section className="feature-section feature-tool-section" id="image-services-tool">
          <div className="feature-wide-container">
            <div className="feature-tool-wrapper tool-fullwidth-reset">
              <ImageServices />
            </div>
          </div>
        </section>


        {/* BENEFITS */}
        <section className="feature-section">
          <div className="feature-wide-container">
            <div className="feature-two-column">
              <div>
                <h2 className="h4 mb-3">Built for busy event teams</h2>

                <ul className="feature-simple-list">
                  <li><i className="fas fa-clock" /><span>Save manual processing time.</span></li>
                  <li><i className="fas fa-file-signature" /><span>Improve documentation accuracy.</span></li>
                  <li><i className="fas fa-robot" /><span>Automate visual reporting across events.</span></li>
                </ul>
              </div>

              <div className="feature-mini-mockup">
                <div className="feature-mini-mockup-inner">
                  <div className="feature-mini-header">
                    <div className="feature-mini-title">Ideal For</div>
                    <span className="feature-mini-tag">Event ops</span>
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
          </div>
        </section>


        {/* FINAL CTA */}
        <section className="feature-section">
          <div className="feature-final-cta-shell text-center">
            <h2 className="feature-final-cta-title">Let AI Handle Your Event Media</h2>
            <p className="text-muted mb-4">
              Centralize captions, text and tags from your event photos automatically.
            </p>
            <a href="#image-services-tool" className="feature-primary-btn">
              Try Image Services
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default ImageServicesPage;