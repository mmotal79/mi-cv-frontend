// src/components/Contact.js
import React from 'react';

function Contact() {
  const handleEmailClick = (e) => {
    e.preventDefault();
    // Email y asunto (se asegura que coincida con HeroSection)
    window.location.href = 'mailto:quierohablarteya@gmail.com?subject=Contactando desde la LandingPage Miguel Mota';
  };

  return (
    // Fondo de la sección Contacto a bg-gray-800
    <section id="contact" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contáctame</h2>
        <p className="text-xl mb-8">
          Estoy disponible para nuevos proyectos, nuevos retos tecnológicos de I+D y colaboraciones.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button
            onClick={handleEmailClick}
            // AJUSTE FINAL DE BOTÓN: Fondo blanco, texto gris oscuro, hover a azul claro con texto blanco
            className="bg-white text-gray-800 hover:bg-blue-400 hover:text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Enviar Email
          </button>
          <a
            // CORRECCIÓN: Nuevo link de LinkedIn
            href="https://www.linkedin.com/in/ing-miguel-mota-ti"
            target="_blank"
            rel="noopener noreferrer"
            // AJUSTE FINAL DE BOTÓN: Fondo blanco, texto gris oscuro, hover a azul claro con texto blanco
            className="bg-white text-gray-800 hover:bg-blue-400 hover:text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Mi LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
