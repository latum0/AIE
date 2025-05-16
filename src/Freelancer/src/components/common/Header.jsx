import './Header.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
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

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setPageTitle('Tableau de bord');
        break;
      case '/services':
        setPageTitle('Mes Services');
        break;
      case '/services/new':
        setPageTitle('Créer un Service');
        break;
      case '/orders':
        setPageTitle('Commandes');
        break;
      default:
        if (location.pathname.includes('/services/edit/')) {
          setPageTitle('Modifier le Service');
        } else {
          setPageTitle('FreelanceHub');
        }
    }
  }, [location.pathname]);

  const isMobile = windowWidth <= 768;

  return (
    <header className="header">
      <div className="header-content">
        {isMobile && (
          <button className="menu-toggle" onClick={toggleSidebar}>
            <span className="menu-icon">☰</span>
          </button>
        )}
        <h1 className="header-title">{pageTitle}</h1>
        <div className="header-actions">
          <div className="user-info">
      {/*<span className="user-name">Jean Dupont</span>*/}
            <div className="user-avatar">FR</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;