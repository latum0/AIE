"use client";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, ClipboardList } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // New states for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Debounce and fetch suggestions on search query change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        axios
          .get(`http://localhost:5000/api/gigs/categories/search?query=${encodeURIComponent(searchQuery)}`)
          .then((res) => {
            setSuggestions(res.data);
          })
          .catch((err) => {
            console.error("Error fetching category suggestions:", err);
            setSuggestions([]);
          });
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSuggestionClick = (sugg) => {
    setSearchQuery(sugg);
    setSuggestions([]);
    // Optionally navigate to a search results page if needed
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to={isLoggedIn ? '/Gigspage' : '/home'} className="logo-container">
            <img 
              src="/src/assets/icons/untitled-12.png" 
              alt="Logo" 
              className="logo"
            />
          </Link>
          
          {isLoggedIn && (
            <div className="search-container">
              <div className="search-bar">
                
                <input 
                  type="text"
                  placeholder="Rechercher …" 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {suggestions.map((item, idx) => (
                    <li 
                      key={idx} 
                      className="suggestion-item" 
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        
        <nav className="nav-links">
          <Link to="/Histor" className="nav-link icon-link">
            <ClipboardList size={20} />
          </Link>
          
          <Link 
            to={user ? `/freelancer/${user._id || user.id}/dashboard` : '/freelancer'}
            className="nav-link"
          >
            Freelancer
          </Link>
          
          {!isLoggedIn ? (
            <div className="auth-buttons">
              <Link to="/login" className="signin-link">
                Se connecter
              </Link>
              <Link to="/signup" className="signup-button">
                S'inscrire
              </Link>
            </div>
          ) : (
            <div className="user-menu-container">
              <button onClick={toggleUserMenu} className="user-menu-button">
                <span className="user-initial">{user?.name?.charAt(0) || 'U'}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">
                    Mon compte
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;