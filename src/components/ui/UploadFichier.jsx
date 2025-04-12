import React from 'react';
import './UploadFichier.css';
import { FaPaperclip } from 'react-icons/fa'; 

const UploadFichier = () => {
  return (
    <div className="upload-fichier">
      <label>
        <FaPaperclip className="icon" /> Joindre des fichiers
      </label><br />
      <input type="file" multiple />
    </div>
  );
};

export default UploadFichier;
