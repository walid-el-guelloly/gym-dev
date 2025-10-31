import React from 'react';

/**
 * Composant pour l'en-tête avec titre, description et bouton
 */
const AboutHeader = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-16">
      {/* Titre principal */}
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
        Every day is a chance to become better
      </h1>

      {/* Paragraphes de description */}
      <div className="space-y-6 mb-10">
        <p className="text-xl text-gray-300 leading-relaxed">
          In our gym, every session is a chance to push your limits. We
          don't chase perfection — we build discipline. Together, we turn
          effort into results and motivation into habit. Join us and make
          self-improvement your daily routine.
        </p>
      </div>

      {/* Bouton Schedule Workout */}
      <button
        onClick={() =>
          document
            .getElementById("contact")
            .scrollIntoView({ behavior: "smooth" })
        }
        className="bg-transparent border-2 border-white text-white px-12 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        Schedule workout
      </button>
    </div>
  );
};

export default AboutHeader;