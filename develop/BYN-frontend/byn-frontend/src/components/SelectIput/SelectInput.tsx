import React from 'react';
import styles from './SelectInput.module.css';

interface SelectInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  hasLabel?: boolean;
  labelText?: string;
  options: { label: string; value: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  value,
  onChange,
  required,
  hasLabel = false,
  labelText = '',
  options,
}) => {
  return (
    <div className={styles.inputContainer}>
      {hasLabel && <label className={styles.label} htmlFor={name}>{labelText}</label>}
      <select
        className={styles.inputText}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>Selecciona</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
