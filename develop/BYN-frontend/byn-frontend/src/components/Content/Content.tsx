import React from 'react';
import styles from './Content.module.css';

interface CardProps {
  children: React.ReactNode;
  bordered?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Content: React.FC<CardProps> = ({
  children,
  bordered = false,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  backgroundColor = 'transparent',
  shadow = false,
  hoverable = false,
  onClick,
  style = {},
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor,
    border: bordered ? `1px solid ${borderColor}` : 'none',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: shadow ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    transition: hoverable ? 'transform 0.2s, box-shadow 0.2s' : undefined,
    ...style,
  };

  const hoverClass = hoverable ? styles.hoverable : '';

  return (
    <div
      className={`${styles.container} ${hoverClass}`}
      style={cardStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
