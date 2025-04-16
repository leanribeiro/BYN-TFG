import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({ children, size = "medium", ...props }) => {
  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
