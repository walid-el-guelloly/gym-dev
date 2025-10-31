import React from "react";

/**
 * Composant pour le background avec image et overlay
 */
const ServicesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image avec overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/backimgservices.avif)`,
        }}
      >
        {/* Overlay noir pour meilleure visibilité */}
        <div className="absolute inset-0 bg-black bg-opacity-85"></div>
      </div>
    </div>
  );
};

export default ServicesBackground;
