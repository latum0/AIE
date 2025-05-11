import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServicesContext } from '../context/ServicesContext';
import './ServiceForm.css';

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addService, updateService, getServiceById } = useContext(ServicesContext);
  const isEditMode = !!id;
  
  const initialFormState = {
    title: '',
    description: '',
    price: '',
    category: '',
    deliveryTime: '',
    image: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      const service = getServiceById(id);
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          price: service.price,
          category: service.category,
          deliveryTime: service.deliveryTime,
          image: service.image
        });
      } else {
        navigate('/freelancer/services');
      }
    }
  }, [id, isEditMode, getServiceById, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Veuillez entrer un prix valide';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'La catégorie est requise';
    }
    
    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = 'Le temps de livraison est requis';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'L\'URL de l\'image est requise';
    }
    
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
        price: Number(formData.price)
      };
      
      if (isEditMode) {
        updateService(Number(id), serviceData);
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
  
  // Options de catégorie
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
  
  // Options de temps de livraison
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
              placeholder="Ex. : Développement Web Professionnel"
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className={`form-control ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre service en détail..."
            ></textarea>
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">Prix (€)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                step="0.01"
                className={`form-control ${errors.price ? 'error' : ''}`}
                value={formData.price}
                onChange={handleChange}
                placeholder="29.99"
              />
              {errors.price && <div className="error-message">{errors.price}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category" className="form-label">Catégorie</label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Sélectionner une Catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <div className="error-message">{errors.category}</div>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deliveryTime" className="form-label">Temps de Livraison</label>
              <select
                id="deliveryTime"
                name="deliveryTime"
                className={`form-control ${errors.deliveryTime ? 'error' : ''}`}
                value={formData.deliveryTime}
                onChange={handleChange}
              >
                <option value="">Sélectionner le Temps de Livraison</option>
                {deliveryTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.deliveryTime && <div className="error-message">{errors.deliveryTime}</div>}
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
          </div>
          
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Aperçu du Service" />
            </div>
          )}
          
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
              {isSubmitting ? 'Enregistrement...' : isEditMode ? 'Mettre à jour le Service' : 'Créer le Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
