"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Search, Eye, FileText, Download, Calendar, X, User } from "lucide-react";
import "./Histor.css";

const Histor = () => {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loginUser = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com", // Replace with actual user input
        password: "123", // Replace with actual user input
      }),
    });

    if (!response.ok) {
      throw new Error(`Échec de l'authentification: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // Stocke le token

    return data.token;
  } catch (error) {
    console.error("❌ Erreur lors du login :", error);
  }
};

const fetchOrders = async () => {
  try {
    let token = localStorage.getItem("token");

    if (!token) {
      token = await loginUser(); // Login avant de récupérer le token
      if (!token) throw new Error("Authentification échouée, aucun token disponible");
    }

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Échec du fetch: ${response.status} ${response.statusText}`);
    }

    const ordersData = await response.json();
    setOrders(ordersData);
  } catch (error) {
    console.error("❌ Erreur lors du fetch :", error);
  }
};

// Appel de la fonction
fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesDate = dateFilter ? order.createdAt.includes(dateFilter) : true;
    const matchesSearch = searchTerm
      ? order._id.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesDate && matchesSearch;
  });

  const generatePDF = (order) => {
  try {
    const doc = new jsPDF();

    // Vérifier que l'objet order existe
    if (!order) {
      throw new Error("Aucune commande fournie");
    }

    // Section 1 : En-tête
    doc.setFontSize(18);
    doc.text(`Facture - Commande ${order._id || "N/A"}`, 20, 20);

    // Section 2 : Informations client
    doc.setFontSize(12);
    const buyerName = order.buyerId?.name || "Client non spécifié";
    const orderDate = order.createdAt 
      ? new Date(order.createdAt).toLocaleDateString("fr-FR")
      : "Date inconnue";
    const totalAmount = order.price?.toFixed(2) || "0.00";

    doc.text(`Client: ${buyerName}`, 20, 30);
    doc.text(`Date: ${orderDate}`, 20, 40);
    doc.text(`Montant Total: ${totalAmount} €`, 20, 50);

    // Section 3 : Liste des produits
    doc.text("Produits commandés:", 20, 60);
    let yPosition = 70;

    if (order.gigId?.length > 0) {
      order.gigId.forEach((gig, index) => {
        const title = gig?.title || "Produit sans nom";
        const price = gig?.packages?.basic?.price?.toFixed(2) || "0.00";
        doc.text(`${index + 1}. ${title} - ${price} €`, 20, yPosition);
        yPosition += 10;
      });
    } else {
      doc.text("Aucun produit trouvé", 20, yPosition);
    }

    // Génération du fichier
    doc.save(`Facture_${order._id || "sans-id"}.pdf`);

  } catch (error) {
    console.error("❌ Erreur de génération PDF :", error);
    alert("Erreur lors de la génération du PDF. Vérifier la console.");
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
              <th>Date</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
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
