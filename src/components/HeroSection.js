// src/components/HeroSection.js
import React, { useState, useEffect, useRef } from 'react';
import imagenPortada from '../assets/imagen-portada.jpg';
import imagenPerfil from '../assets/Miguel.jpg';

function HeroSection() {
  const fullText = "Ingeniero y Project Manager experto en transformar ideas y sueños en software.";
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Observador para detectar si la sección está en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    const currentSectionRef = sectionRef.current; // Capturar el valor actual de la ref

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) { // Usar la variable capturada en el cleanup
        observer.unobserve(currentSectionRef);
      }
    };
  }, [sectionRef]); // sectionRef como dependencia para re-ejecutar si la ref cambia (aunque es poco común para useRef)

  // Efecto para la animación de escritura
  useEffect(() => {
    let typingTimeout;
    let resetTimeout;

    if (isInView) {
      if (index < fullText.length) {
        typingTimeout = setTimeout(() => {
          setDisplayText(fullText.substring(0, index + 1));
          setIndex(prevIndex => prevIndex + 1);
        }, 50);
      } else {
        resetTimeout = setTimeout(() => {
          setDisplayText('');
          setIndex(0);
        }, 5000);
      }
    } else {
      clearTimeout(typingTimeout);
      clearTimeout(resetTimeout);
      setDisplayText('');
      setIndex(0);
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(resetTimeout);
    };
  }, [index, fullText, isInView]);

  // Función para manejar el clic del botón de contacto
  const handleContactClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:quierohablarteya@gmail.com?subject=Contactando desde la LandingPage Miguel Mota';
  };

  return (
    <section id="hero"
      ref={sectionRef}
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
        <button
          onClick={handleContactClick}
          className="bg-white text-blue-700 hover:bg-blue-700 hover:text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Contactar
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
