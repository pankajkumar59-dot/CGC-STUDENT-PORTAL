import React from 'react';

interface CgcLogoProps {
  className?: string;
  size?: number;
}

export const CgcLogo: React.FC<CgcLogoProps> = ({ className = 'h-8 w-auto', size = 34 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="CGC Mohali Emblem"
    >
      <defs>
        <linearGradient id="cgcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B365D" />
          <stop offset="100%" stopColor="#0F2537" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDB913" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="24" fill="url(#cgcGrad)" />
      {/* Graduation Cap & Open Book Emblem */}
      <path d="M50 24L78 37L50 50L22 37Z" fill="url(#goldGrad)" />
      <path
        d="M78 37V48C78 48 74 54 50 54C26 54 22 48 22 48V37"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Tassel */}
      <path
        d="M72 40V56M72 56C72 58 75 58 75 56"
        stroke="url(#goldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Open Book Base */}
      <path
        d="M28 62C38 60 46 63 50 67C54 63 62 60 72 62V78C62 76 54 79 50 83C46 79 38 76 28 78Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
      <path d="M50 67V83" stroke="#1B365D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="37" r="2.5" fill="#FFFFFF" />
    </svg>
  );
};
