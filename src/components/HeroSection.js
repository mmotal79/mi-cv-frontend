import React from 'react';
// ESTA ES LA LÍNEA CLAVE PARA TU RUTA:
import imagenPortada from '../assets/imagen-portada.jpg'; // <-- ¡VERIFICA ESTO!
import imagenPerfil from '../assets/Miguel.jpg'; // <-- ¡VERIFICA ESTO!

function HeroSection() {
  return (
    <section
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
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          Miguel Mota
        </h1>
        <p className="text-xl md:text-3xl font-light mb-8 opacity-90 animate-fade-in-up">
          Experto en Desarrollo de Software y Liderazgo de Equipos
        </p>
        <a
          href="mailto:mmotal@gmail.com"
          className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Contactar
        </a>
      </div>
    </section>
  );
}

export default HeroSection;