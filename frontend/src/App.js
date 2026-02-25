// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SectionNavigation from './components/SectionNavigation';
import EventReportGeneratorShowcase from './components/EventReportGeneratorShowcase';
import FeedbackAnalyzerShowcase from './components/FeedbackAnalyzerShowcase';
import ImageServicesShowcase from './components/ImageServicesShowcase';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

// Feature detail pages
import EventReportGeneratorPage from './components/EventReportGeneratorPage';
import FeedbackAnalyzerPage from './components/FeedbackAnalyzerPage';
import ImageServicesPage from './components/ImageServicesPage';

// Import interactive components for dashboard
import EventReportGenerator from './components/EventReportGenerator';
import FeedbackAnalyzer from './components/FeedbackAnalyzer';
import ImageServices from './components/ImageServices';

// Home page component (public)
function HomePage({ user }) {
  return (
    <>
      <Navbar user={user} />
      <HeroSection />
      <SectionNavigation />
      <EventReportGeneratorShowcase />
      <FeedbackAnalyzerShowcase />
      <ImageServicesShowcase />
      <About />
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
          <Route path="/" element={<HomePage user={user} />} />
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

          {/* Feature detail pages (public) */}
          <Route path="/event-report-generator" element={<EventReportGeneratorPage />} />
          <Route path="/feedback-analyzer" element={<FeedbackAnalyzerPage />} />
          <Route path="/image-services" element={<ImageServicesPage />} />
          
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
