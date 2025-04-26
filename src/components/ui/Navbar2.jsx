import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar2.css";
import logo from "../../assets/icons/logoMC.png";

export default function Navbar2() {
  const location = useLocation();
  const navigate = useNavigate();

  // State des étapes - exactement comme dans votre demande
  const [steps, setSteps] = useState([
    { number: 1, path: "/orderExtras", text: "Order Details", isActive: false },
    { number: 2, path: "/confirmP", text: "Confirm & Pay", isActive: false },
    { number: 3, path: "/submit", text: "Submit Requirements", isActive: false },
  ]);

  useEffect(() => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        isActive: location.pathname === step.path,
        isCompleted: steps.findIndex(s => s.path === location.pathname) > steps.findIndex(s => s.path === step.path)
      }))
    );
  }, [location.pathname]);

  const handleStepClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      {/* Logo à gauche */}
      <div className="navbar-logo">
        <img
          src={logo || "/placeholder.svg"}
          alt="Company Logo"
          className="logo-img"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Étapes parfaitement centrées */}
      <div className="navbar-steps-centered">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div
              className={`step ${step.isActive ? "active" : ""} ${step.isCompleted ? "completed" : ""}`}
              onClick={() => handleStepClick(step.path)}
              style={{ margin: '0 15px' }} // Ajustement horizontal
            >
              <div className="step-circle">{step.isCompleted ? "✓" : step.number}</div>
              <span className="step-text">{step.text}</span>
            </div>

            {index < steps.length - 1 && (
              <div className={`step-connector ${step.isCompleted ? "completed" : ""}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Div vide à droite pour l'équilibre */}
      <div className="navbar-right-spacer"></div>
    </nav>
  );
}