import React from 'react';
import './Switch.css';

interface SwitchProps {
  selectedOption: string;
  onChange: (value: string) => void;
  disableChooseRole?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ selectedOption, onChange, disableChooseRole }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          disabled={disableChooseRole} 
        />
        <span className="slider"></span>
      </label>
      
      <span className="option-label">Entrenador</span>
    </div>
  );
};

export default Switch;
