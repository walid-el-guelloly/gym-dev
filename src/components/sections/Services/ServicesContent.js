import React from 'react';
import PricingGrid from './PricingGrid';

/**
 * Composant pour le contenu principal (texte + pricing)
 */
const ServicesContent = ({ pricingData }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-12 max-w-7xl mx-auto mb-16 text-left">
      {/* Colonne de gauche - Contenu texte */}
      <div className="flex-1 space-y-8">
        {/* Titre déplacé ici */}
        <h2 className="text-3xl md:text-4xl text-red-300 font-bold mb-12 leading-tight">
          Fitness has never been so much fun
        </h2>
        
        {/* Section Description */}
        <div className="space-y-6">
          {/* Premier point avec check */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Pose yourself in a comfortable and balanced...
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Take action and move forward. Go forward with determination.
                The setup is comfortable and well-structured, without being
                restrictive. The arrangement is comfortable and
                well-organized...
              </p>
            </div>
          </div>

          {/* Deuxième point avec check */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Structured training creates effective results.
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The structure is comfortable and well-organized, not overly
                strict. Various flexible elements provide a solid foundation
                for your fitness journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne de droite - Pricing */}
      <div className="flex-1 space-y-8">
        <PricingGrid pricingData={pricingData} />
      </div>
    </div>
  );
};

export default ServicesContent;