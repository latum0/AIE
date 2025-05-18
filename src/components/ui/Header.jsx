"use client";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // New states for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Debounce and fetch suggestions on search query change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== '') {
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
        {isLoggedIn && (
          <div className="search-bar">
            <input 
              type="text"
              placeholder="Rechercher …" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={24} className="search-icon" />
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
        <nav className="nav-links">
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
