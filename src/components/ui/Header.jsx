import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

// Configure axios (ideally in a separate file)
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Manage authentication state
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    user: null,
    isLoading: true
  });

  React.useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');

        setAuthState({
          isLoggedIn: !!token,
          // Adjust to use either _id or id depending on your API
          user: userData ? JSON.parse(userData) : null,
          isLoading: false
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        setAuthState({
          isLoggedIn: false,
          user: null,
          isLoading: false
        });
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      setAuthState({
        isLoggedIn: false,
        user: null,
        isLoading: false
      });

      navigate('/login');
    }
  };

  if (authState.isLoading) {
    return <header className="header">Chargement...</header>;
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to={authState.isLoggedIn ? '/dashboard' : '/home'}>
          <img 
            src="/src/assets/icons/logoMC.png" 
            alt="Logo" 
            className="logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/path/to/default/logo.png';
            }}
          />
        </Link>
        
        <nav className="nav-links">
          {authState.isLoggedIn ? (
            <>
              {/* Navigate dynamically to the freelancer dashboard using the user id */}
              <Link 
                to={`/freelancer/${authState.user._id || authState.user.id}/dashboard`}
                className="seller-link"
              >
                Freelancer
              </Link>
              
              <div className="user-menu">
                <Link to="/profile" className="profile-link">
                  <span>Mon compte</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="logout-btn"
                  aria-label="Déconnexion"
                >
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="signin-link">
                Se connecter
              </Link>
              <Link to="/signup" className="join-btn">
                S'inscrire
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
