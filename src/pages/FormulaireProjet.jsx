import React from 'react';
import './FormulaireProjet.css';

import TitreProjet from '../components/ui/TitreProjet';
import DescriptionProjet from '../components/ui/DescriptionProjet';
import UploadFichier from '../components/ui/UploadFichier';
import SelectCategorie from '../components/ui/SelectCategorie';
import BoutonContinuer from '../components/ui/BoutonContinuer';
import EtapesNavbar from '../components/ui/EtapesNavbar';
import FreelancerNotice from '../components/ui/FreelancerNotice';

const FormulaireProjet = () => {
  return (
    <div>
     <EtapesNavbar
  currentStep="Briefly describe your project"
  steps={[
    { label: "Briefly describe your project", path: "/FormulaireProjet" },
    { label: "Add a timeline and budget", path: "/AddTimelineAndBudget" },
  ]}
/>
      <div className="formulaire-projet">
        <FreelancerNotice language="en" />
        <TitreProjet />
        <DescriptionProjet />
        <UploadFichier />
        <SelectCategorie />
        <BoutonContinuer />
      </div>
    </div>
  );
};

export default FormulaireProjet;
