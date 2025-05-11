import React, { useState } from 'react';
import './SignUp.css';
import { Mail, Lock, Eye, EyeOff, Facebook, Github } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };

  const getStrengthLabel = (strength) => {
    if (strength === 0) return "";
    if (strength <= 2) return "Faible";
    if (strength <= 4) return "Moyen";
    return "Fort";
  };

  const getStrengthClass = (strength) => {
    if (strength === 0) return "";
    if (strength <= 2) return "weak";
    if (strength <= 4) return "medium";
    return "strong";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!validateEmail(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }
    
    if (password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Submit form logic would go here
      console.log("Form submitted:", { email, password, rememberMe });
    }
  };

  const passwordStrength = calculatePasswordStrength(password);
  const strengthLabel = getStrengthLabel(passwordStrength);
  const strengthClass = getStrengthClass(passwordStrength);

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="form-header">
          <h1>S'inscrire</h1>
          <p>Créez votre compte pour commencer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div className={`strength-indicator ${strengthClass}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
                </div>
                <span className={`strength-label ${strengthClass}`}>{strengthLabel}</span>
              </div>
            )}
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirmer votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
              />
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Se souvenir de moi</label>
          </div>

          <button type="submit" className="submit-button">S'inscrire</button>

          <div className="divider">
            <span>ou</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="google-button social-button">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continuer avec Google
            </button>
            <button type="button" className="facebook-button social-button">
              <Facebook className="social-icon" size={24} />
              Continuer avec Facebook
            </button>
          </div>
        </form>

        <div className="form-footer">
          <p>Vous avez déjà un compte? <a href="/login">Se connecter</a></p>
        </div>
      </div>

      <div className="signup-image">
        <div className="image-overlay">
          <div className="welcome-text">
            <h2>Bienvenue</h2>
            <p>Nous sommes ravis de vous avoir parmi nous!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;