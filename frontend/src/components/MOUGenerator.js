import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './MOUGenerator.css';

function MOUGenerator() {
  const [formData, setFormData] = useState({
    party1_name: '',
    party1_address: '',
    party2_name: '',
    party2_address: '',
    purpose: '',
    event_name: '',
    duration: '1 year',
    terms: ''
  });
  const [loading, setLoading] = useState(false);
  const [mou, setMou] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMou(null);

    try {
      const response = await fetch('http://localhost:8000/api/mou/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setMou(result);
      } else {
        setError(result.error || 'Failed to generate MOU');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!mou || !mou.id) return;

    try {
      const response = await fetch(`http://localhost:8000/api/mou/download/${mou.id}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = mou.filename || 'MOU_Document.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  };

  return (
    <section id="mou-generator" className="mou-generator-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-file-contract me-2"></i>
              MOU Generator
            </h2>
            <p className="lead">
              Generate professional Memorandum of Understanding documents with AI
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="card shadow-lg">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="section-title">
                    <i className="fas fa-building me-2"></i>
                    First Party Details (Your Organization)
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="party1_name" className="form-label fw-bold">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="party1_name"
                        name="party1_name"
                        value={formData.party1_name}
                        onChange={handleChange}
                        placeholder="e.g., Tech Club, Computer Society"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="party1_address" className="form-label fw-bold">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="party1_address"
                        name="party1_address"
                        value={formData.party1_address}
                        onChange={handleChange}
                        placeholder="Complete address"
                      />
                    </div>
                  </div>

                  <div className="section-title mt-4">
                    <i className="fas fa-handshake me-2"></i>
                    Second Party Details (Partner/Sponsor)
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="party2_name" className="form-label fw-bold">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="party2_name"
                        name="party2_name"
                        value={formData.party2_name}
                        onChange={handleChange}
                        placeholder="e.g., ABC Corporation, XYZ Foundation"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="party2_address" className="form-label fw-bold">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="party2_address"
                        name="party2_address"
                        value={formData.party2_address}
                        onChange={handleChange}
                        placeholder="Complete address"
                      />
                    </div>
                  </div>

                  <div className="section-title mt-4">
                    <i className="fas fa-clipboard-list me-2"></i>
                    Agreement Details
                  </div>

                  <div className="mb-3">
                    <label htmlFor="purpose" className="form-label fw-bold">
                      Purpose of Agreement *
                    </label>
                    <textarea
                      className="form-control"
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Describe the main purpose and objectives of this MOU..."
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="event_name" className="form-label fw-bold">
                        Event/Project Name (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="event_name"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        placeholder="e.g., Tech Fest 2026"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="duration" className="form-label fw-bold">
                        Duration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 1 year, 6 months"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="terms" className="form-label fw-bold">
                      Additional Terms/Conditions (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      id="terms"
                      name="terms"
                      value={formData.terms}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Any specific terms, conditions, or requirements..."
                    />
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Generating MOU...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic me-2"></i>
                          Generate MOU Document
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="alert alert-danger mt-4">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                {mou && (
                  <div className="mt-5">
                    <div className="alert alert-success d-flex justify-content-between align-items-center">
                      <span>
                        <i className="fas fa-check-circle me-2"></i>
                        MOU generated successfully!
                      </span>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={handleDownload}
                      >
                        <i className="fas fa-download me-2"></i>
                        Download DOCX
                      </button>
                    </div>

                    <div className="mou-content">
                      <div className="mou-header">
                        <h3>
                          <i className="fas fa-file-contract me-2"></i>
                          Generated MOU Document
                        </h3>
                        <p className="text-muted">Review the document below before downloading</p>
                      </div>

                      <div className="markdown-content">
                        <ReactMarkdown>{mou.content}</ReactMarkdown>
                      </div>

                      <div className="mou-footer">
                        <button
                          className="btn btn-primary"
                          onClick={handleDownload}
                        >
                          <i className="fas fa-download me-2"></i>
                          Download as DOCX
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MOUGenerator;
