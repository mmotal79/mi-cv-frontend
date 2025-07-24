import React from 'react';

function Projects() {
  const projects = [
    {
      imageUrl: '/assets/imagen-portada.jpg', // <-- CAMBIO: Agregado campo para la imagen (ruta relativa desde la raíz pública)
      name: 'Sistema Gerencial para Conglomerado Ramo de Repuesto Vehicular',
      description: 'Creé robustas apps desktop (C#/WPF) para PyMEs, optimizando inventario, ventas y finanzas (SQL Server). ¡Tu experto que potencia la eficiencia empresarial!',
      tags: ['C#', 'WPF', 'SQL Server', 'Desktop', 'Gestión'],
      link: '#'
    },
    {
      imageUrl: '/assets/imagen-portada.jpg', // <-- CAMBIO: Agregado campo para la imagen
      name: 'Migración de Sistemas Inter-Bancarios',
      description: 'Migré y optimicé módulos bancarios críticos (ACL, OS400), rediseñando procesos con software eficiente. Mi liderazgo impulsa soluciones robustas en entornos complejos.',
      tags: ['RPGle', 'AS400', 'Windows', 'Sistemas Legados', 'Migración'],
      link: '#'
    },
    {
      imageUrl: '/assets/imagen-portada.jpg', // <-- CAMBIO: Agregado campo para la imagen
      name: 'Plataforma Web HomeBanking BancoGuayana',
      description: 'Lideré la certificación QA de HomeBanking (Banco Guayana), elevando su usabilidad y experiencia de usuario con APIs RESTful. ¡Convierto visiones en software funcional!',
      tags: ['HTML', 'CSS', 'JavaScript', 'Desarrollo Web', 'APIs REST'],
      link: '#'
    },
    {
      // imageUrl: '/assets/imagen-portada.jpg', // <-- EJEMPLO: Este proyecto no tiene imagen para demostrar el caso sin imagen
      name: 'Auditor de Sistemas en Control Interno y Control de Calidad (Tester QA)',
      description: 'Implementé COBIT/Sudeban en sistemas bancarios (Windows/AS400), liderando el control de versiones y certificación de código. Así materializo soluciones conformes y robustas.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Desarrollo Web', 'APIs REST', 'AS400', 'Windows'],
      link: '#'
    },
    {
      imageUrl: '/assets/imagen-portada.jpg', // <-- CAMBIO: Agregado campo para la imagen
      name: 'Consultor Formador en Tecnologías de Software Libre',
      description: 'Lideré la capacitación de +700 usuarios en Software Libre (CorpoElec), impulsando una migración nacional clave. Transformando organizaciones a través de la tecnología.',
      tags: ['Debian', 'CentOs', 'Email', 'OpenOffice', 'Project', 'Consola'],
      link: '#'
    },
    {
      // imageUrl: '/assets/imagen-portada.jpg', // <-- EJEMPLO: Este proyecto no tiene imagen
      name: 'Desarrollo sistema Siadca para Aserraderos',
      description: 'Creé un sistema administrativo integral (PowerBuilder, MySQL) para aserraderos, optimizando producción, ventas y facturación. ¡Convierto necesidades operativas en software eficaz!',
      tags: ['Powerbuilder', 'MySql', 'PLSql'],
      link: '#'
    },
  ];

  return (
    <section id="experience" className='py-16 bg-white border-b border-gray-200'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10'>
          Proyectos Destacados
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
              {/* <-- CAMBIO: Renderizado condicional de la imagen */}
              {project.imageUrl && ( // Si existe una URL de imagen
                <div className="w-full h-48 overflow-hidden"> {/* Contenedor para la imagen con altura fija y ocultar desbordamiento */}
                  <img
                    src={project.imageUrl}
                    alt={`Imagen del proyecto ${project.name}`}
                    className="w-full h-full object-cover object-center" // Ajusta la imagen a la caja, cubriendo el área
                  />
                </div>
              )}
              {/* Fin del cambio */}
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>{project.name}</h3>
                <p className='text-gray-600 text-sm mb-4'>{project.description}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className='bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full'>
                      {tag}
                    </span>
                  ))}
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
