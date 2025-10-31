import React from 'react';

/**
 * Composant pour une carte de service individuelle
 */
const ServiceCard = ({ service, uploadedImages, handleImageUpload }) => {
  return (
    <div className="flex-1 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300 group">
      {/* En-tête avec icône et titre */}
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-4">{service.icon}</span>
        <h3 className="text-2xl font-bold text-white">
          {service.title}
        </h3>
      </div>

      {/* Container Image avec effet flou et bouton upload discret */}
      <div className="relative mb-6 rounded-xl overflow-hidden">
        {/* Image avec filtre flou */}
        <img
          src={uploadedImages[service.id] || service.defaultImage}
          alt={service.title}
          className="w-full h-48 object-cover filter transition-all duration-500 group-hover:blur-0"
        />

        {/* Bouton upload discret en haut à droite */}
        <div className="absolute top-3 right-3">
          <input
            type="file"
            id={`image-upload-${service.id}`}
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(service.id, e)}
          />
          <label
            htmlFor={`image-upload-${service.id}`}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-70 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            title="Changer l'image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Contenu selon le type de service */}
      {service.id === "modernEquipment" ? (
        // Modern Equipment avec liste de features
        <ul className="space-y-3">
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-300 font-medium"
            >
              <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>
      ) : (
        // Autres services avec description
        <p className="text-gray-300 text-lg leading-relaxed">
          {service.description}
        </p>
      )}
    </div>
  );
};

export default ServiceCard;