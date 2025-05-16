"use client";

import { useState, useEffect } from "react";
import "./Test.css";
import { FaSearch, FaBell, FaEnvelope, FaHeart, FaStar } from "react-icons/fa";

function Test() {
  const [categorizedGigs, setCategorizedGigs] = useState({});
  const [likedGigs, setLikedGigs] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gigs");
        if (!response.ok) throw new Error("Échec de récupération des gigs");
        
        const gigsData = await response.json();

        // 🔹 Récupérer les informations des vendeurs liés aux gigs
        const usersMap = {};
        await Promise.all(
          gigsData.map(async (gig) => {
            if (!usersMap[gig.userId]) {
              try {
                const userResponse = await fetch(`http://localhost:5000/api/users/${gig.userId}`);
                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  usersMap[gig.userId] = userData.name; // Stocke le nom réel de l'utilisateur
                }
              } catch (err) {
                console.error(`Erreur en récupérant l'utilisateur ${gig.userId}`, err);
              }
            }
          })
        );

        setUsers(usersMap);

        // 🔹 Organiser les gigs par catégorie
        const categorized = gigsData.reduce((acc, gig) => {
          const category = gig.categorie || "Autres"; // Utilisation du champ 'categorie' ajouté dans le modèle
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
      <div className="service-card" key={gig._id}>
        <div className="service-image">
          <img
            src={gig.images?.[0] || "https://example.com/default-image.jpg"} // Utilisation du tableau 'images'
            alt={gig.title}
            className="service-img"
          />
        </div>
        <div className="service-info">
          <div className="seller-info">
            <div className="seller-avatar">{sellerName.charAt(0).toUpperCase()}</div>
            <div className="seller-details">
              <div className="seller-name">{sellerName}</div>
            </div>
          </div>
          <div className="service-title">{gig.title}</div>
          <div className="service-rating">
            <FaStar className="star-icon" />
            <span className="rating-value">{gig.rating || "N/A"}</span>
          </div>
          <div className="service-footer">
            <div className="service-actions">
              <button 
                className={`action-button heart ${isLiked ? "liked" : ""}`} 
                onClick={(e) => handleLike(gig._id, e)}
              >
                <FaHeart />
              </button>
            </div>
            <div className="service-price">
              <span className="starting-at">Prix:</span>
              <span className="price">${gig.packages?.basic?.price || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
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
    <div className="skill-market">
      <main className="main-content">
        {Object.keys(categorizedGigs).map(
          (category) =>
            categorizedGigs[category].length > 0 && (
              <section className="section" key={category}>
                <div className="section-header">
                  <h2 className="section-title">{categoryTitles[category] || category}</h2>
                </div>
                <div className="services-container">
                  <div className="services-scroll">
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

export default Test;
