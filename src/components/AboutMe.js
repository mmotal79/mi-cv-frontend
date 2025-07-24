import React, { useRef, useEffect } from 'react'; // Asegúrate de importar useRef y useEffect
import videoPresentacion from '../assets/Presentacion.mp4'; // Importa tu video

function AboutMe() {
  const videoRef = useRef(null); // Crea una referencia al elemento de video

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return; // Asegura que el elemento exista

    // Opciones para el Intersection Observer
    // threshold: 0.5 significa que el 50% del video debe estar visible para que se active
    const options = {
      root: null, // El viewport es el elemento root
      rootMargin: '0px',
      threshold: 0.5, // Porcentaje de visibilidad del elemento para activar el callback
    };

    // Callback que se ejecutará cuando la visibilidad del elemento cambie
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si el video está visible, intenta reproducirlo
          videoElement.play().catch(error => {
            console.warn('Autoplay impedido:', error);
            // Esto ocurre a menudo si el navegador requiere interacción del usuario
            // o si no está silenciado. Por eso, es buena práctica añadir 'muted' y 'loop'.
          });
        } else {
          // Si el video no está visible, pusa
          videoElement.pause();
        }
      });
    };

    // Crea un nuevo Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);

    // Empieza a observar el elemento de video
    observer.observe(videoElement);

    // Función de limpieza: desobserva el video cuando el componente se desmonte
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  return (
    <section id="about" className="py-16 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Acerca de Mí
        </h2>
        {/* Contenedor Flex para el contenido y el video, responsivo */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 max-w-5xl mx-auto">
          {/* Contenedor del Texto */}
          <div className="md:w-1/2 text-lg text-gray-700 leading-relaxed space-y-6 mb-8 md:mb-0">
            <p>
              Soy <b>Miguel Mota</b>, Con una sólida trayectoria en desarrollo de software (C#, PowerBuilder) y gestión de bases de datos (SQLServer, Oracle, MySQL con PL/SQL), soy el puente entre tus necesidades y soluciones tecnológicas eficientes. Mi liderazgo de equipos como Project Manager impulsa proyectos desde el diseño hasta la implementación, garantizando resultados escalables y de alta calidad.
            </p>
            <p>
              Especializado en backend y desarrollo desktop, mi enfoque es la materialización de tu estrategia empresarial a través de la innovación y soluciones robustas. Si buscas un experto que no solo desarrolle, sino que lidere y optimice, contáctame. Juntos, convertiremos tus desafíos, sueños y metas en éxito tangible.
            </p>
          </div>
          {/* Contenedor del Video */}
          <div className='md:w-1/2'>
            <video
              ref={videoRef} // Asocia la referencia al elemento de video
              src={videoPresentacion}
              controls // Muestra los controles de reproducción del navegador
              loop // Hace que el video se reproduzca en bucle
              muted // MUY IMPORTANTE: Muchos navegadores requieren que el video esté silenciado para el autoplay
              preload="metadata" // Carga solo los metadatos del video para una carga más rápida
              className="w-full h-auto rounded-lg shadow-lg" // Clases para estilo y responsividad
            >
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
