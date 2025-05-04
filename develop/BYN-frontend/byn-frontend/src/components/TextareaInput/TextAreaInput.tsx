import React from 'react';
import styles from './TextAreaInput.module.css';

interface TextAreaInputProps {
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  hasLabel?: boolean;
  labelText?: string;
  placeholder?: string;
  styleCustom?: React.CSSProperties; 
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  name,
  value,
  onChange,
  required,
  hasLabel = false,
  labelText = '',
  placeholder = '',
  styleCustom = {}, 
}) => {
  return (
    <div className={styles.inputContainer}>
      {hasLabel && <label className={styles.label} htmlFor={name}>{labelText}</label>}
      <textarea
        className={styles.inputText}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        style={styleCustom}
      />
    </div>
  );
};

export default TextAreaInput;
