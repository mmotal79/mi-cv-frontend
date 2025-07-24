import React from 'react';

function Contact() {
  // Define el correo del destinatario y el asunto aquí.
  // Esto hace que sea fácil de modificar y reutilizar.
  const recipientEmail = 'quierohablarteya@gmail.com'; // <-- CAMBIO ESTA LINEA: Define tu correo electrónico aquí
  const subject = 'Consulta desde el Portafolio'; // <-- CAMBIO ESTA LINEA: Define el asunto predeterminado

  // Construye el enlace mailto completo
  // encodeURIComponent se usa para asegurar que espacios y caracteres especiales en el asunto
  // sean interpretados correctamente por los clientes de correo.
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}`; // <-- CAMBIO ESTA LINEA: Construcción del enlace mailto

  return (
    <section id="contact" className="py-16 bg-blue-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contáctame</h2>
        <p className="text-xl mb-8">
          Estoy disponible para nuevos proyectos, nuevos retos tecnológicos de I+D y colaboraciones.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href={mailtoLink} // <-- CAMBIO ESTA LINEA: Ahora usa la variable mailtoLink construida arriba
            className="bg-white text-blue-700 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Enviar Email
          </a>
          <a
            href="https://www.linkedin.com/in/ing-miguel-mota-a13b26116" // Asegúrate de que esta URL sea correcta. Si no es tu perfil, cámbiala.
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white hover:bg-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Mi LinkedIn
          </a>
          {/* Opcional: GitHub */}
         
        </div>
        {/* Si quieres un formulario completo, necesitarías un backend para manejarlo */}
        {/* Para el alcance de este proyecto, los enlaces directos son más rápidos */}
      </div>
    </section>
  );
}

export default Contact;
