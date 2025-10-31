import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';

/**
 * Section Hero principale - Composant refactorisé
 * Maintenant beaucoup plus simple et maintenable
 */
const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Background avec image et overlay */}
      <HeroBackground />
      
      {/* Contenu principal (texte + boutons) */}
      <HeroContent />

      {/* Indicateur de scroll animé */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;