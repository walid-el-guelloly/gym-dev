import React from "react";

/**
 * Composant pour le background avec image et overlay
 */
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/backimage.jpg')`,
        }}
      >
        {/* Overlay sombre pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
    </div>
  );
};

export default HeroBackground;
