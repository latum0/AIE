import { createContext, useState, useEffect } from 'react';

// Sample data for services
const sampleServices = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Professional web development services including frontend and backend work.',
    price: 50,
    category: 'Development',
    deliveryTime: '3 days',
    isActive: true,
    createdAt: '2023-09-15T10:00:00Z',
    image: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Logo Design',
    description: 'Creative and professional logo design for your brand or business.',
    price: 35,
    category: 'Design',
    deliveryTime: '2 days',
    isActive: true,
    createdAt: '2023-10-01T14:30:00Z',
    image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: 'Content Writing',
    description: 'SEO-optimized content writing for blogs, websites, and social media.',
    price: 25,
    category: 'Writing',
    deliveryTime: '1 day',
    isActive: false,
    createdAt: '2023-10-05T09:15:00Z',
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState(() => {
    // Try to get services from localStorage
    const savedServices = localStorage.getItem('services');
    return savedServices ? JSON.parse(savedServices) : sampleServices;
  });
  
  // Save services to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);
  
  // Add a new service
  const addService = (service) => {
    const newService = {
      ...service,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      isActive: true
    };
    setServices([...services, newService]);
    return newService;
  };
  
  // Update an existing service
  const updateService = (id, updatedData) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, ...updatedData } : service
    );
    setServices(updatedServices);
  };
  
  // Delete a service
  const deleteService = (id) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
  };
  
  // Toggle service active status
  const toggleServiceStatus = (id) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    );
    setServices(updatedServices);
  };
  
  // Get a service by id
  const getServiceById = (id) => {
    return services.find(service => service.id === Number(id)) || null;
  };
  
  const value = {
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    getServiceById
  };
  
  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};