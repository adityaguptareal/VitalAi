import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors ';
  
  const variants = {
    primary: 'font-inter bg-primary text-white hover:bg-secondary rounded-xl',
    secondary: 'font-inter bg-secondary text-white hover:bg-primary rounded-xl',
    outline: 'font-inter border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl',
    withoutOutline: 'font-inter border-1 shadow-md  border-primary text-primary hover:bg-primary hover:text-white rounded-xl',
    danger: 'font-inter bg-danger text-white hover:bg-opacity-90 rounded-xl',
    warning: 'font-inter bg-warning text-grey hover:bg-opacity-90  rounded-xl',
    info: 'font-inter bg-info text-white hover:bg-opacity-90  rounded-xl',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-3 py-1.5 text-base',
    large: 'px-4 py-2 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    disabledStyles,
    className,
  ].join(' ');

  return (
    <button
      type={type}
      className={`${buttonClasses} flex gap-1`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;