"use client"

import { useState } from "react"
import { CreditCard, Clock, RefreshCw, Check, X } from "lucide-react"
import "./checkout.css"

export default function Checkout() {
  // État pour le formulaire
  const [formData, setFormData] = useState({
    paymentMethod: "card",
  })

  // État pour la carte sélectionnée
  const [selectedCard, setSelectedCard] = useState("visa")

  // État pour l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState("basic")

  // Données du gig
  const gigData = {
    title: "Je vais créer une vidéo promotionnelle pour votre entreprise",
    packages: {
      basic: {
        name: "BASIC PROMO",
        price: 868,
        description: "Basic Package Only Laptop-scenes Includes, Background Music, Logo, and 720HD Video",
        delivery: "4 Days Delivery",
        revisions: "1 Revision",
        features: [
          { name: "8 captions", included: true },
          { name: "5 screenshots", included: true },
          { name: "Screen recording", included: false },
          { name: "Add logo", included: true },
          { name: "Dynamic transitions", included: true },
          { name: "30 seconds running time", included: true },
        ],
      },
      standard: {
        name: "STANDARD PROMO",
        price: 1299,
        description: "Standard Package with Desktop & Mobile scenes, Background Music, Logo, and 1080HD Video",
        delivery: "3 Days Delivery",
        revisions: "2 Revisions",
        features: [
          { name: "12 captions", included: true },
          { name: "8 screenshots", included: true },
          { name: "Screen recording", included: true },
          { name: "Add logo", included: true },
          { name: "Dynamic transitions", included: true },
          { name: "45 seconds running time", included: true },
        ],
      },
      premium: {
        name: "PREMIUM PROMO",
        price: 1899,
        description: "Premium Package with All Device scenes, Custom Music, Logo Animation, and 4K Video",
        delivery: "2 Days Delivery",
        revisions: "Unlimited Revisions",
        features: [
          { name: "20 captions", included: true },
          { name: "15 screenshots", included: true },
          { name: "Screen recording", included: true },
          { name: "Add logo", included: true },
          { name: "Dynamic transitions", included: true },
          { name: "60 seconds running time", included: true },
        ],
      },
    },
  }

  // Obtenir le package sélectionné
  const selectedPackage = gigData.packages[selectedTab]

  // Gérer le changement de méthode de paiement
  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    })
  }

  // Gérer la sélection de carte
  const handleCardSelection = (card) => {
    setSelectedCard(card)
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Données du formulaire:", formData)
    console.log("Package sélectionné:", selectedPackage)
    console.log("Carte sélectionnée:", selectedCard)
    alert(`Commande passée avec succès! Montant total: ${selectedPackage.price} ₹`)
  }

  return (
    <div className="checkout-page">
      <main className="checkout-content">
        <div className="container">
          <div className="checkout-grid">
            {/* Détails du gig à gauche */}
            <div className="gig-details">
              <h1 className="gig-title">{gigData.title}</h1>

              <div className="package-card">
                <div className="package-tabs">
                  <button
                    className={`tab-button ${selectedTab === "basic" ? "active" : ""}`}
                    onClick={() => setSelectedTab("basic")}
                  >
                    Basic
                  </button>
                  <button
                    className={`tab-button ${selectedTab === "standard" ? "active" : ""}`}
                    onClick={() => setSelectedTab("standard")}
                  >
                    Standard
                  </button>
                  <button
                    className={`tab-button ${selectedTab === "premium" ? "active" : ""}`}
                    onClick={() => setSelectedTab("premium")}
                  >
                    Premium
                  </button>
                </div>

                <div className="package-content">
                  <div className="package-header">
                    <h2 className="package-name">{selectedPackage.name}</h2>
                    <div className="package-price">₹{selectedPackage.price}</div>
                  </div>

                  <div className="package-divider"></div>

                  <p className="package-description">{selectedPackage.description}</p>

                  <div className="package-delivery-info">
                    <div className="delivery-time">
                      <Clock size={16} className="info-icon" />
                      <span>{selectedPackage.delivery}</span>
                    </div>
                    <div className="revision-count">
                      <RefreshCw size={16} className="info-icon" />
                      <span>{selectedPackage.revisions}</span>
                    </div>
                  </div>

                  <div className="package-features">
                    {selectedPackage.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <div className={`feature-icon-circle ${feature.included ? "included" : "not-included"}`}>
                          {feature.included ? (
                            <Check size={14} className="feature-icon-circle.included " />
                          ) : (
                            <X size={14} className="feature-icon-circle.not-included" />
                          )}
                        </div>
                        <span className="feature-text">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé et paiement à droite */}
            <div className="order-summary">
              <h2>Résumé de la commande</h2>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Package</span>
                  <span>{selectedPackage.name}</span>
                </div>

                <div className="summary-row">
                  <span>Délai de livraison</span>
                  <span>{selectedPackage.delivery.split(" ")[0]} jours</span>
                </div>
              </div>

              <div className="order-totals">
                <div className="total-row grand-total">
                  <span>Total à payer:</span>
                  <span>₹{selectedPackage.price}</span>
                </div>
              </div>

              {/* Section méthode de paiement */}
              <div className="payment-methods">
                <h3>Méthode de paiement</h3>

                <div className="payment-option">
                  <div className="payment-radio">
                    <input
                      type="radio"
                      id="card-payment"
                      name="payment-method"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => handlePaymentMethodChange("card")}
                    />
                    <label htmlFor="card-payment">
                      <CreditCard size={16} className="payment-icon" />
                      Carte bancaire
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="card-selection">
                      <button
                        type="button"
                        className={`card-button ${selectedCard === "visa" ? "selected" : ""}`}
                        onClick={() => handleCardSelection("visa")}
                      >
                        <div className="card-logo visa">
                          <span>VISA</span>
                        </div>
                        <span className="card-name">Visa</span>
                      </button>

                      <button
                        type="button"
                        className={`card-button ${selectedCard === "mastercard" ? "selected" : ""}`}
                        onClick={() => handleCardSelection("mastercard")}
                      >
                        <div className="card-logo mastercard">
                          <div className="mc-circle red"></div>
                          <div className="mc-circle yellow"></div>
                        </div>
                        <span className="card-name">Mastercard</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button className="place-order-btn" onClick={handleSubmit}>
                Passer la commande
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
