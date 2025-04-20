import React from 'react';
import styles from './styles.module.css';
import { InputTextProps } from './types';


const InputText: React.FC<InputTextProps> = (props) => {

  const { type,
    name,
    placeholder,
    value,
    onChange,
    required,
    hasLabel = false, 
    labelText = '',
    canPaste = true } = props;
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if(!canPaste) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className={styles.inputContainer}>
      {hasLabel && <label className={styles.label} htmlFor={name}>{labelText}</label>}
      <input
        className={styles.inputText}
        type={type}
        name={name}
        id={name} 
        placeholder={placeholder}
        value={value}
        onPaste={handlePaste} 
        onChange={onChange}
        required={required}
        autoComplete="off"
      />
    </div>
  );
};

export default InputText;
