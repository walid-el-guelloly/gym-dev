import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Services from "./components/sections/Services/Services";
import Store from "./components/sections/store/Store";
import Footer from "./components/layout/Footer.js";
import StoreSection from "./components/sections/store/StoreSection";
import Contact from "./components/sections/Contact us/Contact";
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
  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname
  );

  React.useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Handler for 'Go to Shop' button
  const handleGoToShop = () => {
    if (window.history && typeof window.history.pushState === "function") {
      window.history.pushState({}, "", "/shop");
      setCurrentPath("/shop");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      window.location.href = "/shop";
    }
  };

  return (
    <div className="App">
      {currentPath !== "/login" && <Navbar currentPath={currentPath} />}
      <main>
        {currentPath === "/shop" ? (
          <Store fullPage={true} />
        ) : currentPath === "/login" ? (
          // Dynamically import the login page
          <React.Suspense fallback={<div>Loading...</div>}>
            {React.createElement(
              require("./components/sections/Login/login.js").default
            )}
          </React.Suspense>
        ) : (
          <>
            <Hero />
            <About />
            <Services />
            <StoreSection onGoToShop={handleGoToShop} />
            <Contact />
            <Footer />
          </>
        )}
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
