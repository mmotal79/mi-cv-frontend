// src/components/HeroSection.js
import React, { useState, useEffect } from 'react';
import imagenPortada from '../assets/imagen-portada.jpg';
import imagenPerfil from '../assets/Miguel.jpg';

function HeroSection() {
  const fullText = 'Ingeniero y Project Manager experto en transformar ideas y sueños en software.';
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(prevIndex => prevIndex + 1);
      }, 50); // Velocidad de escritura (ms por carácter)
      return () => clearTimeout(timeoutId);
    } else if (index === fullText.length) {
      // Opcional: reiniciar la animación después de un tiempo si quieres un loop continuo
      // setTimeout(() => {
      //   setDisplayText('');
      //   setIndex(0);
      // }, 5000); // Espera 5 segundos antes de reiniciar
    }
  }, [index, fullText]);

  return (
    <section id="hero"
      className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 md:py-32 text-center shadow-lg
                 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imagenPortada})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10">
        <img
          src={imagenPerfil}
          alt="Miguel Mota"
          className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white shadow-xl"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down drop-shadow-lg">
          Miguel Mota
        </h1>
        <p className="text-xl md:text-3xl font-semibold mb-8 opacity-90 animate-fade-in-up drop-shadow-md">
          {displayText}
        </p>
        <a
          href="mailto:quierohablarteya@gmail.com"
          className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Contactar
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
