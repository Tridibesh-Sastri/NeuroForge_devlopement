import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  gradientFrom?: string;
  gradientTo?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  gradientFrom,
  gradientTo,
}) => {
  // Default gradient colors based on variant
  const getGradientClasses = () => {
    if (gradientFrom && gradientTo) {
      return `from-${gradientFrom} to-${gradientTo}`;
    }
    
    switch (variant) {
      case 'primary':
        return 'from-blue-600 to-purple-600';
      case 'secondary':
        return 'from-gray-500 to-gray-700';
      case 'success':
        return 'from-green-400 to-blue-500';
      case 'warning':
        return 'from-yellow-400 to-orange-500';
      case 'danger':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-blue-600 to-purple-600';
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Non-gradient button styles
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    success: 'bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-500',
  };

  const baseClasses = `
    font-medium rounded-xl transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:scale-[1.02]'}
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
  `;

  // Return gradient or solid color button based on variant
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variant === 'primary' 
          ? `bg-gradient-to-r ${getGradientClasses()} text-white` 
          : variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;