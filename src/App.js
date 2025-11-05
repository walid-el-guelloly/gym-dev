import React, { useState } from 'react';
import './App.css';

// Import des composants
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Services from './components/sections/Services/Services';
// import Store from './components/sections/Store'; // À créer
// import Pricing from './components/sections/Pricing'; // À créer
// import Contact from './components/sections/Contact'; // À créer
import Dashboard from './components/dashboard/Dashboard';

/**
 * Application principale - SPA avec toutes les sections
 */
function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  // Fonction pour ouvrir le dashboard
  const handleDashboardClick = () => {
    setShowDashboard(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fonction pour revenir à l'accueil
  const navigateToHome = () => {
    setShowDashboard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Si le dashboard est affiché, montrer seulement le dashboard
  if (showDashboard) {
    return <Dashboard onBackToHome={navigateToHome} />;
  }

  // Sinon, afficher la SPA normale
  return (
    <div className="App">
      <Navbar 
        onDashboardClick={handleDashboardClick}
      />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        {/* Sections à développer */}
        {/*
        <section id="store">
          <Store />
        </section>
        
        <section id="pricing">
          <Pricing />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
        */}
      </main>
    </div>
  );
}

export default App;