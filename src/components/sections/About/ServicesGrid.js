import React from 'react';
import ServiceCard from './ServiceCard';

/**
 * Composant pour la grille des services
 */
const ServicesGrid = ({ servicesData, uploadedImages, handleImageUpload }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {servicesData.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          uploadedImages={uploadedImages}
          handleImageUpload={handleImageUpload}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;