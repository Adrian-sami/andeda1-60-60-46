import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  animation?: 'float' | 'rotate-slow' | 'pulse-scale' | 'tech-glow' | 'zoom' | 'zoom-blink';
  [key: string]: any;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  icon: Icon, 
  className, 
  animation = 'zoom-blink',
  ...props 
}) => {
  const animationClass = `animate-${animation}`;
  
  return (
    <Icon 
      className={cn('icon-motion', animationClass, className)} 
      {...props} 
    />
  );
};

export default AnimatedIcon;