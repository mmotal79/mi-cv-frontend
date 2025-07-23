import React from 'react';
import './index.css';

import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AIAgent from './components/AIAgent'; // ¡Añadido aquí!
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header.js';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
	<Header /> {/* Agrega el Header aquí, antes de todas las secciones */}
    <main>
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <section id="ia-agent" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <AIAgent /> {/* Solo una instancia de AIAgent aquí */}
          </div>
        </section>
    </main>
	<Contact />	
    <Footer />
    </div>
  );
}

export default App;