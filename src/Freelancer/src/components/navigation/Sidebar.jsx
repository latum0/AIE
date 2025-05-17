import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  const sidebarClass = isMobile 
    ? `sidebar ${isOpen ? 'open' : 'closed'}` 
    : 'sidebar desktop';

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}
      <aside className={sidebarClass}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo"><i>SKILL MARKET</i></h2>
          {isMobile && (
            <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Tableau de bord</span>
          </NavLink>
          
          <NavLink 
            to="/freelancer/services" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">💼</span>
            <span className="nav-text">Services</span>
          </NavLink>
          
          <NavLink 
            to="/freelancer/orders" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">Commandes</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="btn btn-accent btn-block"
            onClick={() => {
              navigate('/freelancer/services/new');
              if (isMobile) toggleSidebar();
            }}
          >
            + Nouveau Service
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;