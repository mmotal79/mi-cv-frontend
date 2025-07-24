// src/Header.js
import React, { useState, useEffect } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el menú móvil
  const [isSticky, setIsSticky] = useState(false); // Estado para controlar si el menú es fijo

  // Función para manejar el scroll y hacer el menú fijo
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) { // Haz el menú sticky después de 100px de scroll
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavLinkClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // Cierra el menú móvil al hacer clic
  };

  return (
    <header className={`bg-gray-800 text-white p-4 shadow-lg ${isSticky ? 'fixed top-0 left-0 w-full z-50 animate-slide-down' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Nombre */}
        <a href="#hero" onClick={(e) => handleNavLinkClick(e, 'hero')} className="text-2xl font-bold hover:text-blue-400 transition duration-300">
          Miguel Mota
        </a>

        {/* Botón de hamburguesa para móviles */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>

        {/* Menú de navegación (Desktop) */}
        <nav className="hidden md:flex space-x-8">
		  <a href="#hero" onClick={(e) => handleNavLinkClick(e, 'hero')} className="hover:text-blue-400 transition duration-300 font-semibold">
            Inicio
 		  </a>
          <a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')} className="hover:text-blue-400 transition duration-300 font-semibold">
            Sobre Mí
          </a>
          <a href="#skills" onClick={(e) => handleNavLinkClick(e, 'skills')} className="hover:text-blue-400 transition duration-300 font-semibold">
            Habilidades
          </a>
          <a href="#experience" onClick={(e) => handleNavLinkClick(e, 'experience')} className="hover:text-blue-400 transition duration-300 font-semibold">
            Experiencia
          </a>
          <a href="#ia-agent" onClick={(e) => handleNavLinkClick(e, 'ai-agent')} className="hover:text-blue-400 transition duration-300 font-semibold">
            Agente IA
          </a>
          <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="hover:text-blue-400 transition duration-300 font-semibold">
            Contacto
          </a>
        </nav>
      </div>

      {/* Menú de navegación (Móvil) */}
      {isOpen && (
        <nav className="md:hidden bg-gray-700 mt-4 py-2">
          <ul className="flex flex-col items-center space-y-4">
		    <li>
              <a href="#hero" onClick={(e) => handleNavLinkClick(e, 'hero')} className="block py-2 hover:text-blue-400 transition duration-300 font-semibold">
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavLinkClick(e, 'about')} className="block py-2 hover:text-blue-400 transition duration-300 font-semibold">
                Sobre Mí
              </a>
            </li>
            <li>
              <a href="#skills" onClick={(e) => handleNavLinkClick(e, 'skills')} className="block py-2 hover:text-blue-400 transition duration-300 font-semibold">
                Habilidades
              </a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => handleNavLinkClick(e, 'experience')} className="block py-2 hover:text-blue-400 transition duration-300 font-semibold">
                Experiencia
              </a>
            </li>
            <li>
              <a href="#ia-agent" onClick={(e) => handleNavLinkClick(e, 'ai-agent')} className="block py-2 hover:text-blue-400 transition duration-300 font-semibold">
                Agente IA
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} className="block py-2 hover:text-blue-400 transition duration-300 font-semibold">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
