import React, { createContext, useState, useCallback } from 'react';

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([
   
   
  ]);

  // Load services
  const loadServices = useCallback(async () => {
    // In a real app, this would be an API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(services);
      }, 500);
    });
  }, [services]);

  // Get service by ID
  const getServiceById = useCallback((id) => {
    return services.find(service => service.id === id || service._id === id);
  }, [services]);

  // Add a service
  const addService = useCallback((serviceData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newService = {
          ...serviceData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setServices(prev => [...prev, newService]);
        resolve(newService);
      }, 500);
    });
  }, []);

  // Update a service
  const updateService = useCallback((id, serviceData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setServices(prev => 
          prev.map(service => 
            (service.id === id || service._id === id)
              ? { ...serviceData, id: service.id || service._id }
              : service
          )
        );
        resolve({ ...serviceData, id });
      }, 500);
    });
  }, []);

  // Delete a service
  const deleteService = useCallback((id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setServices(prev => 
          prev.filter(service => service.id !== id && service._id !== id)
        );
        resolve({ success: true });
      }, 500);
    });
  }, []);

  const contextValue = {
    services,
    loadServices,
    getServiceById,
    addService,
    updateService,
    deleteService
  };

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
};