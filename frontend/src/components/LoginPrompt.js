import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPrompt.css';

function LoginPrompt({ featureName = "this feature" }) {
  const navigate = useNavigate();

  return (
    <div className="login-prompt-container">
      <div className="login-prompt-card">
        <div className="login-prompt-icon">
          <i className="fas fa-lock"></i>
        </div>
        <h3 className="login-prompt-title">Authentication Required</h3>
        <p className="login-prompt-text">
          Please log in to access {featureName}. Create an account if you don't have one yet.
        </p>
        <div className="login-prompt-actions">
          <button 
            className="login-prompt-btn login-prompt-btn-primary"
            onClick={() => navigate('/login')}
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Log In
          </button>
          <button 
            className="login-prompt-btn login-prompt-btn-secondary"
            onClick={() => navigate('/signup')}
          >
            <i className="fas fa-user-plus me-2"></i>
            Sign Up
          </button>
        </div>
        <div className="login-prompt-features">
          <div className="login-prompt-feature-item">
            <i className="fas fa-check-circle"></i>
            <span>AI-powered tools</span>
          </div>
          <div className="login-prompt-feature-item">
            <i className="fas fa-check-circle"></i>
            <span>Save your work</span>
          </div>
          <div className="login-prompt-feature-item">
            <i className="fas fa-check-circle"></i>
            <span>Access full features</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
