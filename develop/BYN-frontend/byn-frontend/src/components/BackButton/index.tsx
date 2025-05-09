import React from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/icons/ArrowLeftIcon.svg';
import './BackButton.css';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="back-button"
    >
      <img
        src={Arrow}
        alt="Volver"
        className="back-button-icon"
      />
      Volver
    </button>
  );
};
