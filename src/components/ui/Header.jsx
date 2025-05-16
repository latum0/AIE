import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Nettoyer le localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // Rediriger vers la page de login
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to={isLoggedIn ? '/dashboard' : '/home'}>
          <img 
            src="/src/assets/icons/logoMC.png" 
            alt="Logo" 
            className="logo"
          />
        </Link>
        <nav className="nav-links">
          <Link to="/freelancer" className="seller-link">
            Devenir freelancer
          </Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="signin-link">
                Se connecter
              </Link>
              <Link to="/signup" className="join-btn">
                S'inscrire
              </Link>
            </>
          ) : (
            <div className="user-menu">
              <Link to="/profile" className="profile-link">
                <span>Mon compte</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Déconnexion
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;