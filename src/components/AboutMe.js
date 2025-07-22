import React from 'react';

function AboutMe() {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Acerca de Mí
        </h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
          <p>
            Soy <b>Miguel Mota</b>, un profesional con una sólida trayectoria en el <b>desarrollo de software para escritorio (desktop)</b>, destacando en el uso de tecnologías como <b>VisualStudio C# y Sybase PowerBuilder</b>. Mi experiencia abarca el ciclo completo de vida del desarrollo, desde el análisis de requisitos hasta la implementación y mantenimiento.
          </p>
          <p>
            Poseo un profundo conocimiento en el <b>diseño y optimización de bases de datos SQLServer, MySQL, Oracle</b> usando <b>PL/SQL</b>, garantizando soluciones robustas y eficientes para la gestión de información. He trabajado extensivamente con <b>modelos MVC</b>, aplicando patrones de diseño que aseguran la escalabilidad y mantenibilidad del código.
          </p>
          <p>
            Además de mis habilidades técnicas, cuento con una probada capacidad en la <b>gestión de equipos de desarrollo informático</b>, ejerciendo un liderazgo que fomenta la colaboración, la productividad y el crecimiento profesional. Soy un firme creyente en el <b>trabajo autónomo</b> y la proactividad, siempre buscando soluciones innovadoras y eficientes para superar los desafíos.
          </p>
          <p>
            Aunque mi fuerte es el backend y el desarrollo desktop, también he incursionado en el <b>desarrollo web básico para clientes</b>, lo que me permite tener una visión integral de los proyectos y adaptarme a diversas necesidades tecnológicas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;