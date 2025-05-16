import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EtapesNavbar.css';
const EtapesNavbar = ({ currentStep, steps, exitPath = '/' }) => {
  const navigate = useNavigate();

  return (
    <div className="etapes-navbar-container">
      <div className="etapes-navbar-steps">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className="etape"
              onClick={() => navigate(step.path)}
            >
              <div className={`step-circle ${currentStep === step.label ? 'active' : ''}`}>
                {index + 1}
              </div>
              <span className={`step-label ${currentStep === step.label ? 'active' : ''}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <span className="chevron">{'>'}</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="exit-button" onClick={() => navigate(exitPath)}>
        Exit
      </div>
    </div>
  );
};

export default EtapesNavbar;
