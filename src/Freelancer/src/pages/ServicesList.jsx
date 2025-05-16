import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ServicesContext } from '../context/ServicesContext';
import './ServicesList.css';

const ServicesList = () => {
  const { 
    services, 
    loading, 
    error,
    deleteService, 
    toggleServiceStatus,
    refetchServices
  } = useContext(ServicesContext);
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Filter services based on status and search term
  const filteredServices = services.filter(service => {
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && service.isActive) || 
      (filterStatus === 'inactive' && !service.isActive);
    
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const handleDelete = async (id) => {
    setIsProcessing(true);
    try {
      await deleteService(id);
      setConfirmDelete(null);
    } catch (error) {
      console.error("Failed to delete service:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleToggleStatus = async (id) => {
    setIsProcessing(true);
    try {
      await toggleServiceStatus(id);
    } catch (error) {
      console.error("Failed to toggle service status:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="services-list-page">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p>Chargement de vos services...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="services-list-page">
        <div className="error-message alert alert-danger">
          <p>Erreur lors du chargement de vos services: {error}</p>
          <button 
            onClick={refetchServices} 
            className="btn btn-primary"
            disabled={isProcessing}
          >
            {isProcessing ? 'Chargement...' : 'Réessayer'}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="services-list-page">
      <div className="filters-bar">
        <div className="search-input">
          <input 
            type="text" 
            placeholder="Rechercher parmi vos services..." 
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isProcessing}
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setFilterStatus('all')}
            disabled={isProcessing}
          >
            Tous
          </button>
          <button 
            className={`btn ${filterStatus === 'active' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setFilterStatus('active')}
            disabled={isProcessing}
          >
            Actifs
          </button>
          <button 
            className={`btn ${filterStatus === 'inactive' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setFilterStatus('inactive')}
            disabled={isProcessing}
          >
            Inactifs
          </button>
        </div>
        
        <Link to="/freelancer/services/new" className="btn btn-success">
          + Nouveau Service
        </Link>
      </div>
      
      {filteredServices.length > 0 ? (
        <div className="services-grid">
          {filteredServices.map(service => (
            <div key={service._id} className={`service-card ${!service.isActive ? 'inactive' : ''}`}>
              <div className="service-image">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Non+Disponible';
                  }}
                />
                <div className={`service-status ${service.isActive ? 'active' : 'inactive'}`}>
                  {service.isActive ? 'Actif' : 'Inactif'}
                </div>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-meta">
                  <div className="service-price">{service.price} €</div>
                  <div className="service-delivery">{service.deliveryTime}</div>
                </div>
                
                <div className="service-category">{service.category}</div>
                
                <div className="service-actions">
                  <Link 
                    to={`/freelancer/services/edit/${service._id}`} 
                    className="btn btn-sm btn-outline-primary"
                  >
                    Modifier
                  </Link>
                  
                  <button 
                    className={`btn btn-sm ${service.isActive ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => handleToggleStatus(service._id)}
                    disabled={isProcessing}
                  >
                    {service.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                  
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => setConfirmDelete(service._id)}
                    disabled={isProcessing}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              
              {confirmDelete === service._id && (
                <div className="delete-confirmation">
                  <div className="delete-message">
                    Êtes-vous sûr de vouloir supprimer ce service ?
                  </div>
                  <div className="delete-actions">
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(service._id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : 'Oui, supprimer'}
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setConfirmDelete(null)}
                      disabled={isProcessing}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-services">
          {searchTerm || filterStatus !== 'all' ? (
            <>
              <p>Aucun service ne correspond à votre recherche.</p>
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
              >
                Réinitialiser les filtres
              </button>
            </>
          ) : (
            <>
              <p>Vous n'avez pas encore de services. Créez un nouveau service pour commencer.</p>
              <Link to="/freelancer/services/new" className="btn btn-primary">
                Créer un nouveau service
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesList;