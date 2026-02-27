import React, { useState, useEffect } from 'react';
import './DataManagement.css';

const API_BASE = 'http://localhost:8000/api/management';

function DataManagement() {
  const [activeTab, setActiveTab] = useState('events');
  const [data, setData] = useState({ events: [], members: [], budget: [], reports: [] });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [stats, setStats] = useState({ events: 0, members: 0, budget: 0, reports: 0 });

  // Fetch data for active tab
  useEffect(() => {
    fetchData();
    fetchStats();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      const result = await response.json();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${activeTab}`);
      const result = await response.json();
      if (result.success) {
        setData(prev => ({ ...prev, [activeTab]: result[activeTab] || result.budget_items || [] }));
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setModalMode('create');
    setCurrentItem(getEmptyItem());
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/${activeTab}/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result.success) {
        fetchData();
        fetchStats();
        alert('Deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const url = modalMode === 'create' 
        ? `${API_BASE}/${activeTab}`
        : `${API_BASE}/${activeTab}/${currentItem._id}`;
      
      const method = modalMode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem)
      });
      
      const result = await response.json();
      if (result.success) {
        setShowModal(false);
        fetchData();
        fetchStats();
        alert(`${modalMode === 'create' ? 'Created' : 'Updated'} successfully!`);
      } else {
        alert(result.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save');
    }
  };

  const getEmptyItem = () => {
    switch (activeTab) {
      case 'events':
        return {
          name: '',
          date: new Date().toISOString().split('T')[0],
          venue: '',
          description: '',
          organizer: '',
          status: 'planned',
          budget_allocated: 0,
          attendees_expected: 0,
          category: 'General'
        };
      case 'members':
        return {
          name: '',
          email: '',
          phone: '',
          role: '',
          department: '',
          join_date: new Date().toISOString().split('T')[0],
          status: 'active',
          skills: []
        };
      case 'budget':
        return {
          title: '',
          amount: 0,
          type: 'expense',
          category: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          status: 'pending'
        };
      case 'reports':
        return {
          title: '',
          type: 'event',
          content: '',
          summary: '',
          generated_by: 'User',
          status: 'draft'
        };
      default:
        return {};
    }
  };

  const renderTable = () => {
    const items = data[activeTab] || [];
    
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (items.length === 0) {
      return (
        <div className="empty-state">
          <i className="fas fa-inbox"></i>
          <p>No {activeTab} found. Create your first one!</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'events':
        return (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Organizer</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.venue}</td>
                    <td>{item.organizer}</td>
                    <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                    <td>${item.budget_allocated || 0}</td>
                    <td className="actions">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'members':
        return (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>{item.department}</td>
                    <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                    <td className="actions">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'budget':
        return (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td><span className={`badge badge-${item.type}`}>{item.type}</span></td>
                    <td className={item.type === 'income' ? 'text-success' : 'text-danger'}>
                      {item.type === 'income' ? '+' : '-'}${item.amount}
                    </td>
                    <td>{item.category}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                    <td className="actions">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'reports':
        return (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Generated By</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>{item.generated_by}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                    <td className="actions">
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderForm = () => {
    if (!currentItem) return null;

    const updateField = (field, value) => {
      setCurrentItem(prev => ({ ...prev, [field]: value }));
    };

    switch (activeTab) {
      case 'events':
        return (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Event Name *</label>
              <input type="text" required value={currentItem.name || ''} 
                onChange={(e) => updateField('name', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input type="date" required value={currentItem.date || ''} 
                  onChange={(e) => updateField('date', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Venue *</label>
                <input type="text" required value={currentItem.venue || ''} 
                  onChange={(e) => updateField('venue', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="3" value={currentItem.description || ''} 
                onChange={(e) => updateField('description', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Organizer</label>
                <input type="text" value={currentItem.organizer || ''} 
                  onChange={(e) => updateField('organizer', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={currentItem.status || 'planned'} 
                  onChange={(e) => updateField('status', e.target.value)}>
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Budget Allocated</label>
                <input type="number" value={currentItem.budget_allocated || 0} 
                  onChange={(e) => updateField('budget_allocated', parseFloat(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Expected Attendees</label>
                <input type="number" value={currentItem.attendees_expected || 0} 
                  onChange={(e) => updateField('attendees_expected', parseInt(e.target.value))} />
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        );
      
      case 'members':
        return (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" required value={currentItem.name || ''} 
                onChange={(e) => updateField('name', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" required value={currentItem.email || ''} 
                  onChange={(e) => updateField('email', e.target.value)} 
                  disabled={modalMode === 'edit'} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={currentItem.phone || ''} 
                  onChange={(e) => updateField('phone', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Role *</label>
                <input type="text" required value={currentItem.role || ''} 
                  onChange={(e) => updateField('role', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" value={currentItem.department || ''} 
                  onChange={(e) => updateField('department', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Join Date</label>
                <input type="date" value={currentItem.join_date ? currentItem.join_date.split('T')[0] : ''} 
                  onChange={(e) => updateField('join_date', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={currentItem.status || 'active'} 
                  onChange={(e) => updateField('status', e.target.value)}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        );
      
      case 'budget':
        return (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Title *</label>
              <input type="text" required value={currentItem.title || ''} 
                onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Type *</label>
                <select value={currentItem.type || 'expense'} 
                  onChange={(e) => updateField('type', e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount *</label>
                <input type="number" step="0.01" required value={currentItem.amount || 0} 
                  onChange={(e) => updateField('amount', parseFloat(e.target.value))} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <input type="text" required value={currentItem.category || ''} 
                  onChange={(e) => updateField('category', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={currentItem.date ? currentItem.date.split('T')[0] : ''} 
                  onChange={(e) => updateField('date', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="3" value={currentItem.description || ''} 
                onChange={(e) => updateField('description', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={currentItem.status || 'pending'} 
                onChange={(e) => updateField('status', e.target.value)}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        );
      
      case 'reports':
        return (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Title *</label>
              <input type="text" required value={currentItem.title || ''} 
                onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Type *</label>
                <select value={currentItem.type || 'event'} 
                  onChange={(e) => updateField('type', e.target.value)}>
                  <option value="event">Event</option>
                  <option value="budget">Budget</option>
                  <option value="feedback">Feedback</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={currentItem.status || 'draft'} 
                  onChange={(e) => updateField('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="final">Final</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Summary</label>
              <textarea rows="3" value={currentItem.summary || ''} 
                onChange={(e) => updateField('summary', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea rows="5" value={currentItem.content || ''} 
                onChange={(e) => updateField('content', e.target.value)} />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="data-management">
      <div className="management-header">
        <h2><i className="fas fa-database"></i> Data Management</h2>
        <p>Manage your events, members, budget, and reports</p>
      </div>

      {/* Tabs */}
      <div className="management-tabs">
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <i className="fas fa-calendar"></i>
          Events ({stats.events})
        </button>
        <button 
          className={`tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <i className="fas fa-users"></i>
          Members ({stats.members})
        </button>
        <button 
          className={`tab ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          <i className="fas fa-dollar-sign"></i>
          Budget (${stats.budget})
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <i className="fas fa-file-alt"></i>
          Reports ({stats.reports})
        </button>
      </div>

      {/* Content */}
      <div className="management-content">
        <div className="content-header">
          <h3>
            <i className={`fas fa-${activeTab === 'events' ? 'calendar' : activeTab === 'members' ? 'users' : activeTab === 'budget' ? 'dollar-sign' : 'file-alt'}`}></i>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h3>
          <button className="btn btn-primary" onClick={handleCreate}>
            <i className="fas fa-plus"></i>
            Add {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
          </button>
        </div>

        {renderTable()}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalMode === 'create' ? 'Create' : 'Edit'} {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
              </h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {renderForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataManagement;
