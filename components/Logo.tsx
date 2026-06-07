
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 md:w-6 md:h-6',
    md: 'w-8 h-8 md:w-10 md:h-10',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 md:w-32 md:h-32',
    '2xl': 'w-32 h-32 md:w-48 md:h-48'
  };

  return (
    <div className={`text-academic-accent dark:text-stone-100 transition-colors duration-500 ${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
      >
        {/* Architectural Base */}
        <path d="M20 80L80 80" stroke="currentColor" strokeWidth="4" />
        
        {/* Pillars */}
        <rect x="28" y="30" width="8" height="50" fill="currentColor" />
        <rect x="46" y="30" width="8" height="50" fill="currentColor" />
        <rect x="64" y="30" width="8" height="50" fill="currentColor" />
        
        {/* Entablature / Top Structure */}
        <rect x="20" y="20" width="60" height="10" stroke="currentColor" strokeWidth="3" />
        <rect x="25" y="15" width="50" height="5" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
};

export default Logo;
