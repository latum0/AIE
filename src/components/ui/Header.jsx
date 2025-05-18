import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import { ClipboardList } from "lucide-react";
const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = async () => {
    try {
      // If your backend provides a logout endpoint, call it:
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Clear authentication data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // Redirect to login page
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-content">

        
        <Link to={isLoggedIn ? '/Gigspage' : '/home'}>
          <img 
            src="/src/assets/icons/untitled-12.png" 
            alt="Logo" 
            className="logo"
          />
        </Link>
        <nav className="nav-links">
          <Link to="/Histor" className="seller-link">
        <ClipboardList />
      </Link>
          <Link 
            to={user ? `/freelancer/${user._id || user.id}/dashboard` : '/freelancer'}
            className="seller-link"
          >
            Freelancer
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