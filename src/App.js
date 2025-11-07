import React, { useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Services from './components/sections/Services/Services';
import Store from './components/sections/store/Store';
import StoreSection from './components/sections/store/StoreSection';
import Contact from './components/sections/Contact us/Contact';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';

/**
 * Application principale - SPA avec toutes les sections
 */
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showDashboard, setShowDashboard] = useState(false);

  React.useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Handler for 'Go to Shop' button
  const handleGoToShop = () => {
    if (window.history && typeof window.history.pushState === 'function') {
      window.history.pushState({}, '', '/shop');
      setCurrentPath('/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.location.href = '/shop';
    }
  };

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

  // Sinon, afficher la SPA avec routing
  return (
    <div className="App">
      {currentPath !== '/login' && (
        <Navbar 
          currentPath={currentPath}
          onDashboardClick={handleDashboardClick}
        />
      )}
      
      <main>
        {currentPath === '/shop' ? (
          <Store fullPage={true} />
        ) : currentPath === '/login' ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            {React.createElement(
              require('./components/sections/Login/login.js').default
            )}
          </React.Suspense>
        ) : (
          <>
            <section id="home">
              <Hero />
            </section>
            
            <section id="about">
              <About />
            </section>
            
            <section id="services">
              <Services />
            </section>
            
            <section id="store">
              <StoreSection onGoToShop={handleGoToShop} />
            </section>
            
            <section id="contact">
              <Contact />
            </section>
            
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
