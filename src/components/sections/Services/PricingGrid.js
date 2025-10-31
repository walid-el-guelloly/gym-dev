import React from 'react';
import PricingCard from './PricingCard';

/**
 * Composant pour la grille des prix
 */
const PricingGrid = ({ pricingData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
      {pricingData.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default PricingGrid;