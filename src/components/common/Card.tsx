import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  gradient?: {
    from: string;
    to: string;
    direction?: 'r' | 'l' | 't' | 'b' | 'tr' | 'tl' | 'br' | 'bl';
  };
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  gradient,
  border = true,
}) => {
  const direction = gradient?.direction || 'r';
  
  const gradientClasses = gradient 
    ? `bg-gradient-to-${direction} from-${gradient.from} to-${gradient.to}` 
    : 'bg-white dark:bg-gray-800';
  
  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer' 
    : '';
  
  const borderClasses = border && !gradient
    ? 'border border-gray-200 dark:border-gray-700'
    : '';

  return (
    <div
      className={`
        rounded-2xl shadow-lg ${gradientClasses} ${hoverClasses} ${borderClasses} 
        transition-colors duration-300 ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;