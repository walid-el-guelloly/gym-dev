import { useState, useEffect } from 'react';

/**
 * Utilitaires pour la gestion du temps
 */

/**
 * Convertit un timestamp ISO en temps relatif (ex: "Il y a 5 min")
 */
export const getRelativeTime = (isoDate) => {
  if (!isoDate) return 'À l\'instant';
  
  const now = new Date();
  const date = new Date(isoDate);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'À l\'instant';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} min`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Il y a ${diffInDays}j`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `Il y a ${diffInWeeks} sem`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Il y a ${diffInMonths} mois`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `Il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
};

/**
 * Hook React pour mettre à jour automatiquement le temps relatif
 */
export const useRelativeTime = (isoDate, intervalMs = 60000) => {
  const [relativeTime, setRelativeTime] = useState(() => getRelativeTime(isoDate));
  
  useEffect(() => {
    const updateTime = () => {
      setRelativeTime(getRelativeTime(isoDate));
    };
    
    const interval = setInterval(updateTime, intervalMs);
    return () => clearInterval(interval);
  }, [isoDate, intervalMs]);
  
  return relativeTime;
};
