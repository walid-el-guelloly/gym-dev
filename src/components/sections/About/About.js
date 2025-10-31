import React, { useState } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaUsers, FaUserTie } from "react-icons/fa";

// Import des sous-composants
import AboutBackground from './AboutBackground';
import AboutHeader from './AboutHeader';
import ServicesGrid from './ServicesGrid';

/**
 * Section About Us principale - Composant refactorisé
 * Maintenant divisé en composants réutilisables
 */
const About = () => {
  // State pour gérer les images uploadées
  const [uploadedImages, setUploadedImages] = useState({
    modernEquipment: null,
    groupTraining: null,
    personalTraining: null,
  });

  /**
   * Gestionnaire d'upload d'image
   */
  const handleImageUpload = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages((prev) => ({
          ...prev,
          [key]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Données des services avec icônes
   */
  const servicesData = [
    {
      id: "modernEquipment",
      title: "Modern Equipment",
      features: ["Individual Approach", "Expert Coaches"],
      icon: <GiWeightLiftingUp className="text-yellow-400" />,
      defaultImage:
        "https://southsidegym.ie/wp-content/uploads/2022/05/Untitled-design-2_11zon.jpg",
    },
    {
      id: "groupTraining",
      title: "Group Training",
      description: "Together, we grow stronger.",
      icon: <FaUsers className="text-gray-300" />,
      defaultImage:
        "https://www.wenzelcoaching.com/wp-content/uploads/2018/10/group-holding-plank.jpg",
    },
    {
      id: "personalTraining",
      title: "Personal Trainings",
      description:
        "Get one-on-one coaching tailored to your goals and fitness level.",
      icon: <FaUserTie className="text-yellow-400" />,
      defaultImage:
        "https://plus.unsplash.com/premium_photo-1663050901483-ee8703cc8372?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uYWwlMjB0cmFpbmVyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background avec dégradé et overlay */}
      <AboutBackground />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête avec titre et bouton */}
        <AboutHeader />

        {/* Grille des services */}
        <ServicesGrid 
          servicesData={servicesData}
          uploadedImages={uploadedImages}
          handleImageUpload={handleImageUpload}
        />

      </div>
    </section>
  );
};

export default About;