import React, { useState } from "react";

// Import des sous-composants
import ServicesBackground from './ServicesBackground';
import ServicesContent from './ServicesContent';
import ServicesHeader from './ServicesHeader';
import ClassesGrid from './ClassesGrid';

/**
 * Section Services principale - Composant refactorisé
 * Maintenant divisé en composants réutilisables
 */
const Services = () => {
  // State pour les images uploadées des classes
  const [uploadedClassImages, setUploadedClassImages] = useState({
    cardio: null,
    weightTraining: null,
    boxing: null,
  });

  /**
   * Gestionnaire d'upload d'image pour les classes
   */
  const handleClassImageUpload = (classType, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedClassImages((prev) => ({
          ...prev,
          [classType]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Données des passes de prix
   */
  const pricingData = [
    {
      id: "month-pass",
      title: "Month Pass",
      price: "200DH",
      period: "/month",
      features: [
        "24 hours access",
        "Flexible classes",
        "Fitness assessment",
        "Personal trainer consultation",
        "Nutrition guidance",
      ],
      isPopular: true,
      buttonText: "Actif",
    },
    {
      id: "day-pass",
      title: "Day Pass",
      price: "25DH",
      period: "/day",
      features: [
        "24 hours access",
        "Flexible classes",
        "Basic equipment access",
      ],
      isPopular: false,
      buttonText: "Get Started",
    },
  ];

  /**
   * Données des classes
   */
  const classesData = [
    {
      id: "cardio",
      title: "Cardio workouts",
      description:
        "High-intensity cardio training for endurance and fat burning",
      defaultImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    },
    {
      id: "weightTraining",
      title: "Weight training",
      description:
        "Build strength and muscle with professional weight training",
      defaultImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    },
    {
      id: "boxing",
      title: "Boxing",
      description: "Learn boxing techniques and improve your reflexes",
      defaultImage:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background avec image et overlay */}
      <ServicesBackground />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Texte + Pricing */}
        <ServicesContent pricingData={pricingData} />

        {/* Section Classes */}
        <div className="max-w-7xl mx-auto">
          {/* En-tête des classes */}
          <ServicesHeader />

          {/* Grille des classes */}
          <ClassesGrid 
            classesData={classesData}
            uploadedImages={uploadedClassImages}
            handleImageUpload={handleClassImageUpload}
          />
        </div>

      </div>
    </section>
  );
};

export default Services;