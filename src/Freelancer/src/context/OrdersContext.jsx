import { createContext, useState, useEffect } from 'react';

// Sample data for orders
const sampleOrders = [
  {
    id: 1,
    serviceId: 1,
    clientName: 'Alice Johnson',
    clientEmail: 'alice@example.com',
    status: 'pending',
    message: 'I need a website for my new business. Can you help?',
    createdAt: '2023-10-10T08:30:00Z'
  },
  {
    id: 2,
    serviceId: 1,
    clientName: 'Bob Smith',
    clientEmail: 'bob@example.com',
    status: 'accepted',
    message: 'Looking for someone to rebuild my outdated website.',
    createdAt: '2023-10-05T14:20:00Z'
  },
  {
    id: 3,
    serviceId: 2,
    clientName: 'Carol Davis',
    clientEmail: 'carol@example.com',
    status: 'completed',
    message: 'Need a logo for my startup. I have a few ideas to discuss.',
    createdAt: '2023-09-28T11:45:00Z'
  }
];

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    // Try to get orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : sampleOrders;
  });
  
  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  
  // Add a new order
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setOrders([...orders, newOrder]);
    return newOrder;
  };
  
  // Update an order status
  const updateOrderStatus = (id, status) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };
  
  // Get orders for a specific service
  const getOrdersByServiceId = (serviceId) => {
    return orders.filter(order => order.serviceId === serviceId);
  };
  
  // Get an order by id
  const getOrderById = (id) => {
    return orders.find(order => order.id === Number(id)) || null;
  };
  
  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrdersByServiceId,
    getOrderById
  };
  
  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};