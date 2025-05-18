// src/Freelancer/src/components/navigation/MobileNavigation.jsx
import { NavLink, useParams } from 'react-router-dom';
import './MobileNavigation.css';

const MobileNavigation = () => {
  const { userId } = useParams();
  return (
    <nav className="mobile-navigation">
      <NavLink 
        to={`/freelancer/${userId}/dashboard`} 
        className={({ isActive }) => 
          isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">📊</span>
        <span className="mobile-nav-text">Tableau</span>
      </NavLink>
      
      <NavLink 
        to={`/freelancer/${userId}/services`} 
        className={({ isActive }) => 
          isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">💼</span>
        <span className="mobile-nav-text">Services</span>
      </NavLink>
      
      <NavLink 
        to={`/freelancer/${userId}/services/new`} 
        className={({ isActive }) => 
          isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">➕</span>
        <span className="mobile-nav-text">Ajouter</span>
      </NavLink>
      
      <NavLink 
        to={`/freelancer/${userId}/orders`} 
        className={({ isActive }) => 
          isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">📋</span>
        <span className="mobile-nav-text">Commandes</span>
      </NavLink>

      {/* New nav link for Conversations */}
      <NavLink 
        to={`/freelancer/${userId}/conversation-manager`} 
        className={({ isActive }) => 
          isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
        }
      >
        <span className="mobile-nav-icon">💬</span>
        <span className="mobile-nav-text">Conversations</span>
      </NavLink>
    </nav>
  );
};

export default MobileNavigation;
