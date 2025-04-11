import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenue chez SKILL MARKET</h1>
            <nav className="home-nav">
                {/* Correction : suppression de l'espace et utilisation de kebab-case */}
                <Link to="/account-settings" className="nav-btn">À propos</Link>
            </nav>
        </div>
    );
};

export default Home;