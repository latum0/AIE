import React from 'react';
<<<<<<< HEAD
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
=======

import Hero from '../components/ui/Hero';
import Features from '../components/ui/Features';
import Freelancers from '../components/ui/Freelancers';
import Latest from '../components/ui/Latest';
import Category from '../components/ui/Category';
import Portfolios from '../components/ui/Portfolios';

import FadeIn from '../components/ui/FadeIn';
import './Home.css';

function Home() {
  return (
    <div className="Home-container">
      
      
      <FadeIn>
        <Hero />
      </FadeIn>

      <FadeIn>
        <Features />
      </FadeIn>

      <FadeIn>
        <Freelancers />
      </FadeIn>

      <FadeIn>
        <Latest />
      </FadeIn>

      <FadeIn>
        <Category />
      </FadeIn>

      <FadeIn>
        <Portfolios />
      </FadeIn>

      
    </div>
  );
}
>>>>>>> 26b7e18aa3b0c75a98195607cc7e2c92aa347687

export default Home;