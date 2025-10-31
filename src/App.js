import React from 'react';
import './App.css';

// Import des composants
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero/Hero'; 
import About from './components/sections/About/About';
import Services from './components/sections/Services/Services';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        {/* Autres sections */}
      </main>
    </div>
  );
}

export default App;