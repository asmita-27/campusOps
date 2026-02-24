import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    club_name: '',
    club_id: '',
    email: '',
    password: '',
    confirm_password: '',
    description: '',
    color: '#3498db'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const colorOptions = [
    '#3498db', '#e74c3c', '#2ecc71', '#9b59b6',
    '#f39c12', '#1abc9c', '#e67e22', '#34495e'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate club_id from club_name
    if (name === 'club_name') {
      const clubId = value.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      setFormData(prev => ({
        ...prev,
        club_id: clubId
      }));
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          club_name: formData.club_name,
          club_id: formData.club_id,
          email: formData.email,
          password: formData.password,
          description: formData.description,
          color: formData.color
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <div className="success-message">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Registration Successful!</h2>
            <p>Your club has been created successfully.</p>
            <p>Redirecting to login page...</p>
            <button
              className="signup-button"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength();

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-logo">
            <i className="fas fa-user-plus"></i>
          </div>
          <h1 className="signup-title">Create Club Account</h1>
          <p className="signup-subtitle">Join CampusOps Platform</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="club_name" className="form-label">
              <i className="fas fa-users me-2"></i>
              Club Name *
            </label>
            <input
              type="text"
              id="club_name"
              name="club_name"
              className="form-input"
              placeholder="e.g., Technology Club"
              value={formData.club_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="club_id" className="form-label">
              <i className="fas fa-id-badge me-2"></i>
              Club ID (Auto-generated)
            </label>
            <input
              type="text"
              id="club_id"
              name="club_id"
              className="form-input"
              placeholder="tech_club"
              value={formData.club_id}
              readOnly
              style={{ backgroundColor: '#f7fafc' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <i className="fas fa-envelope me-2"></i>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="club@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-2"></i>
                Password *
              </label>
              <div className="password-toggle">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
              <div className="password-strength">
                {[1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`strength-bar ${
                      passwordStrength >= level ? 'active' : ''
                    } ${
                      passwordStrength === 1 ? 'weak' :
                      passwordStrength === 2 ? 'medium' : 'strong'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password" className="form-label">
                <i className="fas fa-lock me-2"></i>
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirm_password"
                name="confirm_password"
                className="form-input"
                placeholder="Re-enter password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              <i className="fas fa-align-left me-2"></i>
              Club Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              placeholder="Brief description of your club"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-palette me-2"></i>
              Club Theme Color
            </label>
            <div className="club-color-picker">
              {colorOptions.map(color => (
                <div
                  key={color}
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                ></div>
              ))}
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms and Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="signup-footer">
          Already have an account?
          <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
