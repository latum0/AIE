"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Search, Download } from "lucide-react";
import "./Histor.css";

const fetchUserName = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`);
    if (!response.ok) throw new Error("Échec de la récupération du nom d'utilisateur");
    const userData = await response.json();
    return userData.name;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du nom :", error);
    return "Nom inconnu";
  }
};



const Histor = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Authentification requise");

        const response = await fetch("http://localhost:5000/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erreur de récupération des commandes");

        let ordersData = await response.json();

        // Récupération des noms et titres pour chaque commande
        ordersData = await Promise.all(
          ordersData.map(async (order) => ({
            ...order,
            buyerName: await fetchUserName(order.buyerId),
            sellerName: await fetchUserName(order.sellerId),
            gigTitle: order.gigId?.title ,
          }))
        );

        setOrders(ordersData);
      } catch (error) {
        console.error("❌ Erreur lors du fetch des commandes :", error);
      }
    };

    fetchOrders();
  }, []);

  const generatePDF = (order) => {
    try {
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`Facture - Commande ${order._id}`, 20, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Acheteur: ${order.buyerName}`, 20, 30);
      doc.text(`Vendeur: ${order.sellerName}`, 20, 40);
      doc.text(`Gig: ${order.gigTitle}`, 20, 50);
      doc.text(`Date de création: ${new Date(order.createdAt).toLocaleDateString("fr-FR")}`, 20, 60);
      doc.text(`Prix: ${order.price.toFixed(2)} €`, 20, 70);
      doc.text(`Statut: ${order.status}`, 20, 80);

      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(10, 90, 200, 90);

      doc.setFontSize(10);
      doc.text("Merci pour votre commande !", 20, 100);

      doc.save(`Facture_${order._id}.pdf`);
    } catch (error) {
      console.error("❌ Erreur de génération PDF :", error);
      alert("Erreur lors de la génération du PDF.");
    }
  };

  return (
    <div className="order-history-container">
      <header className="order-header">
        <h1>Historique des Commandes et Factures</h1>
      </header>

      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher par ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>Acheteur</th>
              <th>Vendeur</th>
              <th>Gig</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.buyerName}</td>
                <td>{order.sellerName}</td>
                <td>{order.gigTitle}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td>
                <td className="amount-cell">{order.price.toFixed(2)} €</td>
                <td className="actions-cell">
                  <button className="invoice-button" onClick={() => generatePDF(order)}>
                    <Download size={16} /> Télécharger Facture
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Histor;
