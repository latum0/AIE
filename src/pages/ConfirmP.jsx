import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar2 from '../components/ui/Navbar2';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';
import './ConfirmP.css';

function ConfirmPay() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [isProcessing, setIsProcessing] = useState(false);

    // Récupération des données depuis OrderExtras
    const { selectedExtras = {}, basePrice = 6000, serviceFee = 333 } = state || {};

    const extraPrices = {
        fastDelivery: 1000,
        additionalPage: 1000,
        prototype: 1000,
        uxAnalysis: 1000,
        userResearch: 1000,
        userFlows: 1000,
        wireframes: 1000,
        designGuide: 1000,
    };

    // Calcul du total avec les extras
    const calculateTotal = () => {
        let total = basePrice;
        Object.keys(selectedExtras).forEach((key) => {
            if (selectedExtras[key]) {
                total += extraPrices[key];
            }
        });
        return total + serviceFee;
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            navigate('/submit', {
                state: {
                    selectedExtras,
                    total: calculateTotal(),
                    paymentMethod
                }
            });
        }, 1500);
    };

    // Liste des extras avec leurs labels
    const extrasList = [
        { id: "fastDelivery", label: "Livraison express en 2 jours" },
        { id: "additionalPage", label: "1 page supplémentaire" },
        { id: "prototype", label: "Prototype" },
        { id: "uxAnalysis", label: "Analyse UX concurrentielle" },
        { id: "userResearch", label: "Recherche utilisateur et personas" },
        { id: "userFlows", label: "Parcours utilisateur" },
        { id: "wireframes", label: "Wireframes" },
        { id: "designGuide", label: "Guide de design" }
    ];

    return (
        <div className="confirmpay-page">
            <Navbar2 />
            <div className="confirmpay-container">
                <div className="confirmpay-grid">
                    <div className="order-summary-section">
                        <h2>Récapitulatif de commande</h2>
                        <div className="summary-card">
                            <div className="summary-item">
                                <span>Design de site web</span>
                                <span>{basePrice.toLocaleString()} DA</span>
                            </div>

                            {/* Affichage des extras sélectionnés */}
                            {extrasList.map(extra => (
                                selectedExtras[extra.id] && (
                                    <div key={extra.id} className="summary-item">
                                        <span>{extra.label}</span>
                                        <span>{extraPrices[extra.id].toLocaleString()} DA</span>
                                    </div>
                                )
                            ))}

                            <div className="summary-item">
                                <span>Frais de service</span>
                                <span>{serviceFee.toLocaleString()} DA</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>{calculateTotal().toLocaleString()} DA</span>
                            </div>
                        </div>

                        <div className="delivery-info">
                            <h3>Informations de livraison</h3>
                            <p>Email: client@example.com</p>
                            <p>Délai estimé: {selectedExtras.fastDelivery ? "2 jours" : "5 jours"}</p>
                        </div>
                    </div>

                    <div className="payment-section">
                        <h2>Méthode de paiement</h2>
                        <div className="payment-methods">
                            <div
                                className={`payment-option ${paymentMethod === 'credit' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('credit')}
                            >
                                <div className="payment-icons">
                                    <FaCcVisa />
                                    <FaCcMastercard />
                                    <FaCcAmex />
                                </div>
                                <span>Carte de crédit</span>
                            </div>

                            <div
                                className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                <FaCcPaypal />
                                <span>PayPal</span>
                            </div>
                        </div>

                        {paymentMethod === 'credit' && (
                            <div className="credit-card-form">
                                <div className="form-group">
                                    <label>Numéro de carte</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date d'expiration</label>
                                        <input type="text" placeholder="MM/AA" />
                                    </div>
                                    <div className="form-group">
                                        <label>Code de sécurité</label>
                                        <input type="text" placeholder="CVV" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Nom sur la carte</label>
                                    <input type="text" placeholder="Nom complet" />
                                </div>
                            </div>
                        )}

                        <div className="payment-actions">
                            <button
                                className="back-btn"
                                onClick={() => navigate(-1)}
                            >
                                Retour
                            </button>
                            <button
                                className={`bouton-paiement ${isProcessing ? 'processing' : ''}`}
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Traitement...' : 'Payer maintenant'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPay;