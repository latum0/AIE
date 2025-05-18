"use client";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./EditGig.css";

export default function EditGig() {
  const navigate = useNavigate();
  const { userId, id } = useParams(); // id is the gig ID
  const accessToken = localStorage.getItem("accessToken");

  // State modeled after ServiceForm's state:
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [], // new images selected (array of { file, preview, name } objects)
    basic: {
      title: "",
      description: "",
      price: "",
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

  // Store the currently uploaded images (fetched from backend) so you can display them
  const [currentImages, setCurrentImages] = useState([]);

  // Fetch the gig details on mount
  const fetchGig = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gigs/${id}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      // Save current images (URLs) for preview
      setCurrentImages(data.images || []);
      
      // Map the fetched gig's packages to your formData structure.
      // Note: your Gig model only defines price, description, and includedServices.
      // For fields not stored (like package title, deliveryTime, revisions),
      // we fallback to empty strings.
      const mapPackage = (pkg) => ({
        title: pkg.title || "",          // may be empty if not provided
        description: pkg.description || "",
        price: pkg.price || "",
        deliveryTime: pkg.deliveryTime || "",
        revisions: pkg.revisions || "",
        includedServices:
          pkg.includedServices && pkg.includedServices.length > 0
            ? pkg.includedServices
            : [""],
      });

      setFormData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        images: [], // leave new image selection empty initially
        basic:
          data.packages && data.packages.basic
            ? mapPackage(data.packages.basic)
            : { title: "", description: "", price: "", deliveryTime: "", revisions: "", includedServices: [""] },
        standard:
          data.packages && data.packages.standard
            ? mapPackage(data.packages.standard)
            : { title: "", description: "", price: "", deliveryTime: "", revisions: "", includedServices: [""] },
        premium:
          data.packages && data.packages.premium
            ? mapPackage(data.packages.premium)
            : { title: "", description: "", price: "", deliveryTime: "", revisions: "", includedServices: [""] },
      });
    } catch (error) {
      console.error("Error fetching gig data:", error);
      alert("Erreur lors du chargement du gig.");
    }
  };

  useEffect(() => {
    fetchGig();
    // eslint-disable-next-line
  }, [id]);

  // Handlers for updating form data (similar to ServiceForm.jsx)
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePackageChange = (packageType, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        [field]: value,
      },
    }));
  };

  const handleServiceChange = (packageType, index, value) => {
    const newServices = [...formData[packageType].includedServices];
    newServices[index] = value;
    setFormData((prev) => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        includedServices: newServices,
      },
    }));
  };

  const addService = (packageType) => {
    setFormData((prev) => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        includedServices: [...prev[packageType].includedServices, ""],
      },
    }));
  };

  const removeService = (packageType, index) => {
    if (formData[packageType].includedServices.length === 1) return;
    const newServices = [...formData[packageType].includedServices];
    newServices.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        includedServices: newServices,
      },
    }));
  };

  // Handle file input for images for new uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Validate form (similar logic to ServiceForm)
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
    // Check that at least one image exists (either current images or newly uploaded ones)
    if (currentImages.length === 0 && formData.images.length < 1) {
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
    if (!validateForm()) return;

    try {
      // STEP 1: If there are new image files, upload them using axios.
      let uploadedImageUrls = [];
      if (formData.images.length > 0) {
        const imageFormData = new FormData();
        formData.images.forEach((img) => {
          imageFormData.append("file", img.file);
        });

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/upload",
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Assume response.data.urls is an array of URLs.
        uploadedImageUrls = uploadResponse.data.urls;
      }

      // Determine final images: if new images were uploaded, use them; otherwise, use the currentImages.
      const finalImages =
        uploadedImageUrls.length > 0 ? uploadedImageUrls : currentImages;

      // STEP 2: Prepare the payload with the right structure.
      const gigPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        packages: {
          basic: {
            title: formData.basic.title,
            description: formData.basic.description,
            price: Number(formData.basic.price),
            deliveryTime: formData.basic.deliveryTime,
            revisions: Number(formData.basic.revisions),
            includedServices: formData.basic.includedServices,
          },
          standard: {
            title: formData.standard.title,
            description: formData.standard.description,
            price: Number(formData.standard.price),
            deliveryTime: formData.standard.deliveryTime,
            revisions: Number(formData.standard.revisions),
            includedServices: formData.standard.includedServices,
          },
          premium: {
            title: formData.premium.title,
            description: formData.premium.description,
            price: Number(formData.premium.price),
            deliveryTime: formData.premium.deliveryTime,
            revisions: Number(formData.premium.revisions),
            includedServices: formData.premium.includedServices,
          },
        },
        images: finalImages,
      };

      // STEP 3: Make a PUT request to update the gig.
      const response = await axios.put(`http://localhost:5000/api/gigs/${id}`, gigPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Gig updated successfully:", response.data);
      alert("Gig mis à jour avec succès!");
      navigate(`/freelancer/${userId}/services`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du gig:", error);
      alert("Erreur lors de la mise à jour du gig. Veuillez réessayer.");
    }
  };

  return (
    <div className="editgig-page">
      <div className="editgig-card">
        <h1>Modifier le Gig</h1>
        <h2>Modifiez les détails de votre gig</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="gig-title">
              Titre du service
            </label>
            <input
              id="gig-title"
              className="form-control"
              type="text"
              placeholder="ex. Conception de logo professionnel"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="gig-description">
              Description du service
            </label>
            <textarea
              id="gig-description"
              className="form-control"
              placeholder="Décrivez votre service"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="gig-category">
              Catégorie
            </label>
            <select
              id="gig-category"
              className="form-control"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
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
                />
                <div className="image-upload-button">
                  <span>+ Ajouter des images</span>
                </div>
              </label>
              <p className="hint">
                Ajoutez jusqu'à 5 images pour présenter votre service (formats JPG, PNG)
              </p>
            </div>
            <div className="image-preview-container">
              {currentImages.length > 0 && (
                <div className="image-preview-item">
                  <img
                    src={currentImages[0]}
                    alt="Image actuelle"
                    className="current-image"
                  />
                  <span className="image-label">Image actuelle</span>
                </div>
              )}
              {formData.images.length > 0 &&
                formData.images.map((image, index) => (
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
          </div>

          <h3 className="section-title">Forfaits de service</h3>
          <div className="packages-grid">
            {["basic", "standard", "premium"].map((pkgType) => (
              <div key={pkgType} className="package-column">
                <h3 className="package-title">
                  {pkgType === "basic"
                    ? "Basique"
                    : pkgType === "standard"
                    ? "Standard"
                    : "Premium"}
                </h3>
                <div className="form-group">
                  <label className="form-label" htmlFor={`${pkgType}-title`}>
                    Titre du forfait
                  </label>
                  <input
                    id={`${pkgType}-title`}
                    className="form-control"
                    type="text"
                    placeholder={`Titre du forfait ${
                      pkgType === "basic"
                        ? "basique"
                        : pkgType === "standard"
                        ? "standard"
                        : "premium"
                    }`}
                    value={formData[pkgType].title}
                    onChange={(e) =>
                      handlePackageChange(pkgType, "title", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor={`${pkgType}-description`}>
                    Description du forfait
                  </label>
                  <textarea
                    id={`${pkgType}-description`}
                    className="form-control"
                    placeholder={`Décrivez ce qui est inclus dans votre forfait ${
                      pkgType === "basic"
                        ? "basique"
                        : pkgType === "standard"
                        ? "standard"
                        : "premium"
                    }`}
                    value={formData[pkgType].description}
                    onChange={(e) =>
                      handlePackageChange(pkgType, "description", e.target.value)
                    }
                    required
                  />
                  <p className="hint">
                    Soyez précis sur ce que les clients recevront
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor={`${pkgType}-price`}>
                    Prix (€)
                  </label>
                  <input
                    id={`${pkgType}-price`}
                    className="form-control"
                    type="number"
                    min="0"
                    placeholder="ex. 100"
                    value={formData[pkgType].price}
                    onChange={(e) =>
                      handlePackageChange(pkgType, "price", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label" htmlFor={`${pkgType}-delivery-time`}>
                      Délai de livraison (jours)
                    </label>
                    <input
                      id={`${pkgType}-delivery-time`}
                      className="form-control"
                      type="number"
                      min="1"
                      placeholder="ex. 3"
                      value={formData[pkgType].deliveryTime}
                      onChange={(e) =>
                        handlePackageChange(pkgType, "deliveryTime", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label className="form-label" htmlFor={`${pkgType}-revisions`}>
                      Nombre de révisions
                    </label>
                    <input
                      id={`${pkgType}-revisions`}
                      className="form-control"
                      type="number"
                      min="0"
                      placeholder="ex. 2"
                      value={formData[pkgType].revisions}
                      onChange={(e) =>
                        handlePackageChange(pkgType, "revisions", e.target.value)
                      }
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
                      onClick={() => addService(pkgType)}
                    >
                      + Ajouter
                    </button>
                  </div>
                  {formData[pkgType].includedServices.map((service, index) => (
                    <div key={index} className="inclusion-item">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={`Inclusion ${index + 1}`}
                        value={service}
                        onChange={(e) =>
                          handleServiceChange(pkgType, index, e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        className="btn-icon remove-inclusion"
                        onClick={() => removeService(pkgType, index)}
                        aria-label="Supprimer l'inclusion"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline btn-lg">
              Enregistrer comme brouillon
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              Mettre à jour le service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
