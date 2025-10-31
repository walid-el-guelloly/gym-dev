import React from 'react';

/**
 * Composant Class Card avec upload d'image
 */
const ClassCard = ({ classItem, uploadedImages, handleImageUpload }) => {
  return (
    <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-2xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 h-full flex flex-col border border-gray-700">
      {/* Container Image avec upload */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={uploadedImages[classItem.id] || classItem.defaultImage}
          alt={classItem.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay et bouton upload */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
          <div className="absolute top-3 right-3">
            <input
              type="file"
              id={`class-image-${classItem.id}`}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(classItem.id, e)}
            />
            <label
              htmlFor={`class-image-${classItem.id}`}
              className="bg-black bg-opacity-60 text-white p-2 rounded-full cursor-pointer hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              title="Change class image"
            >
              <svg
                className="w-4 h-4"
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
      </div>

      {/* Contenu de la classe */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3">{classItem.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          {classItem.description}
        </p>
      </div>
    </div>
  );
};

export default ClassCard;