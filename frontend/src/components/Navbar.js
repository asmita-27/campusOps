import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['home', 'event-report', 'feedback', 'image-services', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll for nav links
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    
    // Check if it's a protected feature section
    const protectedSections = ['event-report', 'feedback', 'image-services'];
    
    if (protectedSections.includes(sectionId)) {
      // If user is not logged in, redirect to login
      if (!user) {
        navigate('/login');
        return;
      }
      
      // If logged in, navigate to dashboard
      if (location.pathname !== '/dashboard') {
        navigate('/dashboard');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }
    
    // For public sections (home, about), navigate normally
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className={`custom-navbar navbar navbar-expand-lg navbar-dark sticky-top ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <a 
          className="navbar-brand fw-bold" 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <i className="fas fa-calendar-alt me-2"></i>
          CampusOps
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} 
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                // data-tooltip="Go to Home"
              >
                <i className="fas fa-home me-1"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${location.pathname === '/event-report-generator' ? 'active' : ''}`} 
                href="/event-report-generator"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/event-report-generator');
                }}
                // data-tooltip="Generate Event Reports"
              >
                <i className="fas fa-file-alt me-1"></i>Event Reports
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${location.pathname === '/feedback-analyzer' ? 'active' : ''}`} 
                href="/feedback-analyzer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/feedback-analyzer');
                }}
                // data-tooltip="Analyze Feedback"
              >
                <i className="fas fa-comments me-1"></i>Feedback Analysis
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${location.pathname === '/image-services' ? 'active' : ''}`} 
                href="/image-services"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/image-services');
                }}
                // data-tooltip="Image Processing Services"
              >
                <i className="fas fa-image me-1"></i>Image Services
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} 
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                // data-tooltip="About CampusOps"
              >
                <i className="fas fa-info-circle me-1"></i>About
              </a>
            </li>
            
            {/* Authentication buttons */}
            {user ? (
              <>
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="/dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/dashboard');
                    }}
                  >
                    <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>
                    {user.club?.name || 'Club'}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <span className="dropdown-item-text">
                        <small className="text-muted">Logged in as</small><br />
                        <strong>{user.club?.name}</strong>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={handleLogoutClick}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/login');
                    }}
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>Login
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link btn btn-outline-light ms-2" 
                    href="/signup"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/signup');
                    }}
                    style={{ borderRadius: '20px', padding: '5px 15px' }}
                  >
                    <i className="fas fa-user-plus me-1"></i>Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* Optional scroll progress indicator */}
      <div className="scroll-progress" style={{ width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}></div>
    </nav>
  );
}

export default Navbar;