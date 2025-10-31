import React from 'react';
import Button from '../../ui/Button';

/**
 * Composant pour le contenu texte et boutons
 */
const HeroContent = () => {
  /**
   * Fonction pour scroller vers la section about
   */
  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container mx-auto px-6 text-center relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Titre principal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Make yourself{' '}
          <span className="text-red-600">stronger</span>
          <br />
          than your excuses
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
          Enhance your performance with precision and ease. Strong foundations 
          meet flexible solutions, creating balance and growth in every step.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="primary"
            onClick={handleLearnMore}
          >
            Learn more
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
          >
            Join Now
          </Button>
        </div>

      </div>
    </div>
  );
};

export default HeroContent;