import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration de l'API
  const API_URL = 'http://localhost:5000/api/gigs';

  // Récupérer les services du freelance connecté
  const fetchFreelancerServices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // Utilisez l'endpoint qui récupère les gigs par utilisateur
      const response = await axios.get(`${API_URL}/freelancer/my-gigs`, config);
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancerServices();
  }, []);

  // Ajouter un nouveau service
  const addService = async (service) => {
    try {
      const token = localStorage.getItem('token');
      const config = { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Important pour les fichiers
        } 
      };

      // Créer FormData pour gérer l'image
      const formData = new FormData();
      formData.append('title', service.title);
      formData.append('description', service.description);
      formData.append('price', service.price);
      formData.append('category', service.category);
      formData.append('deliveryTime', service.deliveryTime);
      if (service.imageFile) {
        formData.append('image', service.imageFile);
      }

      const response = await axios.post(API_URL, formData, config);
      setServices(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  // Mettre à jour un service
  const updateService = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const config = { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        } 
      };

      const formData = new FormData();
      formData.append('title', updatedData.title);
      formData.append('description', updatedData.description);
      formData.append('price', updatedData.price);
      formData.append('category', updatedData.category);
      formData.append('deliveryTime', updatedData.deliveryTime);
      if (updatedData.imageFile) {
        formData.append('image', updatedData.imageFile);
      }

      const response = await axios.put(`${API_URL}/${id}`, formData, config);
      setServices(prev => 
        prev.map(service => 
          service._id === id ? response.data : service
        )
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  // Supprimer un service
  const deleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.delete(`${API_URL}/${id}`, config);
      setServices(prev => prev.filter(service => service._id !== id));
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  // Activer/Désactiver un service
  const toggleServiceStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const service = services.find(s => s._id === id);
      const response = await axios.patch(
        `${API_URL}/${id}/status`, 
        { isActive: !service.isActive },
        config
      );
      
      setServices(prev => 
        prev.map(service => 
          service._id === id ? response.data : service
        )
      );
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  // Récupérer un service par ID
  const getServiceById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.get(`${API_URL}/${id}`, config);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  const value = {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    getServiceById,
    refetchServices: fetchFreelancerServices
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};