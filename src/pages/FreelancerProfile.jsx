"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaStar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaClock,
  FaHeart,
} from "react-icons/fa";
import Portfolio from "../components/ui/Portfolio";
import Reviews from "../components/ui/Reviews";
import "./FreelancerProfile.css";
import { useNavigate, useParams } from "react-router-dom";

const FreelancerProfile = () => {
  // Retrieve the route parameter and force it to a string
  const { id } = useParams();
  const profileId = id ? (typeof id === "string" ? id : id.toString()) : "";
  console.log("FreelancerProfile - Route param id:", profileId);

  const [activeTab, setActiveTab] = useState("À propos");
  const [profileData, setProfileData] = useState(null);
  const [gigsData, setGigsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const aboutRef = useRef(null);
  const gigsRef = useRef(null);
  const portfolioRef = useRef(null);
  const reviewsRef = useRef(null);

  const navigate = useNavigate();

  // Fetch profile data (public endpoint if profileId is provided)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response;
        if (profileId) {
          response = await fetch(`http://localhost:5000/api/users/${profileId}`);
        } else {
          response = await fetch(`http://localhost:5000/api/users/profile`, {
            credentials: "include",
          });
        }
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        const data = await response.json();
        console.log("FreelancerProfile - Fetched profile data:", data);
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  // Fetch gigs for the freelancer
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const userId =
          profileData?._id
            ? (typeof profileData._id === "string" ? profileData._id : profileData._id.toString())
            : profileId;
        console.log("FreelancerProfile - Fetching gigs for userId:", userId);
        if (!userId) return;
        const response = await fetch(`http://localhost:5000/api/gigs/freelancer/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch gigs data.");
        }
        const gigs = await response.json();
        console.log("FreelancerProfile - Fetched gigs data:", gigs);
        setGigsData(gigs);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching gigs:", err);
      }
    };

    if (profileId || profileData) {
      fetchGigs();
    }
  }, [profileData, profileId]);

  // Scroll to section on tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const headerHeight =
      document.querySelector(".profile-header")?.offsetHeight || 0;
    const navHeight =
      document.querySelector(".profile-nav")?.offsetHeight || 0;
    const totalOffset = headerHeight + navHeight;

    const refMap = {
      "À propos": aboutRef,
      Services: gigsRef,
      Portfolio: portfolioRef,
      Avis: reviewsRef,
    };

    const ref = refMap[tab];
    if (ref && ref.current) {
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - totalOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Navigate to conversation page
  const handleContact = () => {
    navigate("/conversation");
  };

  // Update active tab based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight =
        document.querySelector(".profile-header")?.offsetHeight || 0;
      const navHeight =
        document.querySelector(".profile-nav")?.offsetHeight || 0;
      const totalOffset = headerHeight + navHeight;

      const positions = {
        "À propos": aboutRef.current?.offsetTop - totalOffset - 20 || 0,
        Services: gigsRef.current?.offsetTop - totalOffset - 20 || 0,
        Portfolio: portfolioRef.current?.offsetTop - totalOffset - 20 || 0,
        Avis: reviewsRef.current?.offsetTop - totalOffset - 20 || 0,
      };

      const sortedPositions = Object.entries(positions).sort(
        ([, a], [, b]) => b - a
      );
      const active = sortedPositions.find(
        ([, pos]) => scrollPosition >= pos
      )?.[0];
      if (active) setActiveTab(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="freelancer-profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-container">
          <div className="profile-info">
            <div className="profile-avatar-container">
              <img
                src={profileData?.avatar || "/placeholder.svg?height=80&width=80"}
                alt="Profil"
                className="profile-avatar"
              />
              <div className={`status-indicator ${profileData?.isOnline ? "online" : "offline"}`}></div>
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{profileData?.name || "No Data"}</h1>
              <div className="profile-username">{profileData?.username || ""}</div>
              <div className="profile-rating">
                <FaStar className="star-icon" />{" "}
                {profileData?.rating?.toFixed(1) || "N/A"}
                <span className="reviews-count">({profileData?.reviews || 0} avis)</span>
              </div>
              <div className="profile-meta">
                <span className="profile-level">{profileData?.level || ""}</span>
                <span className="profile-location">
                  <FaMapMarkerAlt /> {profileData?.location || "No Data"}
                </span>
                <span className="profile-language">
                  <FaGlobe /> {profileData?.language || "No Data"}
                </span>
              </div>
              <p className="profile-status">
                <FaClock /> {profileData?.localTime || "No Data"}
              </p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="contact-btn" onClick={handleContact}>
              <FaEnvelope className="message-icon" /> Me contacter
            </button>
            <p className="response-time">
              Temps de réponse moyen : {profileData?.responseTime || "No Data"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="profile-nav">
        <ul>
          {["À propos", "Services", "Portfolio", "Avis"].map((item) => (
            <li
              key={item}
              className={item === activeTab ? "active" : ""}
              onClick={() => handleTabChange(item)}
            >
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Sections */}
      <div className="profile-content">
        {/* About Section */}
        <section id="about-me" ref={aboutRef} className="profile-section">
          <div className="about-section">
            <h2 className="section-title">À propos de moi</h2>
            <p className="about-text">
              {profileData?.about ||
                "Aucune description disponible pour le moment."}
            </p>
            <div className="skills-section">
              <h3 className="skills-title">Compétences</h3>
              <div className="skills-tags">
                {profileData?.skills && profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="no-data">
                    Aucune compétence trouvée.
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={gigsRef} className="profile-section">
          <div className="gigs-section">
            <h2 className="section-title">Mes Services</h2>
            <div className="gigs-container">
              {gigsData.length > 0 ? (
                gigsData.map((gig) => (
                  <div
                    key={gig._id}
                    className="gig-card"
                    onClick={() => navigate(`/gig/${gig._id}`)}
                  >
                    <div className="gig-image-container">
                      <img
                        src={gig.image || "/placeholder.svg"}
                        alt="Service"
                        className="gig-image"
                      />
                      <button className="favorite-gig-btn">
                        <FaHeart />
                      </button>
                    </div>
                    <p className="gig-title">{gig.title}</p>
                    <div className="gig-meta">
                      <span className="gig-price">
                        À partir de {gig.price}
                      </span>
                      <div className="gig-rating">
                        <FaStar className="star-icon" />
                        <span className="gig-rating-value">
                          {gig.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Aucun service trouvé.</p>
              )}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" ref={portfolioRef} className="profile-section">
          <Portfolio hideHeader={true} />
        </section>

        {/* Reviews Section */}
        <section id="reviews" ref={reviewsRef} className="profile-section">
          <Reviews hideHeader={true} />
        </section>
      </div>
    </div>
  );
};

export default FreelancerProfile;
