import React from "react";
import styles from "./Button.module.css";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  icon?: string; 
}

const Button: React.FC<ButtonProps> = ({ children, size = "medium", icon, ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${icon ? styles.withIcon : ""}`}
      {...props}
    >
      {icon && <img src={icon} alt="Icon" className={styles.icon} />}
      {children}
    </button>
  );
};

export default Button;
