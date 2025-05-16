"use client";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./Gigspage.css";
import { FaSearch, FaBell, FaEnvelope, FaHeart, FaStar } from "react-icons/fa";

function Gigspage() {
  const [categorizedGigs, setCategorizedGigs] = useState({});
  const [likedGigs, setLikedGigs] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gigs");
        if (!response.ok) throw new Error("Échec de récupération des gigs");
        
        const gigsData = await response.json();

        const usersMap = {};
        await Promise.all(
          gigsData.map(async (gig) => {
            if (!usersMap[gig.userId]) {
              try {
                const userResponse = await fetch(`http://localhost:5000/api/users/${gig.userId}`);
                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  usersMap[gig.userId] = userData.name;
                }
              } catch (err) {
                console.error(`Erreur en récupérant l'utilisateur ${gig.userId}`, err);
              }
            }
          })
        );

        setUsers(usersMap);

        const categorized = gigsData.reduce((acc, gig) => {
          const category = gig.categorie || "Autres";
          if (!acc[category]) acc[category] = [];
          acc[category].push(gig);
          return acc;
        }, {});

        setCategorizedGigs(categorized);
      } catch (error) {
        console.error("Erreur lors de la récupération des gigs :", error);
      }
    };

    fetchGigs();
  }, []);

  const handleLike = (gigId, e) => {
    e.preventDefault();
    setLikedGigs((prevLikedGigs) => ({
      ...prevLikedGigs,
      [gigId]: !prevLikedGigs[gigId],
    }));
  };

  const renderGigCard = (gig) => {
    const isLiked = !!likedGigs[gig._id];
    const sellerName = users[gig.userId] || "Utilisateur inconnu";

    return (
      <Link 
        to={`/gig/${gig._id}`} 
        className="gigs-service-card-link"
        key={gig._id}
      >
        <div className="gigs-service-card">
          <div className="gigs-service-image">
            <img
              src={gig.images?.[0] || "/default-image.jpg"}
              alt={gig.title}
              className="gigs-service-img"
            />
          </div>
          <div className="gigs-service-info">
            <div className="gigs-seller-info">
              <div className="gigs-seller-avatar">
                {sellerName.charAt(0).toUpperCase()}
              </div>
              <div className="gigs-seller-details">
                <div className="gigs-seller-name">{sellerName}</div>
              </div>
            </div>
            <div className="gigs-service-title">{gig.title}</div>
            <div className="gigs-service-rating">
              <FaStar className="gigs-star-icon" />
              <span className="gigs-rating-value">
                {gig.rating || "N/A"}
              </span>
            </div>
            <div className="gigs-service-footer">
              <div className="gigs-service-actions">
                <button
                  className={`gigs-action-button heart ${isLiked ? "liked" : ""}`}
                  onClick={(e) => handleLike(gig._id, e)}
                >
                  <FaHeart />
                </button>
              </div>
              <div className="gigs-service-price">
                <span className="gigs-starting-at">Prix:</span>
                <span className="gigs-price">
                  {gig.packages?.basic?.price?.toFixed(2) || "N/A"} DA
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const categoryTitles = {
    design: "Design & Créativité",
    development: "Développement & Programmation",
    marketing: "Marketing Digital",
    writing: "Rédaction & Traduction",
    video: "Vidéo & Animation",
    Autres: "Autres Services",
  };

  return (
    <div className="gigs-skill-market">
      <main className="gigs-main-content">
        {Object.keys(categorizedGigs).map(
          (category) =>
            categorizedGigs[category].length > 0 && (
              <section className="gigs-section" key={category}>
                <div className="gigs-section-header">
                  <h2 className="gigs-section-title">
                    {categoryTitles[category] || category}
                  </h2>
                </div>
                <div className="gigs-services-container">
                  <div className="gigs-services-scroll">
                    {categorizedGigs[category].map((gig) => renderGigCard(gig))}
                  </div>
                </div>
              </section>
            )
        )}
      </main>
    </div>
  );
}

export default Gigspage;