import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import { ArrowLeft } from 'lucide-react';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="back-button"
    >
      <ArrowLeft />
      Volver
    </button>
  );
};
