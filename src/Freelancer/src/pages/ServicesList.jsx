"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlusCircle, Search, List, Grid, Info, RefreshCw } from 'lucide-react';
import { ServicesContext } from "../context/ServicesContext";
import ServiceCard from './ServiceCard';
import "./ServicesList.css";

const ListeServices = () => {
  const { services, deleteService, loadServices } = useContext(ServicesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // Extract the userId from the URL parameters (assuming the route is /freelancer/:userId/*)
  const { userId } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadServices();
      } catch (err) {
        setError('Échec du chargement des services. Veuillez réessayer.');
        console.error('Erreur lors du chargement des services:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, [loadServices]);
  
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);
    } catch (err) {
      setError('Échec de la suppression du service. Veuillez réessayer.');
      console.error('Erreur lors de la suppression du service:', err);
    }
  };
  
  const filteredServices = services
    ? services.filter(service => {
        if (!service) return false;
        const searchLower = searchTerm.toLowerCase();
        return (
          service.title?.toLowerCase().includes(searchLower) ||
          service.packages?.basic?.description?.toLowerCase().includes(searchLower) ||
          service.packages?.standard?.description?.toLowerCase().includes(searchLower) ||
          service.packages?.premium?.description?.toLowerCase().includes(searchLower)
        );
      })
    : [];
    
  const handleRetry = () => {
    loadServices();
    setError(null);
  };
  
  if (isLoading) {
    return (
      <div className="services-loading">
        <RefreshCw className="loading-icon" />
        <p>Chargement des services...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="services-error">
        <Info size={48} className="error-icon" />
        <h3>Un problème est survenu</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={handleRetry}>
          <RefreshCw size={16} />
          <span>Réessayer</span>
        </button>
      </div>
    );
  }

  return (
    <div className="services-list-container">
      <div className="services-list-header">
        <div className="header-title">
          <h1>Mes Services</h1>
          <p>Gérez et mettez à jour vos offres de services</p>
        </div>
        
        {/* Updated dynamic route using userId */}
        <Link to={`/freelancer/${userId}/services/new`} className="create-service-btn">
          <PlusCircle size={18} />
          <span>Créer un nouveau service</span>
        </Link>
      </div>
      
      <div className="services-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher des services..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="view-options">
          <button 
            className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vue en grille"
          >
            <Grid size={18} />
          </button>
          <button 
            className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Vue en liste"
          >
            <List size={18} />
          </button>
        </div>
      </div>
      
      {filteredServices.length > 0 ? (
        <div className={`services-grid view-${viewMode}`}>
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id || service._id}
              service={service}
              onDelete={handleDeleteService}
            />
          ))}
        </div>
      ) : (
        <div className="empty-services">
          <div className="empty-content">
            <h3>Aucun service trouvé</h3>
            {searchTerm ? (
              <p>Aucun résultat ne correspond à votre recherche. Essayez avec d'autres termes.</p>
            ) : (
              <>
                <p>Vous n'avez pas encore créé de services. Commencez par créer votre premier service.</p>
                <Link to={`/freelancer/${userId}/services/new`} className="create-service-btn">
                  <PlusCircle size={18} />
                  <span>Créer un nouveau service</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeServices;
