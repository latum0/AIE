import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ServicesContext } from '../context/ServicesContext';
import { OrdersContext } from '../context/OrdersContext';
import './Dashboard.css';

const Dashboard = () => {
  const { services } = useContext(ServicesContext);
  const { orders } = useContext(OrdersContext);
  
  // Compter les services actifs
  const activeServices = services.filter(service => service.isActive).length;
  
  // Compter les commandes par statut
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const acceptedOrders = orders.filter(order => order.status === 'accepted').length;
  const inProgressOrders = orders.filter(order => order.status === 'in-progress').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  
  // Obtenir les dernières commandes (les 5 dernières)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{services.length}</div>
          <div className="stat-label">Services Totals</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{activeServices}</div>
          <div className="stat-label">Services Actifs</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Commandes Totales</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{pendingOrders}</div>
          <div className="stat-label">Commandes En Attente</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="card dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Statut des Commandes</h3>
          </div>
          <div className="status-chart">
            <div className="status-item">
              <div className="status-label">En Attente</div>
              <div className="status-bar">
                <div 
                  className="status-progress pending" 
                  style={{ width: `${(pendingOrders / orders.length) * 100}%` }}
                ></div>
              </div>
              <div className="status-count">{pendingOrders}</div>
            </div>
            
            <div className="status-item">
              <div className="status-label">Acceptée</div>
              <div className="status-bar">
                <div 
                  className="status-progress accepted" 
                  style={{ width: `${(acceptedOrders / orders.length) * 100}%` }}
                ></div>
              </div>
              <div className="status-count">{acceptedOrders}</div>
            </div>
            
            <div className="status-item">
              <div className="status-label">En Cours</div>
              <div className="status-bar">
                <div 
                  className="status-progress in-progress" 
                  style={{ width: `${(inProgressOrders / orders.length) * 100}%` }}
                ></div>
              </div>
              <div className="status-count">{inProgressOrders}</div>
            </div>
            
            <div className="status-item">
              <div className="status-label">Complétée</div>
              <div className="status-bar">
                <div 
                  className="status-progress completed" 
                  style={{ width: `${(completedOrders / orders.length) * 100}%` }}
                ></div>
              </div>
              <div className="status-count">{completedOrders}</div>
            </div>
          </div>
        </div>
        
        <div className="card dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Dernières Demandes de Commandes</h3>
            <Link to="/orders" className="btn btn-sm btn-outline">Voir Tout</Link>
          </div>
          
          {recentOrders.length > 0 ? (
            <div className="recent-orders">
              {recentOrders.map(order => {
                const service = services.find(s => s.id === order.serviceId);
                return (
                  <div key={order.id} className="recent-order-item">
                    <div className="order-info">
                      <div className="client-name">{order.clientName}</div>
                      <div className="service-name">{service ? service.title : 'Service Inconnu'}</div>
                    </div>
                    <div className="order-meta">
                      <div className={`badge badge-${getBadgeClass(order.status)}`}>
                        {order.status}
                      </div>
                      <div className="order-date">
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-state">Aucune commande récente</p>
          )}
        </div>
      </div>
      
      <div className="quick-actions">
        <Link to="/freelancer/services/new" className="btn btn-primary">
          Créer un Nouveau Service
        </Link>
        <Link to="/freelancer/services" className="btn btn-outline">
          Gérer les Services
        </Link>
        <Link to="/freelancer/orders" className="btn btn-outline">
          Voir Toutes les Commandes
        </Link>
      </div>
    </div>
  );
};

// Fonction d'aide pour obtenir la classe du badge en fonction du statut
const getBadgeClass = (status) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'accepted': return 'info';
    case 'in-progress': return 'info';
    case 'completed': return 'success';
    case 'canceled': return 'error';
    default: return 'info';
  }
};

// Fonction d'aide pour formater la date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export default Dashboard;
