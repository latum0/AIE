import React, { useState } from 'react';
import GigTitle from '../components/ui/GigTitle';
import CategorySelector from '../components/ui/CategorySelector';
import TagsInput from '../components/ui/TagsInput';
import './CreateGig.css';

const CreateGig = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Vue d\'ensemble',
    'Tarification',
    'Description & FAQ',
    'Exigences',
    'Galerie',
    'Publier',
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className="gig-wrapper">
      <div className="etapes-navbar-container">
        <div className="etapes-navbar-steps">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="etape" onClick={() => handleStepClick(index)}>
                <div className={`step-circle ${activeStep === index ? 'active' : ''}`}>
                  {index + 1}
                </div>
                <span className={`step-label ${activeStep === index ? 'active' : ''}`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && <span className="chevron">{'>'}</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="exit-button">Quitter</div>
      </div>

      <div className="gig-card">
        <GigTitle />
        <CategorySelector />
        <TagsInput />
        <div className="btn-save">
          <button>Enregistrer & Continuer</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;
