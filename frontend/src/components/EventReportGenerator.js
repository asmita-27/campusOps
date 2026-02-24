import React, { useState } from 'react';
import './EventReportGenerator.css';

function EventReportGenerator() {
  const [formData, setFormData] = useState({
    eventDescription: '',
    documentType: 'event_plan',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('event_description', formData.eventDescription);
      formDataToSend.append('document_type', formData.documentType);
      
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      // Call Flask backend API
      const response = await fetch('http://localhost:8000/api/events/generate', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="event-report" className="event-report-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-file-alt me-2"></i>
              Event Report Generator
            </h2>
            <p className="lead">
              Create comprehensive event plans, summaries, and detailed reports powered by AI
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-lg">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Event Description */}
                  <div className="form-group mb-4">
                    <label htmlFor="eventDescription" className="form-label fw-bold">
                      <i className="fas fa-pencil-alt me-2"></i>
                      Event Description
                    </label>
                    <textarea
                      className="form-control"
                      id="eventDescription"
                      name="eventDescription"
                      rows="5"
                      placeholder="Describe your event in detail... (e.g., Annual tech conference with 500 attendees, keynote speakers, workshops, and networking sessions)"
                      value={formData.eventDescription}
                      onChange={handleInputChange}
                      required
                    />
                    <small className="form-text">
                      Provide comprehensive details about your event for better results
                    </small>
                  </div>

                  {/* Document Type */}
                  <div className="form-group mb-4">
                    <label htmlFor="documentType" className="form-label fw-bold">
                      <i className="fas fa-list me-2"></i>
                      Document Type
                    </label>
                    <select
                      className="form-select"
                      id="documentType"
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="event_plan">📋 Event Plan</option>
                      <option value="summary">📝 Event Summary</option>
                      <option value="report">📊 Detailed Report</option>
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="form-group mb-4">
                    <label htmlFor="images" className="form-label fw-bold">
                      <i className="fas fa-images me-2"></i>
                      Event Images (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <small className="form-text">
                      Upload event photos for enhanced report generation
                    </small>
                    {formData.images.length > 0 && (
                      <div className="mt-3">
                        <span className="badge">
                          <i className="fas fa-check-circle me-2"></i>
                          {formData.images.length} {formData.images.length === 1 ? 'image' : 'images'} selected
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic me-2"></i>
                          Generate Report
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Error Display */}
                {error && (
                  <div className="alert alert-danger mt-4" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Result Display */}
                {result && (
                  <div className="mt-5">
                    <div className="alert alert-success" role="alert">
                      <i className="fas fa-check-circle me-2"></i>
                      Report generated successfully!
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0 text-white">Generated Report</h5>
                      </div>
                      <div className="card-body p-0">
                        <pre className="bg-light p-4 rounded-3 m-0">
                          {JSON.stringify(result, null, 2)}
                        </pre>
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

export default EventReportGenerator;