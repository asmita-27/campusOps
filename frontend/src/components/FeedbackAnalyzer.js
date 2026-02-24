import React, { useState } from 'react';
import './FeedbackAnalyzer.css';

function FeedbackAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid CSV file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Call Flask backend API
      const response = await fetch('http://localhost:8000/api/feedback/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className="feedback-analyzer-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-comments me-2"></i>
              Feedback Analyzer
            </h2>
            <p className="lead">
              Upload your feedback CSV file and get AI-powered insights on satisfaction, praises, and issues
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-lg">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* File Upload */}
                  <div className="form-group mb-4">
                    <label htmlFor="feedbackFile" className="form-label fw-bold">
                      <i className="fas fa-file-csv me-2"></i>
                      Upload Feedback CSV
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="feedbackFile"
                      accept=".csv"
                      onChange={handleFileChange}
                      required
                    />
                    <small className="form-text">
                      CSV file should contain feedback data with columns for responses
                    </small>
                    {file && (
                      <div className="mt-3">
                        <span className="badge">
                          <i className="fas fa-check-circle me-2"></i>
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="alert alert-info" role="alert">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Expected CSV Format:</strong> Your CSV should include columns such as 
                    'feedback', 'rating', 'comments', etc. The analyzer will extract key insights automatically.
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      disabled={loading || !file}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Analyzing Feedback...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-chart-line me-2"></i>
                          Analyze Feedback
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Error Display */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Result Display */}
                {result && (
                  <div className="mt-5">
                    <div className="alert alert-success" role="alert">
                      <i className="fas fa-check-circle me-2"></i>
                      Analysis completed successfully!
                    </div>
                    
                    <div className="row g-3">
                      {/* Satisfaction Score */}
                      <div className="col-md-4">
                        <div className="card text-center border-success h-100">
                          <div className="card-body">
                            <h6 className="text-muted mb-2">
                              <i className="fas fa-star text-success me-1"></i>
                              Satisfaction Score
                            </h6>
                            <h2 className="text-success fw-bold mb-0">
                              {result.satisfaction || 'N/A'}
                            </h2>
                          </div>
                        </div>
                      </div>
                      
                      {/* Top Praises */}
                      <div className="col-md-4">
                        <div className="card text-center border-primary h-100">
                          <div className="card-body">
                            <h6 className="text-muted mb-2">
                              <i className="fas fa-heart text-primary me-1"></i>
                              Top Praises
                            </h6>
                            <h2 className="text-primary fw-bold mb-0">
                              {result.praises?.length || 0}
                            </h2>
                          </div>
                        </div>
                      </div>
                      
                      {/* Issues Found */}
                      <div className="col-md-4">
                        <div className="card text-center border-warning h-100">
                          <div className="card-body">
                            <h6 className="text-muted mb-2">
                              <i className="fas fa-exclamation-triangle text-warning me-1"></i>
                              Issues Found
                            </h6>
                            <h2 className="text-warning fw-bold mb-0">
                              {result.issues?.length || 0}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="card mt-4">
                      <div className="card-header">
                        <h5 className="mb-0 text-white">Detailed Analysis</h5>
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

export default FeedbackAnalyzer;