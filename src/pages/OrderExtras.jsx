import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import "./OrderExtras.css";
import m14 from "../assets/icons/m14.png";
import Navbar2 from "../components/ui/Navbar2";
import Checkbox from '../components/ui/Checkbox';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal, FaApplePay } from "react-icons/fa";

function OrderExtras() {
    const navigate = useNavigate();

    const [extras, setExtras] = useState({
        fastDelivery: false,
        additionalPage: false,
        prototype: false,
        uxAnalysis: false,
        userResearch: false,
        userFlows: false,
        wireframes: false,
        designGuide: false,
    });

    const basePrice = 6000;
    const serviceFee = 333;

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

    const calculateTotal = () => {
        let total = basePrice;
        Object.keys(extras).forEach((key) => {
            if (extras[key]) {
                total += extraPrices[key];
            }
        });
        return total + serviceFee;
    };

    const handleExtraChange = (extra) => {
        setExtras((prev) => ({
            ...prev,
            [extra]: !prev[extra],
        }));
    };

    return (
        <div className="page-wrapper">
            <Navbar2 />
            <div className="conteneur-commande">
                <div className="grille-commande">
                    <div className="contenu-principal">
                        <div className="en-tete-service">
                            <div className="miniature-service">
                                <img src={m14 || "/placeholder.svg"} alt="Service thumbnail" />
                            </div>
                            <div className="info-service">
                                <h1 className="titre-service">
                                    Je vais créer un design de site web professionnel pour votre entreprise avec Figma
                                </h1>
                                <div className="evaluation-service">
                                    <div className="etoiles">
                                        <span className="etoile">★</span>
                                        <span className="etoile">★</span>
                                        <span className="etoile">★</span>
                                        <span className="etoile">★</span>
                                        <span className="etoile">★</span>
                                    </div>
                                    <span className="valeur-evaluation">4,9</span>
                                    <span className="nombre-avis">(43 avis)</span>
                                </div>
                            </div>
                            <div className="quantite-service">
                                <span className="etiquette-quantite">Qté</span>
                                <select className="selection-quantite">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <span className="prix-base">{basePrice.toLocaleString()} da</span>
                            </div>
                        </div>

                        <h2 className="section-title">Améliorez votre commande avec des options supplémentaires</h2>

                        <div className="options-list">
                            {[
                                { id: "fastDelivery", label: "Livraison express en 2 jours", badge: "POPULAIRE", desc: "" },
                                { id: "additionalPage", label: "1 page supplémentaire", desc: "Ajoutez des pages supplémentaires si besoin." },
                                { id: "prototype", label: "Prototype · (+2 jours)", desc: "Démo du design pour tests UI/UX." },
                                { id: "uxAnalysis", label: "Analyse UX concurrentielle · (+4 jours)", desc: "Analyse des designs UX de concurrents." },
                                { id: "userResearch", label: "Recherche utilisateur et personas · (+2 jours)", desc: "Création de personas utilisateur." },
                                { id: "userFlows", label: "Parcours utilisateur · (+1 jour)", desc: "Cartographie des parcours utilisateur." },
                                { id: "wireframes", label: "Wireframes · (+1 jour)", desc: "Conception de wireframes pour votre projet." },
                                { id: "designGuide", label: "Guide de design · (+2 jours)", desc: "Création d'un guide pour l'UI." }
                            ].map((option) => (
                                <div key={option.id} className="option-line">
                                    <div className="option-left">
                                        <Checkbox
                                            id={option.id}
                                            checked={extras[option.id]}
                                            onCheckedChange={() => handleExtraChange(option.id)}
                                        />
                                        <div className="option-text">
                                            <label htmlFor={option.id} className="option-label">
                                                {option.label}
                                                {option.badge && <span className="option-badge">{option.badge}</span>}
                                            </label>
                                            {option.desc && <div className="option-desc">{option.desc}</div>}
                                        </div>
                                    </div>
                                    <div className="option-price">
                                        {extraPrices[option.id].toLocaleString()} da
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="barre-laterale">
                        <div className="resume-prix">
                            <h3 className="titre-resume">Résumé des prix</h3>

                            <div className="ligne-resume">
                                <span>Sous-total</span>
                                <span>{basePrice.toLocaleString()} da</span>
                            </div>

                            <div className="ligne-resume">
                                <span>Frais de service</span>
                                <span>{serviceFee.toLocaleString()} da</span>
                            </div>

                            <div className="separateur-resume"></div>

                            <div className="ligne-resume total">
                                <span>Total</span>
                                <span>{calculateTotal().toLocaleString()} da</span>
                            </div>

                            <div className="ligne-resume">
                                <span>Délai de livraison</span>
                                <span>5 jours</span>
                            </div>

                            <button
                                className="bouton-paiement"
                                onClick={() => navigate("/confirmP", {
                                    state: {
                                        selectedExtras: extras,
                                        total: calculateTotal(),
                                        basePrice,
                                        serviceFee
                                    }
                                })}
                            >
                                Continuer vers le paiement
                            </button>

                            <div className="avis-non-facturation">Vous ne serez pas débité maintenant</div>

                            <div className="info-paiement">
                                <div className="methodes-paiement">
                                    <FaCcVisa className="icone-paiement" />
                                    <FaCcMastercard className="icone-paiement" />
                                    <FaCcAmex className="icone-paiement" />
                                    <FaCcDiscover className="icone-paiement" />
                                    <FaCcPaypal className="icone-paiement" />
                                    <FaApplePay className="icone-paiement" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderExtras;