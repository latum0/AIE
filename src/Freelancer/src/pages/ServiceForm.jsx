"use client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ServiceForm.css";

export default function ServiceForm() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Authenticated user's ID from the URL

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
    basic: {
      title: "",
      description: "",
      price: "", // new field for package price
      deliveryTime: "",
      revisions: "",
      includedServices: [""],
    },
    standard: {
      title: "",
      description: "",
      price: "",
      deliveryTime: "",
      revisions: "",
      includedServices: [""],
    },
    premium: {
      title: "",
      description: "",
      price: "",
      deliveryTime: "",
      revisions: "",
      includedServices: [""],
    },
  });

  // Generic field change handler
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Update package fields (works for the new "price" field as well)
  const handlePackageChange = (packageType, field, value) => {
    setFormData({
      ...formData,
      [packageType]: { ...formData[packageType], [field]: value },
    });
  };

  // Update the "includedServices" array for each package.
  const handleServiceChange = (packageType, index, value) => {
    const newServices = [...formData[packageType].includedServices];
    newServices[index] = value;
    setFormData({
      ...formData,
      [packageType]: { ...formData[packageType], includedServices: newServices },
    });
  };

  const addService = (packageType) => {
    setFormData({
      ...formData,
      [packageType]: {
        ...formData[packageType],
        includedServices: [...formData[packageType].includedServices, ""],
      },
    });
  };

  const removeService = (packageType, index) => {
    if (formData[packageType].includedServices.length === 1) return;
    const newServices = [...formData[packageType].includedServices];
    newServices.splice(index, 1);
    setFormData({
      ...formData,
      [packageType]: { ...formData[packageType], includedServices: newServices },
    });
  };

  // Handle image selection. We store each file (with preview URL) locally.
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // Validate that all required fields are filled in.
  const validateForm = () => {
    if (!formData.title.trim()) {
      alert("Veuillez renseigner le titre du service.");
      return false;
    }
    if (!formData.description.trim()) {
      alert("Veuillez renseigner la description du service.");
      return false;
    }
    if (!formData.category.trim()) {
      alert("Veuillez sélectionner une catégorie.");
      return false;
    }
    if (formData.images.length < 1) {
      alert("Veuillez sélectionner au moins une image.");
      return false;
    }
    const packageTypes = ["basic", "standard", "premium"];
    for (let type of packageTypes) {
      const pkg = formData[type];
      if (!pkg.title.trim()) {
        alert(`Veuillez renseigner le titre du forfait ${type}.`);
        return false;
      }
      if (!pkg.description.trim()) {
        alert(`Veuillez renseigner la description du forfait ${type}.`);
        return false;
      }
      if (!pkg.price || Number(pkg.price) <= 0) {
        alert(`Veuillez renseigner un prix valide pour le forfait ${type}.`);
        return false;
      }
      if (!pkg.deliveryTime) {
        alert(`Veuillez renseigner le délai de livraison du forfait ${type}.`);
        return false;
      }
      // Assuming 0 is acceptable for revisions; here we simply check that it is not empty.
      if (pkg.revisions === "") {
        alert(`Veuillez renseigner le nombre de révisions du forfait ${type}.`);
        return false;
      }
      if (!pkg.includedServices || pkg.includedServices.length < 1) {
        alert(`Veuillez ajouter au moins une inclusion pour le forfait ${type}.`);
        return false;
      }
      for (let service of pkg.includedServices) {
        if (!service.trim()) {
          alert(`Veuillez renseigner toutes les inclusions pour le forfait ${type}.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding.
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      // STEP 1: Upload all images in a single request.
      const imageFormData = new FormData();
      formData.images.forEach((img) => {
        imageFormData.append("file", img.file);
      });

      const uploadResponse = await axios.post("/upload", imageFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Axios will automatically set the Content-Type for FormData.
        },
      });

      // Expect response to have a "urls" property with an array of secure image URLs.
      const imageUrls = uploadResponse.data.urls;

      // STEP 2: Prepare the gig/service payload using the secure URLs for images.
      const gigPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        packages: {
          basic: formData.basic,
          standard: formData.standard,
          premium: formData.premium,
        },
        images: imageUrls,
      };

      const response = await axios.post("/gigs", gigPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Service (gig) created successfully:", response.data);
      alert("Service créé avec succès!");
      navigate(`/freelancer/${userId}/services`);
    } catch (error) {
      console.error("Erreur lors de la création du service:", error);
      alert("Erreur lors de la création du service. Veuillez réessayer.");
    }
  };

  const renderPackageForm = (packageType) => {
    const packageData = formData[packageType];
    let packageTitle = "";
    if (packageType === "basic") packageTitle = "Basique";
    else if (packageType === "standard") packageTitle = "Standard";
    else if (packageType === "premium") packageTitle = "Premium";

    return (
      <div className="package-column">
        <h3 className="package-title">{packageTitle}</h3>
        <div className="form-group">
          <label className="form-label" htmlFor={`${packageType}-title`}>
            Titre
          </label>
          <input
            id={`${packageType}-title`}
            className="form-control"
            type="text"
            placeholder={`Titre du forfait ${packageTitle.toLowerCase()}`}
            value={packageData.title}
            onChange={(e) => handlePackageChange(packageType, "title", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor={`${packageType}-description`}>
            Description
          </label>
          <textarea
            id={`${packageType}-description`}
            className="form-control"
            placeholder={`Décrivez ce qui est inclus dans votre forfait ${packageTitle.toLowerCase()}`}
            value={packageData.description}
            onChange={(e) => handlePackageChange(packageType, "description", e.target.value)}
            required
          />
          <p className="hint">Soyez précis sur ce que les clients recevront</p>
        </div>
        {/* New Price Field */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${packageType}-price`}>
            Prix (€)
          </label>
          <input
            id={`${packageType}-price`}
            className="form-control"
            type="number"
            min="0"
            placeholder="ex. 100"
            value={packageData.price}
            onChange={(e) => handlePackageChange(packageType, "price", e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group half">
            <label className="form-label" htmlFor={`${packageType}-delivery-time`}>
              Délai de livraison (jours)
            </label>
            <input
              id={`${packageType}-delivery-time`}
              className="form-control"
              type="number"
              min="1"
              placeholder="ex. 3"
              value={packageData.deliveryTime}
              onChange={(e) => handlePackageChange(packageType, "deliveryTime", e.target.value)}
              required
            />
          </div>
          <div className="form-group half">
            <label className="form-label" htmlFor={`${packageType}-revisions`}>
              Nombre de révisions
            </label>
            <input
              id={`${packageType}-revisions`}
              className="form-control"
              type="number"
              min="0"
              placeholder="ex. 2"
              value={packageData.revisions}
              onChange={(e) => handlePackageChange(packageType, "revisions", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="inclusions-header">
            <label className="form-label">Inclusions</label>
            <button
              type="button"
              className="btn btn-outline btn-sm add-inclusion"
              onClick={() => addService(packageType)}
            >
              + Ajouter
            </button>
          </div>
          {packageData.includedServices.map((service, index) => (
            <div key={index} className="inclusion-item">
              <input
                className="form-control"
                type="text"
                placeholder={`Inclusion ${index + 1}`}
                value={service}
                onChange={(e) => handleServiceChange(packageType, index, e.target.value)}
                required
              />
              <button
                type="button"
                className="btn-icon remove-inclusion"
                onClick={() => removeService(packageType, index)}
                aria-label="Supprimer l'inclusion"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="service-form-page">
      <div className="service-form-card">
        <h1>Créer un nouveau service</h1>
        <h2>Définissez vos forfaits de service pour attirer des clients potentiels</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="service-title">
              Titre du service
            </label>
            <input
              id="service-title"
              className="form-control"
              type="text"
              placeholder="ex. Conception de logo professionnel"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="service-description">
              Description du service
            </label>
            <textarea
              id="service-description"
              className="form-control"
              placeholder="Décrivez votre service"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Catégorie</label>
            <select
              id="service-category"
              className="form-control"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="design">Design graphique</option>
              <option value="web">Développement web</option>
              <option value="writing">Rédaction</option>
              <option value="marketing">Marketing</option>
              <option value="video">Vidéo et animation</option>
              <option value="music">Musique et audio</option>
              <option value="business">Services aux entreprises</option>
              <option value="lifestyle">Style de vie</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Images du service</label>
            <div className="image-upload-container">
              <label className="image-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="image-upload-input"
                  required
                />
                <div className="image-upload-button">
                  <span>+ Ajouter des images</span>
                </div>
              </label>
              <p className="hint">
                Ajoutez jusqu'à 5 images pour présenter votre service (formats JPG, PNG)
              </p>
            </div>
            {formData.images.length > 0 && (
              <div className="image-preview-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview-item">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt={`Aperçu ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="image-remove-btn"
                      onClick={() => removeImage(index)}
                      aria-label="Supprimer l'image"
                    >
                      ×
                    </button>
                    <span className="image-name">{image.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h3 className="section-title">Forfaits de service</h3>
          <div className="packages-grid">
            {renderPackageForm("basic")}
            {renderPackageForm("standard")}
            {renderPackageForm("premium")}
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline">
              Enregistrer comme brouillon
            </button>
            <button type="submit" className="btn btn-primary">
              Publier le service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
