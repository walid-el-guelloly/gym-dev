import React from 'react';
import ClassCard from './ClassCard';

/**
 * Composant pour la grille des classes
 */
const ClassesGrid = ({ classesData, uploadedImages, handleImageUpload }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {classesData.map((classItem) => (
        <ClassCard
          key={classItem.id}
          classItem={classItem}
          uploadedImages={uploadedImages}
          handleImageUpload={handleImageUpload}
        />
      ))}
    </div>
  );
};

export default ClassesGrid;