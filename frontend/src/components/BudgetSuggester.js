import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './BudgetSuggester.css';

function BudgetSuggester() {
  const [formData, setFormData] = useState({
    event_type: '',
    attendees: '',
    duration: '3',
    venue_type: 'indoor',
    additional_requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const requirements = formData.additional_requirements
        ? formData.additional_requirements.split(',').map(r => r.trim()).filter(r => r)
        : [];

      const response = await fetch('http://localhost:8000/api/budget/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          attendees: parseInt(formData.attendees),
          duration: parseFloat(formData.duration),
          additional_requirements: requirements
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuggestion(result);
      } else {
        setError(result.error || 'Failed to generate budget suggestion');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="budget-suggester" className="budget-suggester-section py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">
              <i className="fas fa-money-bill-wave me-2"></i>
              AI Budget Suggester
            </h2>
            <p className="lead">
              Get intelligent budget recommendations powered by AI for your events
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="card shadow-lg">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="event_type" className="form-label fw-bold">
                        <i className="fas fa-calendar-alt me-2"></i>
                        Event Type *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="event_type"
                        name="event_type"
                        value={formData.event_type}
                        onChange={handleChange}
                        placeholder="e.g., Technical Workshop, Cultural Fest, Seminar"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="attendees" className="form-label fw-bold">
                        <i className="fas fa-users me-2"></i>
                        Expected Attendees *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="attendees"
                        name="attendees"
                        value={formData.attendees}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="duration" className="form-label fw-bold">
                        <i className="fas fa-clock me-2"></i>
                        Duration (hours)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        step="0.5"
                        min="0.5"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="venue_type" className="form-label fw-bold">
                        <i className="fas fa-building me-2"></i>
                        Venue Type
                      </label>
                      <select
                        className="form-control"
                        id="venue_type"
                        name="venue_type"
                        value={formData.venue_type}
                        onChange={handleChange}
                      >
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="additional_requirements" className="form-label fw-bold">
                      <i className="fas fa-list me-2"></i>
                      Additional Requirements (comma-separated)
                    </label>
                    <textarea
                      className="form-control"
                      id="additional_requirements"
                      name="additional_requirements"
                      value={formData.additional_requirements}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g., Guest speaker, Live streaming, Photography, Catering"
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
                          Generating Budget...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic me-2"></i>
                          Generate Budget Suggestion
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

                {suggestion && (
                  <div className="mt-5">
                    <div className="alert alert-success">
                      <i className="fas fa-check-circle me-2"></i>
                      Budget suggestion generated successfully!
                    </div>

                    {suggestion.total_budget > 0 && (
                      <div className="total-budget-card">
                        <h3>
                          <i className="fas fa-dollar-sign me-2"></i>
                          Estimated Total Budget
                        </h3>
                        <div className="budget-amount">
                          ${suggestion.total_budget.toLocaleString()}
                        </div>
                      </div>
                    )}

                    <div className="suggestion-content">
                      <h4 className="mb-3">
                        <i className="fas fa-file-invoice-dollar me-2"></i>
                        Detailed Budget Breakdown
                      </h4>
                      <div className="markdown-content">
                        <ReactMarkdown>{suggestion.suggestion}</ReactMarkdown>
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

export default BudgetSuggester;
