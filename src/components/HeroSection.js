import React from 'react';
// ESTA ES LA LÍNEA CLAVE PARA TU RUTA:
import imagenPortada from '../assets/imagen-portada.jpg';
import imagenPerfil from '../assets/Miguel.jpg';

function HeroSection() {
  // <-- CAMBIO ESTA LINEA: Define el correo del destinatario para este botón
  const recipientEmail = 'quierohablarteya@gmail.com'; 
  // <-- CAMBIO ESTA LINEA: Define el asunto predeterminado para este correo
  const subject = 'Consulta desde la Portada del Portafolio'; 

  // <-- CAMBIO ESTA LINEA: Construye el enlace mailto completo
  // encodeURIComponent se usa para asegurar que espacios y caracteres especiales en el asunto
  // sean interpretados correctamente por los clientes de correo.
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}`;

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
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          Miguel Mota
        </h1>
        <p className="text-xl md:text-3xl font-light mb-8 opacity-90 animate-fade-in-up">
          Ingeniero y Project Manager experto en transformar ideas y sueños en software.
        </p>
        <a
          href={mailtoLink} // <-- CAMBIO ESTA LINEA: Ahora usa la variable mailtoLink construida arriba
          className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Contactar
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
