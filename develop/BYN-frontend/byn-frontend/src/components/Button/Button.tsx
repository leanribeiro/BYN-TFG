import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  icon?: string;
  stylesCustom?: React.CSSProperties;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  icon,
  stylesCustom,
  isActive,
  ...props
}) => {
  const finalClassName = `
  ${styles.button}
  ${styles[size] || ""}
  ${icon ? styles.withIcon : ""}
  ${isActive ? styles.active : ""}
`.trim();

  return (
    <button className={finalClassName} style={stylesCustom} {...props}>
      {icon && <img src={icon} alt="Icon" className={styles.icon} />}
      {children}
    </button>
  );
};

export default Button;
