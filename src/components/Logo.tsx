import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = false }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Image with transparent background */}
      <img 
        src="/lovable-uploads/29ebc4a4-c417-44e8-8077-e78d71b25ac7.png"
        alt="ANDEDA logo"
        className="h-32 md:h-28 lg:h-40 w-auto"
        loading="eager"
        decoding="async"
        width="512"
        height="512"
        sizes="(min-width: 1024px) 10rem, (min-width: 768px) 7rem, 8rem"
      />
    </div>
  );
};