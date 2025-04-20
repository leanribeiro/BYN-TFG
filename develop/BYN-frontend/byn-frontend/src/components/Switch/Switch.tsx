import React from 'react';
import './Switch.css';

interface SwitchProps {
  selectedOption: string;
  onChange: (value: string) => void;
}

const Switch: React.FC<SwitchProps> = ({ selectedOption, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Cambiar entre 'entrenador' y 'cliente' basado en el estado del switch
    const newValue = event.target.checked ? 'ENTRENADOR' : 'CLIENTE';
    onChange(newValue);
  };

  return (
    <div className="switch-container">
      <span className="option-label">Cliente</span>
      
      <label className="switch">
        <input
          type="checkbox"
          checked={selectedOption === 'ENTRENADOR'}
          onChange={handleChange}
        />
        <span className="slider"></span>
      </label>
      
      <span className="option-label">Entrenador</span>
    </div>
  );
};

export default Switch;
