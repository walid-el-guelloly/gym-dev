import React from 'react';
import './DarkMode.css';

/**
 * HOC pour ajouter des styles mode sombre aux composants existants
 */
export const withDarkModeStyles = (Component) => {
  return ({ isDarkMode = true, ...props }) => {
    // Ajouter des classes CSS globales pour le mode sombre
    React.useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }, [isDarkMode]);

    return (
      <div className={isDarkMode ? 'dark-mode-wrapper' : ''}>
        <Component {...props} isDarkMode={isDarkMode} />
      </div>
    );
  };
};

/**
 * Utilitaires pour les classes conditionnelles
 */
export const darkClass = (isDarkMode, darkClasses, lightClasses = '') => {
  return isDarkMode ? darkClasses : lightClasses;
};

export const cardClass = (isDarkMode) => {
  return isDarkMode
    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
    : 'bg-white border border-gray-200';
};

export const textClass = (isDarkMode, variant = 'primary') => {
  const variants = {
    primary: isDarkMode ? 'text-white' : 'text-gray-900',
    secondary: isDarkMode ? 'text-slate-400' : 'text-gray-600',
    muted: isDarkMode ? 'text-slate-500' : 'text-gray-500',
  };
  return variants[variant] || variants.primary;
};

export const inputClass = (isDarkMode) => {
  return isDarkMode
    ? 'bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20';
};

export const buttonClass = (isDarkMode, variant = 'primary') => {
  const variants = {
    primary: isDarkMode
      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/20'
      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
    secondary: isDarkMode
      ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 border border-slate-700/50'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200',
    danger: isDarkMode
      ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/20'
      : 'bg-red-600 hover:bg-red-700 text-white',
  };
  return variants[variant] || variants.primary;
};
