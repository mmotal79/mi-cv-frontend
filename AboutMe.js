import React from 'react';

function AboutMe() {
  return (
    <section id="about" className="py-16 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Acerca de Mí
        </h2>
        <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
          <p>
            Soy <b>Miguel Mota</b>, Con una sólida trayectoria en desarrollo de software (C#, PowerBuilder) y gestión de bases de datos (SQLServer, Oracle, MySQL con PL/SQL), soy el puente entre tus necesidades y soluciones tecnológicas eficientes. Mi liderazgo de equipos como Project Manager impulsa proyectos desde el diseño hasta la implementación, garantizando resultados escalables y de alta calidad. 
		  </p>
		  <p>
			Especializado en backend y desarrollo desktop, mi enfoque es la materialización de tu estrategia empresarial a través de la innovación y soluciones robustas. Si buscas un experto que no solo desarrolle, sino que lidere y optimice, contáctame. Juntos, convertiremos tus desafíos, sueños y metas en éxito tangible.          
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;