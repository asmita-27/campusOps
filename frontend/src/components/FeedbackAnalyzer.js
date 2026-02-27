import React, { useState } from 'react';
import './FeedbackAnalyzer.css';
import './FeaturePages.css';
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
    if (!file) return setError('Please select a CSV file');

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
    
      <div className="fa-wrapper">

        {/* HERO */}
        <div className="fa-hero text-center">
          <h1><i className="fas fa-comments"></i> Feedback Analyzer</h1>
          <p>Upload your feedback CSV file and get AI-powered insights.</p>
        </div>

        <div className="fa-main-card">

          {/* Upload Panel */}
          <form onSubmit={handleSubmit}>

            <div className="fa-upload-header">
              <i className="fas fa-file-csv"></i>
              <span>Upload Feedback CSV</span>
            </div>

            <div className="fa-upload-box">
              <input type="file" accept=".csv" onChange={handleFileChange}/>
              <div className="fa-upload-inner">
                <button type="button" className="fa-file-btn">
                  Choose File
                </button>
                <span>{file ? file.name : "No file chosen"}</span>
              </div>
            </div>

            <div className="fa-info-box">
              Expected CSV format should include columns like  
              <strong> feedback, rating, comments</strong>
            </div>

            <button className="fa-analyze-btn" disabled={loading || !file}>
              {loading ? "Analyzing..." : "Analyze Feedback"}
            </button>

          </form>

          {/* RESULTS */}
          {result && (
            <div className="fa-results">

              <div className="fa-success">Analysis completed successfully!</div>

              {/* Stats */}
              <div className="fa-stats">
                <div className="fa-stat">
                  <h4>Satisfaction Score</h4>
                  <h2>{analysis.satisfaction_score || 'N/A'}</h2>
                </div>

                <div className="fa-stat">
                  <h4>Top Themes</h4>
                  <h2>{analysis.key_themes?.length || 0}</h2>
                </div>

                <div className="fa-stat">
                  <h4>Issues Found</h4>
                  <h2>{analysis.top_issues?.length || 0}</h2>
                </div>
              </div>

              {/* Summary */}
              {analysis.summary && (
                <div className="fa-glass-card">
                  <h3>📊 Summary</h3>
                  <p>{analysis.summary}</p>
                </div>
              )}

              {/* Issues */}
              {analysis.top_issues && (
                <div className="fa-glass-card">
                  <h3>⚠️ Top Issues</h3>
                  <ul>
                    {analysis.top_issues.map((i,idx)=><li key={idx}>{i}</li>)}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {analysis.recommendations && (
                <div className="fa-glass-card">
                  <h3>💡 Recommendations</h3>
                  <ul>
                    {analysis.recommendations.map((r,idx)=><li key={idx}>{r}</li>)}
                  </ul>
                </div>
              )}

            </div>
          )}

          {error && <div className="fa-error">{error}</div>}
        </div>
      </div>
  
  );
}

export default FeedbackAnalyzer;