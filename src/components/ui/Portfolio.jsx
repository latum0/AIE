"use client"
import React from 'react';
// src/components/ui/Portfolio.jsx
import { useState } from "react"
import { FaImage, FaCalendarAlt, FaTag, FaDollarSign, FaClock, FaArrowRight } from "react-icons/fa"
import "./Portfolio.css"

const Portfolio = ({ hideHeader = false }) => {
  const [activeImage, setActiveImage] = useState(0)

  // Mock data
  const portfolioItems = [
    {
      id: 1,
      title: "H-Kore Fitness Website Design",
      date: "Novembre 2024",
      description:
        "Ce projet présente la conception d'un site web dynamique et attrayant pour H-Kore, un studio de fitness. Le site est conçu pour attirer des clients potentiels, fournir des informations clés sur leurs services et générer des conversions grâce à une interface conviviale.",
      images: [
        "https://codedamn.com/assets/images/learnpaths/og/frontend.png",
        "https://commercetools.com/assets/blog/business-blog/2023-blogpost-frontend-solution.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx37pHeJnzuPi0sFXFKHNNPdQ0CBRN6ed_Uw&s",
      ],
      tags: ["Sports & Fitness", "Fitness Club/Gym/Center", "Website Design", "Website Development"],
      cost: "1000€-2500€",
      duration: "7-30 jours",
    },
    {
      id: 2,
      title: "Application E-commerce React Native",
      date: "Octobre 2024",
      description:
        "Développement d'une application mobile e-commerce complète avec React Native. L'application comprend l'authentification des utilisateurs, la navigation par catégories, les paiements sécurisés et le suivi des commandes en temps réel.",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx37pHeJnzuPi0sFXFKHNNPdQ0CBRN6ed_Uw&s",
        "https://codedamn.com/assets/images/learnpaths/og/frontend.png",
      ],
      tags: ["E-commerce", "Mobile App", "React Native", "UI/UX Design"],
      cost: "2500€-5000€",
      duration: "30-60 jours",
    },
  ]

  const handleImageChange = (itemId, index) => {
    setActiveImage(index)
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-section">
        <h2 className="section-title">Portfolio</h2>

        {portfolioItems.map((item) => (
          <div key={item.id} className="portfolio-item">
            <div className="portfolio-main">
              <div className="portfolio-image-container">
                <img
                  src={item.images[activeImage] || "/placeholder.svg"}
                  alt={item.title}
                  className="portfolio-image"
                />
                <div className="image-count">
                  <FaImage className="image-icon" /> {item.images.length}
                </div>
              </div>

              <div className="portfolio-content">
                <p className="portfolio-date">
                  <FaCalendarAlt className="date-icon" /> {item.date}
                </p>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>

                <div className="portfolio-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="portfolio-tag">
                      <FaTag className="tag-icon" /> {tag}
                    </span>
                  ))}
                </div>

                <div className="portfolio-meta">
                  <div className="meta-item">
                    <FaDollarSign className="meta-icon" />
                    <div>
                      <p className="meta-label">Coût du projet</p>
                      <p className="meta-value">{item.cost}</p>
                    </div>
                  </div>
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <div>
                      <p className="meta-label">Durée du projet</p>
                      <p className="meta-value">{item.duration}</p>
                    </div>
                  </div>
                </div>

                <button className="view-details-btn">
                  Voir les détails <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>

            <div className="portfolio-thumbnails">
              {item.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === activeImage ? "active" : ""}`}
                  onClick={() => handleImageChange(item.id, index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
