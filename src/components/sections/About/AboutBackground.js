import React from 'react';

/**
 * Composant pour le background avec dégradé et overlay
 */
const AboutBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dégradé de fond */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #111 60%, #b91c1c 100%)",
        }}
      >
        {/* Overlay pour l'effet de profondeur */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
    </div>
  );
};

export default AboutBackground;