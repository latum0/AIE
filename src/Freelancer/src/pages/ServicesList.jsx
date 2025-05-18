"use client";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  PlusCircle,
  Search,
  List,
  Grid,
  Info,
  RefreshCw,
} from "lucide-react";
import "./ServicesList.css"; // reuse the same CSS file

const ServicesList = () => {
  // Retrieve the freelancer's userId from the URL
  const { userId } = useParams();
  const [gigs, setGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // Retrieve the accessToken from localStorage.
  const accessToken = localStorage.getItem("accessToken");

  // Fetch gigs for this freelancer from the API endpoint
  const fetchGigs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5000/api/gigs/freelancer/${userId}`,
        { headers: { "Authorization": `Bearer ${accessToken}` } }
      );
      if (!response.ok) {
        throw new Error("Error fetching gigs");
      }
      const data = await response.json();
      setGigs(data);
    } catch (err) {
      console.error("Erreur lors du chargement des gigs:", err);
      setError("Échec du chargement des gigs. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle gig deletion via a DELETE request.
  const handleDeleteGig = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/gigs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error deleting gig");
      }
      // Remove the deleted gig from the state.
      setGigs((prevGigs) => prevGigs.filter((gig) => gig._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression du gig:", err);
      setError("Échec de la suppression du gig. Veuillez réessayer.");
    }
  };

  // Filter gigs by searching in their title or description
  const filteredGigs = gigs.filter((gig) => {
    if (!gig) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      gig.title?.toLowerCase().includes(searchLower) ||
      gig.description?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="services-loading">
        <RefreshCw className="loading-icon" />
        <p>Chargement des gigs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-error">
        <Info size={48} className="error-icon" />
        <h3>Un problème est survenu</h3>
        <p>{error}</p>
        <button className="retry-button" onClick={fetchGigs}>
          <RefreshCw size={16} />
          <span>Réessayer</span>
        </button>
      </div>
    );
  }

  return (
    <div className="services-list-container">
      <div className="services-list-header">
        <div className="header-title">
          <h1>Mes Gigs</h1>
          <p>Gérez et mettez à jour vos offres de gigs</p>
        </div>
        <Link to={`/freelancer/${userId}/gigs/new`} className="create-service-btn">
          <PlusCircle size={18} />
          <span>Créer un nouveau gig</span>
        </Link>
      </div>

      <div className="services-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher des gigs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="view-options">
          <button
            className={`view-option ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Vue en grille"
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-option ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="Vue en liste"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {filteredGigs.length > 0 ? (
        <div className={`services-grid view-${viewMode}`}>
          {filteredGigs.map((gig) => (
            <GigCard
              key={gig._id}
              gig={gig}
              onDelete={handleDeleteGig}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        <div className="empty-services">
          <div className="empty-content">
            <h3>Aucun gig trouvé</h3>
            {searchTerm ? (
              <p>
                Aucun résultat ne correspond à votre recherche. Essayez avec d'autres termes.
              </p>
            ) : (
              <>
                <p>
                  Vous n'avez pas encore créé de gigs. Commencez par créer votre premier gig.
                </p>
                <Link to={`/freelancer/${userId}/gigs/new`} className="create-service-btn">
                  <PlusCircle size={18} />
                  <span>Créer un nouveau gig</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const GigCard = ({ gig, onDelete, userId }) => {
  // Safely get the first image from the images array.
  const firstImage = gig.images && gig.images.length > 0 ? gig.images[0] : null;
  const imageUrl =
    typeof firstImage === "string"
      ? firstImage.startsWith("http")
        ? firstImage
        : `http://localhost:5000${firstImage}`
      : null;

  // Assume the price is taken from the basic package.
  const price =
    gig.packages && gig.packages.basic ? gig.packages.basic.price : "N/A";

  return (
    <div className="gig-card">
      {imageUrl && (
        <img src={imageUrl} alt={gig.title} className="gig-image" />
      )}
      <div className="gig-card-content">
        <h2 className="gig-title">{gig.title}</h2>
        <p className="gig-price">À partir de US$ {price}</p>
      </div>
      <div className="gig-card-actions">
        <button onClick={() => onDelete(gig._id)} className="delete-button">
          Supprimer
        </button>
        <Link
          to={`/freelancer/${userId}/services/editGig/${gig._id}`}
          className="edit-button"
        >
          Éditer
        </Link>
      </div>
    </div>
  );
};

export default ServicesList;
