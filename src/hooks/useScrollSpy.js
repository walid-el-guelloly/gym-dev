import { useState, useEffect } from 'react';

/**
 * Hook pour détecter la section active pendant le scroll
 * Mise à jour avec les nouvelles sections
 */
export const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Sections mises à jour selon la nouvelle navbar
    const sections = ['home', 'about', 'services', 'store', 'contact', 'pricing'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérification initiale

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeSection;
};