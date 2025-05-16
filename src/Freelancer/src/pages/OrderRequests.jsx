import { useContext, useState } from 'react';
import { OrdersContext } from '../context/OrdersContext';
import { ServicesContext } from '../context/ServicesContext';
import './OrderRequests.css';

const OrderRequests = () => {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
  const { services } = useContext(ServicesContext);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Filtrer les commandes selon le statut
  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );
  
  // Obtenir le titre du service par son id
  const getServiceTitle = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.title : 'Service Inconnu';
  };
  
  // Gérer la mise à jour du statut de la commande
  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    // Si on est en train de visualiser les détails d'une commande, mettre à jour l'état de la commande sélectionnée
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
  };
  
  // Voir les détails de la commande
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  
  // Fermer le modal de détails de la commande
  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };
  
  // Obtenir la classe de badge en fonction du statut
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'info';
      case 'in-progress': return 'info';
      case 'completed': return 'success';
      case 'canceled': return 'error';
      default: return 'info';
    }
  };
  
  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="orders-page">
      <div className="filters-row">
        <div className="status-filters">
          <button 
            className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('all')}
          >
            Tout
          </button>
          <button 
            className={`btn ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('pending')}
          >
            En Attente
          </button>
          <button 
            className={`btn ${filterStatus === 'accepted' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('accepted')}
          >
            Accepté
          </button>
          <button 
            className={`btn ${filterStatus === 'in-progress' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('in-progress')}
          >
            En Cours
          </button>
          <button 
            className={`btn ${filterStatus === 'completed' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('completed')}
          >
            Complété
          </button>
          <button 
            className={`btn ${filterStatus === 'canceled' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterStatus('canceled')}
          >
            Annulé
          </button>
        </div>
      </div>
      
      {filteredOrders.length > 0 ? (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className={`order-row ${order.status}`}>
                  <td className="client-cell">
                    <div className="client-name">{order.clientName}</div>
                    <div className="client-email">{order.clientEmail}</div>
                  </td>
                  <td>{getServiceTitle(order.serviceId)}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <span className={`badge badge-${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="order-actions">
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => viewOrderDetails(order)}
                      >
                        Voir
                      </button>
                      
                      {order.status === 'pending' && (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => handleStatusUpdate(order.id, 'accepted')}
                        >
                          Accepter
                        </button>
                      )}
                      
                      {order.status === 'accepted' && (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => handleStatusUpdate(order.id, 'in-progress')}
                        >
                          Commencer
                        </button>
                      )}
                      
                      {order.status === 'in-progress' && (
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                        >
                          Compléter
                        </button>
                      )}
                      
                      {(order.status === 'pending' || order.status === 'accepted') && (
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleStatusUpdate(order.id, 'canceled')}
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-orders">
          <p>Aucune commande trouvée avec le filtre sélectionné.</p>
        </div>
      )}
      
      {/* Modal Détails Commande */}
      {selectedOrder && (
        <div className="order-modal-backdrop" onClick={closeOrderDetails}>
          <div className="order-modal-content" onClick={e => e.stopPropagation()}>
            <div className="order-modal-header">
              <h3>Détails de la commande</h3>
              <button className="close-modal" onClick={closeOrderDetails}>×</button>
            </div>
            
            <div className="order-modal-body">
              <div className="order-detail-row">
                <div className="order-detail-label">Service:</div>
                <div className="order-detail-value">{getServiceTitle(selectedOrder.serviceId)}</div>
              </div>
              
              <div className="order-detail-row">
                <div className="order-detail-label">Client:</div>
                <div className="order-detail-value">{selectedOrder.clientName}</div>
              </div>
              
              <div className="order-detail-row">
                <div className="order-detail-label">Email:</div>
                <div className="order-detail-value">{selectedOrder.clientEmail}</div>
              </div>
              
              <div className="order-detail-row">
                <div className="order-detail-label">Date:</div>
                <div className="order-detail-value">{formatDate(selectedOrder.createdAt)}</div>
              </div>
              
              <div className="order-detail-row">
                <div className="order-detail-label">Statut:</div>
                <div className="order-detail-value">
                  <span className={`badge badge-${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div className="order-message">
                <div className="order-detail-label">Message:</div>
                <div className="message-content">
                  {selectedOrder.message}
                </div>
              </div>
            </div>
            
            <div className="order-modal-footer">
              {selectedOrder.status === 'pending' && (
                <>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'accepted')}
                  >
                    Accepter la demande
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleStatusUpdate(selectedOrder.id, 'canceled')}
                  >
                    Refuser
                  </button>
                </>
              )}
              
              {selectedOrder.status === 'accepted' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'in-progress')}
                >
                  Commencer le travail
                </button>
              )}
              
              {selectedOrder.status === 'in-progress' && (
                <button 
                  className="btn btn-success"
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'completed')}
                >
                  Marquer comme complété
                </button>
              )}
              
              <button 
                className="btn btn-outline"
                onClick={closeOrderDetails}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderRequests;
