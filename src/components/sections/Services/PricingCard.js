import React from 'react';

/**
 * Composant Pricing Card avec hover effects
 */
const PricingCard = ({ plan }) => {
  return (
    <div
      className={`
      relative bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-500 transform 
      hover:scale-105 hover:shadow-2xl cursor-pointer group
      ${
        plan.isPopular
          ? "border-red-600"
          : "border-gray-600 hover:border-red-500"
      }
    `}
    >
      {/* Badge populaire */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {/* En-tête du plan */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          <span className="text-gray-400">{plan.period}</span>
        </div>
      </div>

      {/* Liste des features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <svg
              className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Bouton d'action */}
      <button
        className={`
        w-full py-3 rounded-lg font-semibold transition-all duration-300 transform
        group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${
          plan.isPopular
            ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
            : "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500"
        }
      `}
      >
        {plan.buttonText}
      </button>

      {/* Effet de glow au hover */}
      <div className="absolute inset-0 rounded-2xl bg-red-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default PricingCard;