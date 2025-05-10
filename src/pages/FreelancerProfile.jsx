// src/pages/FreelancerProfile.jsx
import React, { useState, useRef, useEffect } from 'react';
import Portfolio from '../components/ui/Portfolio';
import Reviews from '../components/ui/Reviews';
import './FreelancerProfile.css';

const FreelancerProfile = () => {
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState('À propos');
  
  // Références des sections
  const aboutRef = useRef(null);
  const gigsRef = useRef(null);
  const portfolioRef = useRef(null);
  const reviewsRef = useRef(null);

  // Données du profil
  const profileData = {
    id: '123456',
    name: "Atif Ul Maruf",
    username: "@sync_lab",
    rating: 5.0,
    reviews: 59,
    level: "Niveau 1",
    location: "Bangladesh",
    language: "Anglais",
    isOnline: false,
    localTime: "01:47 AM heure locale",
    responseTime: "1 heure"
  };

  // Données des services
  const gigsData = [
    {
      id: 1,
      title: "Je développe des applications web avec React, Node.js et Laravel...",
      image: "https://img.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-testing-it-profession-isolated-flat-vector-illustration_613284-2357.jpg",
      price: "1000 DA",
      rating: 5.0
    },
    {
      id: 2,
      title: "Je crée des applications React responsives avec un design UI/UX moderne...",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/395930787/original/fd3da16276a04c227fb9bece138ee67dd7a31e64.jpg",
      price: "1500 DA",
      rating: 4.9
    },
    {
      id: 3,
      title: "Je développe des thèmes et plugins WordPress personnalisés...",
      image: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/69333646/original/3ced07061cd66a336f96d00c0cd83419fda5cee8.jpg",
      price: "1000 DA",
      rating: 4.8
    }
  ];

  // Fonction pour changer d'onglet et défiler vers la section
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let ref;

    switch(tab) {
      case 'À propos':
        ref = aboutRef;
        break;
      case 'Services':
        ref = gigsRef;
        break;
      case 'Portfolio':
        ref = portfolioRef;
        break;
      case 'Avis':
        ref = reviewsRef;
        break;
      default:
        ref = aboutRef;
    }

    if (ref && ref.current) {
      const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Met à jour l'onglet actif en fonction du défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;

      const aboutPosition = aboutRef.current?.offsetTop - headerHeight - 20 || 0;
      const gigsPosition = gigsRef.current?.offsetTop - headerHeight - 20 || 0;
      const portfolioPosition = portfolioRef.current?.offsetTop - headerHeight - 20 || 0;
      const reviewsPosition = reviewsRef.current?.offsetTop - headerHeight - 20 || 0;

      if (scrollPosition >= reviewsPosition) setActiveTab('Avis');
      else if (scrollPosition >= portfolioPosition) setActiveTab('Portfolio');
      else if (scrollPosition >= gigsPosition) setActiveTab('Services');
      else if (scrollPosition >= aboutPosition) setActiveTab('À propos');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Composant Navigation personnalisé
  const CustomNavigation = () => {
    const navItems = ["À propos", "Services", "Portfolio", "Avis"];
    
    return (
      <nav className="profile-nav">
        <ul>
          {navItems.map((item, index) => (
            <li 
              key={index} 
              className={item === activeTab ? 'active' : ''}
              onClick={() => handleTabChange(item)}
            >
              <a href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={(e) => e.preventDefault()}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div className="freelancer-profile-page">
      {/* En-tête fixe */}
      <div className="sticky-header">
        <div className="profile-header-container">
          <div className="profile-info">
            <div className="profile-avatar-container">
              <img src="/placeholder.svg?height=80&width=80" alt="Profil" className="profile-avatar" />
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{profileData.name}</h1>
              <div className="profile-rating">
                <span className="star-icon">★</span> {profileData.rating} ({profileData.reviews})
              </div>
              <p className="profile-status">{profileData.isOnline ? 'En ligne' : 'Hors ligne'} • {profileData.localTime}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="contact-btn">
              <span className="message-icon">✉</span> Me contacter
            </button>
            <p className="response-time">Temps de réponse moyen : {profileData.responseTime}</p>
          </div>
        </div>
        <CustomNavigation />
      </div>

      {/* Contenu des sections */}
      <div className="profile-content">
        {/* Section À propos */}
        <section id="about-me" ref={aboutRef} className="profile-section">
          <div className="about-section">
            <h2 className="section-title">À propos de moi</h2>
            <p className="about-text">
              Je suis un développeur web full-stack passionné par la création de sites et d'applications qui fonctionnent parfaitement. 
              J'utilise des outils comme React, Node.js et Laravel pour construire à la fois le front-end et le back-end de votre site.
              <span className="read-more">Lire plus</span>
            </p>
            <div className="skills-section">
              <h3 className="skills-title">Compétences</h3>
              <div className="skills-tags">
                <span className="skill-tag">Développement web</span>
                <span className="skill-tag">Design responsive</span>
                <span className="skill-tag">Création de landing page</span>
                <span className="skill-tag">Rédaction web</span>
                <span className="skill-tag">Développement de landing page</span>
                <span className="more-skills">+10</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" ref={gigsRef} className="profile-section">
          <div className="gigs-section">
            <h2 className="section-title">Mes Services</h2>
            <div className="gigs-container">
              {gigsData.map(gig => (
                <div key={gig.id} className="gig-card">
                  <div className="gig-image-container">
                    <img src={gig.image} alt="Service" className="gig-image" />
                    <button className="favorite-gig-btn">♡</button>
                  </div>
                  <p className="gig-title">{gig.title}</p>
                  <div className="gig-meta">
                    <span className="gig-price">À partir de {gig.price}</span>
                    <div className="gig-rating">
                      <span className="star-icon">★</span>
                      <span className="gig-rating-value">{gig.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Portfolio */}
        <section id="portfolio" ref={portfolioRef} className="profile-section">
          <Portfolio hideHeader={true} />
        </section>

        {/* Section Avis */}
        <section id="reviews" ref={reviewsRef} className="profile-section">
          <Reviews hideHeader={true} />
        </section>
      </div>
    </div>
  );
};

export default FreelancerProfile;