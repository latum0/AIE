"use client"

import { useState, useContext, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ServicesContext } from "../context/ServicesContext"
import "./ServiceForm.css"

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addService, updateService, getServiceById } = useContext(ServicesContext);
  const isEditMode = !!id;

  const initialFormState = {
    title: '',
    image: '',
    packages: {
      basic: {
        name: 'Basique',
        price: 0,
        description: '',
        deliveryTime: '',
        concepts: '1 concept',
        includedServices: [],
        features: {
          logoTransparency: false,
          vectorFile: false,
          printableFile: false,
          mockup3D: false,
          sourceFile: false,
          stationeryDesigns: false,
          socialMediaKit: false
        }
      },
      standard: {
        name: 'Standard',
        price: 0,
        description: '',
        deliveryTime: '',
        concepts: '2 concepts',
        includedServices: [],
        features: {
          logoTransparency: false,
          vectorFile: false,
          printableFile: false,
          mockup3D: false,
          sourceFile: false,
          stationeryDesigns: false,
          socialMediaKit: false
        }
      },
      premium: {
        name: 'Premium',
        price: 0,
        description: '',
        deliveryTime: '',
        concepts: '3 concepts',
        includedServices: [],
        features: {
          logoTransparency: false,
          vectorFile: false,
          printableFile: false,
          mockup3D: false,
          sourceFile: false,
          stationeryDesigns: false,
          socialMediaKit: false
        }
      }
    }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryTimes = ['1 jour', '2 jours', '3 jours', '5 jours', '7 jours', '14 jours'];
  const conceptOptions = ['1 concept', '2 concepts', '3 concepts', 'Illimité'];

  useEffect(() => {
    if (isEditMode) {
      const service = getServiceById(id);
      if (service) {
        setFormData({
          title: service.title,
          image: service.image || '',
          packages: service.packages || initialFormState.packages
        });
      } else {
        navigate('/freelancer/services');
      }
    }
  }, [id, isEditMode, getServiceById, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('packages.')) {
      const [, pkgKey, field, feature] = name.split('.');
      
      if (feature) {
        // Handle feature checkbox changes
        setFormData(prev => ({
          ...prev,
          packages: {
            ...prev.packages,
            [pkgKey]: {
              ...prev.packages[pkgKey],
              features: {
                ...prev.packages[pkgKey].features,
                [feature]: checked
              }
            }
          }
        }));
      } else {
        // Handle other package fields
        setFormData(prev => ({
          ...prev,
          packages: {
            ...prev.packages,
            [pkgKey]: {
              ...prev.packages[pkgKey],
              [field]: type === 'number' ? Number(value) : value
            }
          }
        }));
      }
    } else {
      // Handle top-level fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    // Validate packages
    Object.entries(formData.packages).forEach(([pkgName, pkg]) => {
      if (pkg.price <= 0) {
        newErrors[`${pkgName}_price`] = 'Le prix doit être supérieur à 0';
      }
      if (!pkg.description.trim()) {
        newErrors[`${pkgName}_description`] = 'La description est requise';
      }
      if (!pkg.deliveryTime) {
        newErrors[`${pkgName}_deliveryTime`] = 'Le temps de livraison est requis';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const serviceData = {
        ...formData,
        rating: 0,
        createdAt: isEditMode ? formData.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (isEditMode) {
        updateService(id, serviceData);
      } else {
        addService(serviceData);
      }
      
      navigate('/freelancer/services');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du service :', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-page">
      <div className="card service-form-card">
        <h1>Portée & Tarification</h1>
        <h2>{isEditMode ? 'Modifier le Service' : 'Créer un Nouveau Service'}</h2>
        
        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Titre du Service</label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-control ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={handleChange}
              placeholder="Donnez un titre accrocheur à votre service"
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
            <p className="hint">
              Exemple : Conception de logo professionnel, Couverture 2D/3D, Version prête à imprimer
            </p>
          </div>
          
          <div className="form-group">
            <label htmlFor="image" className="form-label">URL de l'Image</label>
            <input
              type="text"
              id="image"
              name="image"
              className={`form-control ${errors.image ? 'error' : ''}`}
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <div className="error-message">{errors.image}</div>}
          </div>
          
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Aperçu du Service" />
            </div>
          )}

          <h3>Packages</h3>
          
          <div className="packages-grid">
            {Object.entries(formData.packages).map(([pkgKey, pkg]) => (
              <div key={pkgKey} className="package-column">
                <div className="form-group">
                  <label htmlFor={`${pkgKey}-name`}>Nom du Package</label>
                  <input
                    type="text"
                    id={`${pkgKey}-name`}
                    name={`packages.${pkgKey}.name`}
                    className="form-control"
                    value={pkg.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`${pkgKey}-description`}>Description</label>
                  <textarea
                    id={`${pkgKey}-description`}
                    name={`packages.${pkgKey}.description`}
                    className={`form-control ${errors[`${pkgKey}_description`] ? 'error' : ''}`}
                    value={pkg.description}
                    onChange={handleChange}
                    placeholder="Décrivez en détail ce que comprend ce package"
                  />
                  {errors[`${pkgKey}_description`] && (
                    <div className="error-message">{errors[`${pkgKey}_description`]}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor={`${pkgKey}-price`}>Prix (DA)</label>
                  <input
                    type="number"
                    id={`${pkgKey}-price`}
                    name={`packages.${pkgKey}.price`}
                    min="0"
                    step="1"
                    className={`form-control ${errors[`${pkgKey}_price`] ? 'error' : ''}`}
                    value={pkg.price}
                    onChange={handleChange}
                  />
                  {errors[`${pkgKey}_price`] && (
                    <div className="error-message">{errors[`${pkgKey}_price`]}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3>Révisions</h3>
          
          <div className="features-table">
            <div className="table-row header">
              <div className="table-cell">Fonctionnalités</div>
              <div className="table-cell">Basique</div>
              <div className="table-cell">Standard</div>
              <div className="table-cell">Premium</div>
            </div>
            
            <div className="table-row">
              <div className="table-cell">Temps de livraison</div>
              {Object.entries(formData.packages).map(([pkgKey, pkg]) => (
                <div key={`${pkgKey}-delivery`} className="table-cell">
                  <select
                    name={`packages.${pkgKey}.deliveryTime`}
                    className={`form-control ${errors[`${pkgKey}_deliveryTime`] ? 'error' : ''}`}
                    value={pkg.deliveryTime}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner</option>
                    {deliveryTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors[`${pkgKey}_deliveryTime`] && (
                    <div className="error-message">{errors[`${pkgKey}_deliveryTime`]}</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="table-row">
              <div className="table-cell">Nombre de concepts inclus</div>
              {Object.entries(formData.packages).map(([pkgKey, pkg]) => (
                <div key={`${pkgKey}-concepts`} className="table-cell">
                  <select
                    name={`packages.${pkgKey}.concepts`}
                    className="form-control"
                    value={pkg.concepts}
                    onChange={handleChange}
                  >
                    {conceptOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            {[
              { id: 'logoTransparency', label: 'Transparence du logo' },
              { id: 'vectorFile', label: 'Fichier vectoriel' },
              { id: 'printableFile', label: 'Fichier imprimable' },
              { id: 'mockup3D', label: 'Maquette 3D' },
              { id: 'sourceFile', label: 'Fichier source' },
              { id: 'stationeryDesigns', label: 'Designs de papeterie' },
              { id: 'socialMediaKit', label: 'Kit réseaux sociaux' }
            ].map(feature => (
              <div key={feature.id} className="table-row">
                <div className="table-cell">{feature.label}</div>
                {Object.keys(formData.packages).map(pkgKey => (
                  <div key={`${pkgKey}-${feature.id}`} className="table-cell">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name={`packages.${pkgKey}.features.${feature.id}`}
                        checked={formData.packages[pkgKey].features[feature.id]}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/freelancer/services')}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : isEditMode ? 'Mettre à jour' : 'Créer le Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;