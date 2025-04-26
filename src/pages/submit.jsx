import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/ui/Navbar2';
import { FaCheckCircle, FaFileAlt, FaEnvelope, FaClock, FaHome } from 'react-icons/fa';
import './Submit.css';

function Submit() {
    const navigate = useNavigate();
    const { state } = useLocation();

    // Récupération des données depuis ConfirmPay
    const { selectedExtras = {}, total = '7,333 DA', paymentMethod = 'credit' } = state || {};

    // Liste des extras avec leurs prix
    const extrasList = [
        { id: "fastDelivery", label: "Livraison express en 2 jours", price: 1000 },
        { id: "additionalPage", label: "1 page supplémentaire", price: 1000 },
        { id: "prototype", label: "Prototype", price: 1000 },
        { id: "uxAnalysis", label: "Analyse UX concurrentielle", price: 1000 },
        { id: "userResearch", label: "Recherche utilisateur et personas", price: 1000 },
        { id: "userFlows", label: "Parcours utilisateur", price: 1000 },
        { id: "wireframes", label: "Wireframes", price: 1000 },
        { id: "designGuide", label: "Guide de design", price: 1000 }
    ];

    // Données de la commande
    const orderData = {
        number: `CMD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('fr-FR'),
        amount: total, // Utilisation du montant transmis
        status: 'En préparation',
        paymentMethod: paymentMethod === 'credit' ? 'Carte de crédit' : 'PayPal'
    };

    return (
        <div className="submit-page">
            <Navbar2 />

            <div className="submit-container">
                {/* Message de succès */}
                <div className="success-message">
                    <FaCheckCircle className="success-icon" />
                    <h1>Paiement confirmé !</h1>
                    <p>Votre commande a été enregistrée avec succès.</p>
                </div>

                {/* Récapitulatif */}
                <div className="order-summary">
                    <h2>Détails de votre commande</h2>

                    <div className="order-details">
                        <div className="detail-row">
                            <span>Numéro de commande :</span>
                            <span>{orderData.number}</span>
                        </div>
                        <div className="detail-row">
                            <span>Date :</span>
                            <span>{orderData.date}</span>
                        </div>

                        {/* Affichage des options sélectionnées */}
                        {extrasList.map(extra => (
                            selectedExtras[extra.id] && (
                                <div key={extra.id} className="detail-row">
                                    <span>{extra.label} :</span>
                                    <span>{extra.price.toLocaleString()} DA</span>
                                </div>
                            )
                        ))}

                        <div className="detail-row">
                            <span>Montant total :</span>
                            <span className="amount">{orderData.amount}</span>
                        </div>
                        <div className="detail-row">
                            <span>Statut :</span>
                            <span className="status">{orderData.status}</span>
                        </div>
                        <div className="detail-row">
                            <span>Méthode de paiement :</span>
                            <span>{orderData.paymentMethod}</span>
                        </div>
                    </div>
                </div>

                {/* Prochaines étapes */}
                <div className="next-steps">
                    <h2>Prochaines étapes</h2>

                    <div className="step">
                        <FaFileAlt className="step-icon" />
                        <div>
                            <h3>Recevez vos fichiers</h3>
                            <p>Les livrables seront disponibles sous {selectedExtras.fastDelivery ? '2' : '5'} jours</p>
                        </div>
                    </div>

                    <div className="step">
                        <FaEnvelope className="step-icon" />
                        <div>
                            <h3>Email de confirmation</h3>
                            <p>Un récapitulatif vous a été envoyé par email</p>
                        </div>
                    </div>
                </div>

                {/* Bouton */}
                <button
                    className="home-button"
                    onClick={() => navigate('/')}
                >
                    <FaHome className="button-icon" />
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
}

export default Submit;