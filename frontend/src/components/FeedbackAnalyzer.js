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
const analysis = result?.data || result;
  return (
    <section className="feedback-analyzer-section">
      <div className="feedback-analyzer-wrapper">

        {/* Header */}
        <div className="feedback-header text-center mb-4">
          <h2 className="fw-bold mb-3">
            <i className="fas fa-comments me-2"></i>
            Feedback Analyzer
          </h2>
          <p className="text-muted">
            Upload your feedback CSV file and get AI-powered insights.
          </p>
        </div>

        <div className="card shadow-lg feedback-main-card">
          <div className="card-body">

            {/* Upload Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold">
                  <i className="fas fa-file-csv me-2"></i>
                  Upload Feedback CSV
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept=".csv"
                  onChange={handleFileChange}
                  required
                />

                {file && (
                  <div className="mt-3">
                    <span className="badge bg-success">
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                )}
              </div>

              <div className="alert alert-info">
                Expected CSV format should include columns like
                <strong> feedback, rating, comments</strong>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100"
                disabled={loading || !file}
              >
                {loading ? 'Analyzing Feedback...' : 'Analyze Feedback'}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div className="alert alert-danger mt-4">
                {error}
              </div>
            )}

            {/* RESULTS DASHBOARD */}
            {result && (
              <div className="feedback-results">

                <div className="alert alert-success">
                  Analysis completed successfully!
                </div>

                {/* Top Stats */}
                <div className="feedback-stats-grid">
  <div className="stat-card border-success">
    <h6>Satisfaction Score</h6>
    <h2 className="text-success">
      {analysis.satisfaction_score || 'N/A'}
    </h2>
  </div>

  <div className="stat-card border-primary">
    <h6>Top Praises</h6>
    <h2 className="text-primary">
      {analysis.key_themes?.length || 0}
    </h2>
  </div>

  <div className="stat-card border-warning">
    <h6>Issues Found</h6>
    <h2 className="text-warning">
      {analysis.top_issues?.length || 0}
    </h2>
  </div>
</div>

                {/* Analysis Cards */}
                <div className="feedback-analysis">

  {analysis.summary && (
    <div className="analysis-card">
      <h5>📊 Overall Summary</h5>
      <p>{analysis.summary}</p>
    </div>
  )}

  {analysis.key_themes && (
    <div className="analysis-card">
      <h5>✨ Key Themes</h5>
      <div className="tag-container">
        {analysis.key_themes.map((theme, i) => (
          <span key={i} className="theme-tag">{theme}</span>
        ))}
      </div>
    </div>
  )}

  {analysis.top_issues && (
    <div className="analysis-card">
      <h5>⚠️ Top Issues</h5>
      <ul>
        {analysis.top_issues.map((issue, i) => (
          <li key={i}>{issue}</li>
        ))}
      </ul>
    </div>
  )}

  {analysis.recommendations && (
    <div className="analysis-card">
      <h5>💡 Recommendations</h5>
      <ul>
        {analysis.recommendations.map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>
    </div>
  )}

</div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

export default FeedbackAnalyzer;