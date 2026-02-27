import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import EventReportGenerator from './EventReportGenerator';
import FeedbackAnalyzer from './FeedbackAnalyzer';
import ImageServices from './ImageServices';
import Footer from './Footer';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const clubColor = user?.club?.color || '#667eea';
  const [stats, setStats] = useState({ events: 0, members: 0, budget: 0, reports: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/management/stats');
      const result = await response.json();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dashboard-container">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <div className="dashboard-welcome">
            <div className="dashboard-welcome-icon" style={{ background: `linear-gradient(135deg, ${clubColor} 0%, ${clubColor}dd 100%)` }}>
              <i className="fas fa-users"></i>
            </div>
            <h1>Welcome to {user?.club?.name || 'Dashboard'}!</h1>
            <p>Your club management dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card" style={{ color: clubColor }}>
              <div className="stat-card-icon" style={{ color: clubColor }}>
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-card-value">{loading ? '...' : stats.events}</div>
              <div className="stat-card-label">Events</div>
              <button 
                className="stat-manage-btn" 
                onClick={() => navigate('/management')}
                title="Manage Events"
              >
                <i className="fas fa-cog"></i> Manage
              </button>
            </div>

            <div className="stat-card" style={{ color: '#38ef7d' }}>
              <div className="stat-card-icon" style={{ color: '#38ef7d' }}>
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-card-value">{loading ? '...' : stats.members}</div>
              <div className="stat-card-label">Members</div>
              <button 
                className="stat-manage-btn" 
                onClick={() => navigate('/management')}
                title="Manage Members"
              >
                <i className="fas fa-cog"></i> Manage
              </button>
            </div>

            <div className="stat-card" style={{ color: '#fa8bff' }}>
              <div className="stat-card-icon" style={{ color: '#fa8bff' }}>
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-card-value">${loading ? '...' : stats.budget.toFixed(0)}</div>
              <div className="stat-card-label">Budget</div>
              <button 
                className="stat-manage-btn" 
                onClick={() => navigate('/management')}
                title="Manage Budget"
              >
                <i className="fas fa-cog"></i> Manage
              </button>
            </div>

            <div className="stat-card" style={{ color: '#ffc837' }}>
              <div className="stat-card-icon" style={{ color: '#ffc837' }}>
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="stat-card-value">{loading ? '...' : stats.reports}</div>
              <div className="stat-card-label">Reports</div>
              <button 
                className="stat-manage-btn" 
                onClick={() => navigate('/management')}
                title="Manage Reports"
              >
                <i className="fas fa-cog"></i> Manage
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h2>
              <i className="fas fa-bolt"></i>
              Quick Actions
            </h2>
            <div className="quick-actions-grid">
              <button 
                className="action-button create-event"
                onClick={() => handleActionClick('event-report')}
              >
                <i className="fas fa-plus"></i>
                Create Event
              </button>
              
              <button 
                className="action-button analyze-feedback"
                onClick={() => handleActionClick('feedback')}
              >
                <i className="fas fa-chart-line"></i>
                Analyze Feedback
              </button>
              
              <button 
                className="action-button suggest-budget"
                onClick={() => navigate('/budget-suggester')}
              >
                <i className="fas fa-money-bill-wave"></i>
                Suggest Budget
              </button>
              
              <button 
                className="action-button generate-mou"
                onClick={() => navigate('/mou-generator')}
              >
                <i className="fas fa-file-contract"></i>
                Generate MOU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <EventReportGenerator />
        <FeedbackAnalyzer />
        <ImageServices />
      </div>
      
      <Footer />
    </>
  );
}

export default Dashboard;
