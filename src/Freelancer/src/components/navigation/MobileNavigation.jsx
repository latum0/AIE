import { NavLink } from 'react-router-dom';
import './MobileNavigation.css';

const MobileNavigation = () => {
  return (
    <nav className="mobile-navigation">
      <NavLink to="/" className={({ isActive }) => 
        isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
      }>
        <span className="mobile-nav-icon">📊</span>
        <span className="mobile-nav-text">Tableau</span>
      </NavLink>
      
      <NavLink to="/freelancer/services" className={({ isActive }) => 
        isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
      }>
        <span className="mobile-nav-icon">💼</span>
        <span className="mobile-nav-text">Services</span>
      </NavLink>
      
      <NavLink to="/freelancer/services/new" className={({ isActive }) => 
        isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
      }>
        <span className="mobile-nav-icon">➕</span>
        <span className="mobile-nav-text">Ajouter</span>
      </NavLink>
      
      <NavLink to="/freelancer/orders" className={({ isActive }) => 
        isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
      }>
        <span className="mobile-nav-icon">📋</span>
        <span className="mobile-nav-text">Commandes</span>
      </NavLink>
    </nav>
  );
};

export default MobileNavigation;