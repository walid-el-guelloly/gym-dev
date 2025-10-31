import React from 'react';

/**
 * Composant Button réutilisable
 * @param {string} variant - Type de bouton ('primary' | 'secondary')
 * @param {string} children - Texte du bouton
 * @param {function} onClick - Fonction au clic
 */
const Button = ({ variant = 'primary', children, onClick, className = '' }) => {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'border-2 border-white text-white hover:bg-white hover:text-gray-900 focus:ring-white'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;