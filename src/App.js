import React from 'react';
import './index.css';

import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AIAgent from './components/AIAgent'; // ¡Añadido aquí!
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <AIAgent /> {/* ¡Renderizado aquí! */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;