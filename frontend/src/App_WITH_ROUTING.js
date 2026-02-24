// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventReportGenerator from './components/EventReportGenerator';
import FeedbackAnalyzer from './components/FeedbackAnalyzer';
import ImageServices from './components/ImageServices';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

// Home page component (public)
function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EventReportGenerator />
      <FeedbackAnalyzer />
      <ImageServices />
      <About />
      <Footer />
    </>
  );
}

// Dashboard component (protected)
function Dashboard({ user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body p-5">
                <h1 className="display-4 mb-4">
                  <i className="fas fa-tachometer-alt me-3"></i>
                  Welcome to {user?.club?.name || 'Dashboard'}!
                </h1>
                <p className="lead text-muted mb-4">
                  Your club management dashboard
                </p>
                <div className="row g-4">
                  <div className="col-md-3">
                    <div className="card text-center" style={{ borderLeft: `4px solid ${user?.club?.color || '#3498db'}` }}>
                      <div className="card-body">
                        <i className="fas fa-calendar-check fa-3x mb-3" style={{ color: user?.club?.color }}></i>
                        <h4>0</h4>
                        <p className="text-muted">Events</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card text-center" style={{ borderLeft: `4px solid ${user?.club?.color || '#3498db'}` }}>
                      <div className="card-body">
                        <i className="fas fa-users fa-3x mb-3" style={{ color: user?.club?.color }}></i>
                        <h4>0</h4>
                        <p className="text-muted">Members</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card text-center" style={{ borderLeft: `4px solid ${user?.club?.color || '#3498db'}` }}>
                      <div className="card-body">
                        <i className="fas fa-dollar-sign fa-3x mb-3" style={{ color: user?.club?.color }}></i>
                        <h4>$0</h4>
                        <p className="text-muted">Budget</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card text-center" style={{ borderLeft: `4px solid ${user?.club?.color || '#3498db'}` }}>
                      <div className="card-body">
                        <i className="fas fa-file-alt fa-3x mb-3" style={{ color: user?.club?.color }}></i>
                        <h4>0</h4>
                        <p className="text-muted">Reports</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-5" />
                <h3 className="mb-4">Quick Actions</h3>
                <div className="d-flex gap-3 flex-wrap">
                  <a href="#event-report" className="btn btn-primary btn-lg">
                    <i className="fas fa-plus me-2"></i>
                    Create Event
                  </a>
                  <a href="#feedback" className="btn btn-success btn-lg">
                    <i className="fas fa-chart-line me-2"></i>
                    Analyze Feedback
                  </a>
                  <button className="btn btn-info btn-lg">
                    <i className="fas fa-money-bill me-2"></i>
                    Suggest Budget
                  </button>
                  <button className="btn btn-warning btn-lg">
                    <i className="fas fa-file-contract me-2"></i>
                    Generate MOU
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <EventReportGenerator />
        <FeedbackAnalyzer />
        <ImageServices />
      </div>
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const clubData = localStorage.getItem('club');
    
    if (token && clubData) {
      try {
        const club = JSON.parse(clubData);
        setUser({ token, club });
      } catch (err) {
        console.error('Error parsing stored club data:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('club');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (data) => {
    setUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('club');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              user ? <Navigate to="/dashboard" /> : <Signup />
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
