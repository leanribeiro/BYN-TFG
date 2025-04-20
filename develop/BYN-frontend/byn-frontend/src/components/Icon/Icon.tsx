import React from "react";

interface IconProps extends React.HTMLAttributes<HTMLImageElement | SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  src?: string;
  alt?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  src,
  alt = "icon",
  className,
  ...props
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    );
  }

  // SVG fallback
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* SVG de ejemplo */}
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export default Icon;
