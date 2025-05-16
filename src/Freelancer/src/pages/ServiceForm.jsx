import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServicesContext } from '../context/ServicesContext';
import './ServiceForm.css';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addService, updateService, getServiceById, loading } = useContext(ServicesContext);
  const isEditMode = !!id;
  
  const initialFormState = {
    title: '',
    description: '',
    price: '',
    category: '',
    deliveryTime: '',
    imageFile: null,
    imagePreview: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  
  useEffect(() => {
    if (isEditMode && !loading) {
      const fetchServiceData = async () => {
        try {
          const service = await getServiceById(id);
          if (service) {
            setFormData({
              title: service.title,
              description: service.description,
              price: service.price.toString(),
              category: service.category,
              deliveryTime: service.deliveryTime,
              imageFile: null,
              imagePreview: service.image
            });
          } else {
            navigate('/freelancer/services', { replace: true });
          }
        } catch (error) {
          console.error("Error fetching service:", error);
          navigate('/freelancer/services', { replace: true });
        }
      };
      
      fetchServiceData();
    }
  }, [id, isEditMode, getServiceById, navigate, loading]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    if (apiError) setApiError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Le titre doit contenir au moins 5 caractères';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'La description doit contenir au moins 20 caractères';
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Veuillez entrer un prix valide';
    }
    
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    
    if (!formData.deliveryTime) {
      newErrors.deliveryTime = 'Le temps de livraison est requis';
    }
    
    // Validation de l'image seulement en mode création
    if (!isEditMode && !formData.imageFile) {
      newErrors.image = 'Une image est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError('');
    
    try {
      const serviceData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        deliveryTime: formData.deliveryTime,
        imageFile: formData.imageFile
      };
      
      if (isEditMode) {
        await updateService(id, serviceData);
      } else {
        await addService(serviceData);
      }
      
      navigate('/freelancer/services');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du service :', error);
      setApiError(error.message || 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const categories = [
    'Développement',
    'Design',
    'Rédaction',
    'Marketing',
    'Traduction',
    'Vidéo & Animation',
    'Musique & Audio',
    'Affaires',
    'Autre'
  ];
  
  const deliveryTimes = [
    '1 jour',
    '2 jours',
    '3 jours',
    '5 jours',
    '7 jours',
    '14 jours',
    '30 jours'
  ];
  
  return (
    <div className="service-form-page">
      <div className="card service-form-card">
        <h2>{isEditMode ? 'Modifier le Service' : 'Créer un Nouveau Service'}</h2>
        
        {apiError && (
          <div className="alert alert-danger">
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="service-form" noValidate>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Titre du Service *</label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex. : Développement Web Professionnel"
              disabled={isSubmitting}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre service en détail..."
              disabled={isSubmitting}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">Prix (€) *</label>
              <div className="input-group">
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="1"
                  step="0.01"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="29.99"
                  disabled={isSubmitting}
                />
                <span className="input-group-text">€</span>
              </div>
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category" className="form-label">Catégorie *</label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Sélectionner une Catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deliveryTime" className="form-label">Temps de Livraison *</label>
              <select
                id="deliveryTime"
                name="deliveryTime"
                className={`form-control ${errors.deliveryTime ? 'is-invalid' : ''}`}
                value={formData.deliveryTime}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Sélectionner le Temps de Livraison</option>
                {deliveryTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.deliveryTime && <div className="invalid-feedback">{errors.deliveryTime}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                {isEditMode ? 'Modifier l\'image (optionnel)' : 'Image du Service *'}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                onChange={handleImageChange}
                accept="image/*"
                disabled={isSubmitting}
              />
              {errors.image && <div className="invalid-feedback">{errors.image}</div>}
            </div>
          </div>
          
          {(formData.imagePreview || (isEditMode && !formData.imageFile)) && (
            <div className="image-preview mb-3">
              <img 
                src={formData.imagePreview} 
                alt="Aperçu du Service" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Non+Disponible';
                }}
              />
              <div className="image-preview-label">Aperçu de l'image</div>
            </div>
          )}
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/freelancer/services')}
              disabled={isSubmitting}
            >
              Annuler
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {isEditMode ? 'Mise à jour...' : 'Création...'}
                </>
              ) : isEditMode ? 'Mettre à jour le Service' : 'Créer le Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;