import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg transition-all duration-300 font-medium inline-flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed',
    secondary: 'bg-white text-[#2563EB] border-2 border-[#2563EB] hover:bg-[#EFF6FF] disabled:border-[#9CA3AF] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
    text: 'bg-transparent text-[#2563EB] hover:bg-[#EFF6FF] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
}
