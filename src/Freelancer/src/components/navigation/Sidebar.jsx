// src/Freelancer/src/components/navigation/Sidebar.jsx
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
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
          <button onClick={()=>{navigate('/GigsPage')}}> <h2 className="sidebar-logo"><i>SKILL MARKET</i></h2>  </button> 
          {isMobile && (
            <button className="close-sidebar" onClick={toggleSidebar}>×</button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to={`/freelancer/${userId}/dashboard`} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Tableau de bord</span>
          </NavLink>
          
          <NavLink 
            to={`/freelancer/${userId}/services`} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">💼</span>
            <span className="nav-text">Services</span>
          </NavLink>
          
          <NavLink 
            to={`/freelancer/${userId}/orders`} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">Commandes</span>
          </NavLink>
          <NavLink 
            to={`/freelancer/${userId}/Showcase`} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">📋</span>
            <span className="nav-text">invoices</span>
          </NavLink>
          <NavLink 
            to={`/freelancer/${userId}/conversation-manager`} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="nav-icon">💬</span>
            <span className="nav-text">Conversations</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="btn btn-accent btn-block"
            onClick={() => {
              navigate(`/freelancer/${userId}/services/new`);
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
