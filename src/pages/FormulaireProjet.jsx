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
      <EtapesNavbar currentStep="Décrivez brièvement votre projet" />
      <div className="formulaire-projet">
      <FreelancerNotice language="fr" />
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
