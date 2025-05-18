"use client";

import React, { useState, useEffect } from "react";
import "./FreelancerShowcase.css";
import { 
  FaBell, 
  FaEnvelope, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaPinterest, 
  FaInstagram 
} from "react-icons/fa";

function EarningsPage() {
  const [invoices, setInvoices] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        token = await loginUser(); // Login avant de récupérer le token
        if (!token) throw new Error("Authentification échouée, aucun token disponible");
      }

      const response = await fetch("http://localhost:5000/api/invoices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sécurisation avec un token
        },
      });

      if (!response.ok) {
        throw new Error(`Échec du fetch: ${response.status} ${response.statusText}`);
      }

      const invoicesData = await response.json();
      console.log("🔹 Factures reçues dans le front-end :", invoicesData);

      setInvoices(invoicesData);
      setTotalEarnings(
        invoicesData.reduce((acc, invoice) => acc + (invoice.status === "paid" ? invoice.amount : 0), 0)
      ); // Calcul des gains totaux à partir des factures payées
    } catch (error) {
      console.error("❌ Erreur lors du fetch :", error);
    } finally {
      setLoading(false);
    }
  };

  fetchInvoices();
}, []);


  // Formatage de l'affichage des montants
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h2 className="page-title">Earnings</h2>
            <a href="#" className="learn-more">Learn more about this page</a>
          </div>

          <h3 className="section-title">Available funds</h3>

          <div className="balance-card">
            <div className="balance-info">
              <span className="balance-label">Balance available for use</span>
              <FaQuestionCircle className="icon-small" />
            </div>
            <div className="balance-amount">{formatCurrency(totalEarnings)}</div>

            <button className="withdraw-button">Withdraw balance</button>
            <a href="#" className="manage-link">Manage payout methods</a>
          </div>

          <div className="filters">
            <div className="filter-dropdown">
              <button className="filter-button">
                <span>Date range</span>
                <FaChevronDown className="icon-small" />
              </button>
            </div>
            <div className="filter-dropdown">
              <button className="filter-button">
                <span>Activity</span>
                <FaChevronDown className="icon-small" />
              </button>
            </div>
          </div>

          <div className="results-count">
            Showing {invoices.length} result{invoices.length !== 1 && "s"}.
          </div>

          <div className="table-container">
            <table className="earnings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Buyer</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td>{new Date(invoice.issuedDate).toLocaleDateString()}</td>
                      <td>{invoice.buyerId?.name || "Buyer"}</td>
                      <td>{invoice.status}</td>
                      <td>{formatCurrency(invoice.amount)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="empty-state">No invoices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EarningsPage;
