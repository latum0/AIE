// src/pages/FreelancerProfile.jsx
import React, { useState, useRef, useEffect } from 'react';
import ProfileHeader from '../components/ui/ProfileHeader';
import Portfolio from '../components/ui/Portfolio';
import Reviews from '../components/ui/Reviews';
import './FreelancerProfile.css';

const FreelancerProfile = () => {
  const [activeTab, setActiveTab] = useState('About Me');

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const reviewsRef = useRef(null);

  const profileData = {
    name: "Atif Ul Maruf",
    username: "@sync_lab",
    rating: 5.0,
    reviews: 59,
    level: "Level 1",
    location: "Bangladesh",
    language: "English",
    isOnline: false,
    localTime: "01:47 AM local time",
    responseTime: "1 hour"
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    let ref;
    switch (tab) {
      case 'About Me':
        ref = aboutRef;
        break;
      case 'Services':
        ref = servicesRef;
        break;
      case 'Portfolio':
        ref = portfolioRef;
        break;
      case 'Reviews':
        ref = reviewsRef;
        break;
      default:
        ref = aboutRef;
    }

    if (ref?.current) {
      const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll listener for active tab updates
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;

      const aboutPos = aboutRef.current?.offsetTop - headerHeight - 20 || 0;
      const servicesPos = servicesRef.current?.offsetTop - headerHeight - 20 || 0;
      const portfolioPos = portfolioRef.current?.offsetTop - headerHeight - 20 || 0;
      const reviewsPos = reviewsRef.current?.offsetTop - headerHeight - 20 || 0;

      if (scrollPosition >= reviewsPos) setActiveTab('Reviews');
      else if (scrollPosition >= portfolioPos) setActiveTab('Portfolio');
      else if (scrollPosition >= servicesPos) setActiveTab('Services');
      else if (scrollPosition >= aboutPos) setActiveTab('About Me');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'About Me':
        return <ProfileHeader hideHeader={true} />;

      case 'Portfolio':
        return <Portfolio hideHeader={true} />;

      case 'Reviews':
        return <Reviews hideHeader={true} />;

      case 'Services':
        return (
        <section id="services" ref={servicesRef} className="profile-section">
          <div className="gigs-section">
            <h2 className="section-title">My Gigs</h2>
            <div className="gig-card">
              <div className="gig-image-container">
                <img
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/398133772/original/fa777f03c7d5cdbfe04f6b52e6f8765146e118d8-build-wix-website-design-or-redesign-business-wix-website-wix-studio-website.png"
                  alt="Gig"
                  className="gig-image"
                />
                <button className="favorite-gig-btn">♡</button>
              </div>
              <p className="gig-title">I will do AI website development as full stack developer using React, PHP, Laravel...</p>
            </div>
          </div>
        </section>
      );

      default:
        return <ProfileHeader hideHeader={true} />;
    }
  };

  const CustomNavigation = () => {
    const navItems = ["About Me", "Services", "Portfolio", "Reviews"];
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
      <div className="sticky-header">
        <div className="profile-header-container">
          <div className="profile-info">
            <div className="profile-avatar-container">
              <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="profile-avatar" />
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{profileData.name}</h1>
              <div className="profile-rating">
                <span className="star-icon">★</span> {profileData.rating} ({profileData.reviews})
              </div>
              <p className="profile-status">{profileData.isOnline ? 'Online' : 'Offline'} • {profileData.localTime}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="contact-btn">
              <span className="message-icon">✉</span> Contact me
            </button>
            <p className="response-time">Average response time: {profileData.responseTime}</p>
          </div>
        </div>
        <CustomNavigation />
      </div>

      <div className="profile-content">
        <section id="about-me" ref={aboutRef} className="profile-section">
          <ProfileHeader hideHeader={true} />
        </section>

        {renderContent()}

        <section id="portfolio" ref={portfolioRef} className="profile-section">
          <Portfolio hideHeader={true} />
        </section>

        <section id="reviews" ref={reviewsRef} className="profile-section">
          <Reviews hideHeader={true} />
        </section>
      </div>
    </div>
  );
};

export default FreelancerProfile;