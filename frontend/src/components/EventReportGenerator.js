import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './EventReportGenerator.css';

function EventReportGenerator() {
  const [formData, setFormData] = useState({
    eventDescription: '',
    documentType: 'event_plan',
    outputFormat: 'text', // 'text' or 'document'
    images: [],
    template: null
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

  const handleTemplateUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      template: file
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
      formDataToSend.append('output_format', formData.outputFormat);
      
      // Add template file if provided
      if (formData.template) {
        formDataToSend.append('template', formData.template);
      }
      
      // Add images if provided
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      // Call Flask backend API
      const response = await fetch('http://localhost:8000/api/events/generate', {
        method: 'POST',
        body: formDataToSend,
      });

      // Handle document download
      if (formData.outputFormat === 'document') {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to generate document');
        }
        
        // Download file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event_${formData.documentType}_${Date.now()}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setResult({
          success: true,
          message: 'Document downloaded successfully!',
          downloadedFile: a.download
        });
      } else {
        // Handle text format (JSON response)
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to generate report');
        }
        
        setResult(data);
      }
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

                  {/* Output Format - NEW FEATURE */}
                  <div className="form-group mb-4">
                    <label htmlFor="outputFormat" className="form-label fw-bold">
                      <i className="fas fa-file-download me-2"></i>
                      Output Format
                      <span className="badge bg-success ms-2">NEW</span>
                    </label>
                    <select
                      className="form-select"
                      id="outputFormat"
                      name="outputFormat"
                      value={formData.outputFormat}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="text">📄 Text (Copy & Paste)</option>
                      <option value="document">📥 Download as DOCX</option>
                    </select>
                    <small className="form-text text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Choose text format to view and copy, or download as a formatted Word document
                    </small>
                  </div>

                  {/* Template Upload - NEW FEATURE */}
                  <div className="form-group mb-4">
                    <label htmlFor="template" className="form-label fw-bold">
                      <i className="fas fa-file-contract me-2"></i>
                      Document Template (Optional)
                      <span className="badge bg-primary ms-2">NEW</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="template"
                      name="template"
                      accept=".txt,.docx,.pdf"
                      onChange={handleTemplateUpload}
                    />
                    <small className="form-text text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Upload your club's documentation template (TXT, DOCX, or PDF) and the AI will match your style!
                    </small>
                    {formData.template && (
                      <div className="mt-3">
                        <div className="alert alert-info py-2" role="alert">
                          <i className="fas fa-check-circle me-2"></i>
                          Template: <strong>{formData.template.name}</strong>
                          <span className="badge bg-success ms-2">
                            {(formData.template.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      </div>
                    )}
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
                      {result.message || 'Report generated successfully!'}
                      {result.metadata?.template_used && (
                        <span className="ms-2">
                          <i className="fas fa-file-contract me-1"></i>
                          Template-matched ({result.metadata.template_format})
                        </span>
                      )}
                      {result.downloadedFile && (
                        <div className="mt-2">
                          <strong>Downloaded file: {result.downloadedFile}</strong>
                        </div>
                      )}
                    </div>
                    
                    {/* Text format display */}
                    {result.data && !result.downloadedFile && (
                      <div className="card">
                        <div className="card-header bg-gradient d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 text-white">
                            <i className="fas fa-file-alt me-2"></i>
                            Generated Report
                          </h5>
                          <button 
                            className="btn btn-sm btn-light"
                            onClick={() => {
                              const content = result.data?.content || JSON.stringify(result.data, null, 2);
                              navigator.clipboard.writeText(content);
                              alert('Report copied to clipboard!');
                            }}
                          >
                            <i className="fas fa-copy me-1"></i>
                            Copy
                          </button>
                        </div>
                        <div className="card-body p-0">
                          {result.data?.content ? (
                            // Template-matched content with markdown rendering
                            <div className="p-4 markdown-content">
                              <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  table: ({node, ...props}) => (
                                    <table className="table table-bordered table-hover" {...props} />
                                  ),
                                  thead: ({node, ...props}) => (
                                    <thead className="table-light" {...props} />
                                  ),
                                  th: ({node, ...props}) => (
                                    <th className="fw-bold" {...props} />
                                  ),
                                  h1: ({node, ...props}) => (
                                    <h3 className="mt-4 mb-3 text-primary" {...props} />
                                  ),
                                  h2: ({node, ...props}) => (
                                    <h4 className="mt-3 mb-2 text-secondary" {...props} />
                                  ),
                                  h3: ({node, ...props}) => (
                                    <h5 className="mt-3 mb-2" {...props} />
                                  ),
                                }}
                              >
                                {result.data.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            // JSON format (legacy)
                            <pre className="bg-light p-4 rounded-3 m-0">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          )}
                        </div>
                        
                        {/* Display metadata */}
                        {result.metadata && (
                          <div className="card-footer bg-light">
                            <small className="text-muted">
                              <strong>Metadata:</strong>
                              <div className="mt-2">
                                <span className="badge bg-secondary me-2">
                                  Type: {result.metadata.document_type}
                                </span>
                                {result.metadata.images_uploaded > 0 && (
                                  <span className="badge bg-info me-2">
                                    Images: {result.metadata.images_uploaded}
                                  </span>
                                )}
                                {result.metadata.template_used && (
                                  <span className="badge bg-success me-2">
                                    <i className="fas fa-check me-1"></i>
                                    Template Applied
                                  </span>
                                )}
                                {result.data?.word_count && (
                                  <span className="badge bg-primary">
                                    Words: {result.data.word_count}
                                  </span>
                                )}
                              </div>
                            </small>
                          </div>
                        )}
                      </div>
                    )}
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