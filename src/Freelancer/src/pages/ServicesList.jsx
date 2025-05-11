import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServicesContext } from '../context/ServicesContext';
import './ServicesList.css';

const ServicesList = () => {
  const { services, deleteService, toggleServiceStatus } = useContext(ServicesContext);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Filter services based on status and search term
  const filteredServices = services.filter(service => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && service.isActive) || 
      (filterStatus === 'inactive' && !service.isActive);
    
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const handleDelete = (id) => {
    deleteService(id);
    setConfirmDelete(null);
  };
  
  return (
    <div className="services-list-page">
      <div className="filters-bar">
        <div className="search-input">
          <input 
            type="text" 
            placeholder="Search services..." 
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button 
            className={`btn ${filterStatus === 'active' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </button>
          <button 
            className={`btn ${filterStatus === 'inactive' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('inactive')}
          >
            Inactive
          </button>
        </div>
        
        <Link to="/freelancer/services/new" className="btn btn-accent">
          + New Service
        </Link>
      </div>
      
      {filteredServices.length > 0 ? (
        <div className="services-grid">
          {filteredServices.map(service => (
            <div key={service.id} className={`service-card ${!service.isActive ? 'inactive' : ''}`}>
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className={`service-status ${service.isActive ? 'active' : 'inactive'}`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-meta">
                  <div className="service-price">${service.price}</div>
                  <div className="service-delivery">{service.deliveryTime}</div>
                </div>
                
                <div className="service-category">{service.category}</div>
                
                <div className="service-actions">
                  <Link to={`/freelancer/services/edit/${service.id}`} className="btn btn-sm btn-outline">
                    Edit
                  </Link>
                  
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => toggleServiceStatus(service.id)}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => setConfirmDelete(service.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {confirmDelete === service.id && (
                <div className="delete-confirmation">
                  <div className="delete-message">
                    Are you sure you want to delete this service?
                  </div>
                  <div className="delete-actions">
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(service.id)}
                    >
                      Yes, Delete
                    </button>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-services">
          <p>No services found. Create a new service to get started.</p>
          <Link to="/freelancer/services/new" className="btn btn-primary mt-md">
            Create New Service
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServicesList;