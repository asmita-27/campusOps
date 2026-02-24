import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and club info in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('club', JSON.stringify(data.data.club));
        
        // Call success callback
        if (onLoginSuccess) {
          onLoginSuccess(data.data);
        }
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <h1 className="login-title">CampusOps</h1>
          <p className="login-subtitle">Club Management Platform</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <i className="fas fa-envelope me-2"></i>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Password
            </label>
            <div className="password-toggle">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
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
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="demo-credentials">
          <h4>
            <i className="fas fa-info-circle me-2"></i>
            Demo Credentials
          </h4>
          <p><strong>Tech Club:</strong> tech@example.com / tech123</p>
          <p><strong>Cultural Club:</strong> cultural@example.com / culture123</p>
          <p><strong>Sports Club:</strong> sports@example.com / sports123</p>
          <p><strong>Robotics Club:</strong> robotics@example.com / robo123</p>
        </div>

        <div className="login-footer">
          Don't have an account?
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
