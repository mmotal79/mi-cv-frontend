import React from 'react';

function Projects() {
  const projects = [
    {
      name: 'Sistema Gerencial para Conglomerado Ramo de Repuesto Vehicular',
      description: 'Creé robustas apps desktop (C#/WPF) para PyMEs, optimizando inventario, ventas y finanzas (SQL Server). ¡Tu experto que potencia la eficiencia empresarial!',
      tags: ['C#', 'WPF', 'SQL Server', 'Desktop', 'Gestión'],
      link: '#', // Reemplazar con URL real (GitHub, demo, etc.)
    },
    {
      name: 'Migración de Sistemas Inter-Bancarios',
      description: 'Migré y optimicé módulos bancarios críticos (ACL, OS400), rediseñando procesos con software eficiente. Mi liderazgo impulsa soluciones robustas en entornos complejos.',
      tags: ['RPGle', 'AS400', 'Windows', 'Sistemas Legados', 'Migración'],
      link: '#',
    },
    {
      name: 'Plataforma Web HomeBanking BancoGuayana',
      description: 'Lideré la certificación QA de HomeBanking (Banco Guayana), elevando su usabilidad y experiencia de usuario con APIs RESTful. ¡Convierto visiones en software funcional!',
      tags: ['HTML', 'CSS', 'JavaScript', 'Desarrollo Web', 'APIs REST'],
      link: '#',
    },
    // Añade más proyectos aquí
	{
      name: 'Auditor de Sistemas en Control Interno y Control de Calidad (Tester QA)',
      description: 'Implementé COBIT/Sudeban en sistemas bancarios (Windows/AS400), liderando el control de versiones y certificación de código. Así materializo soluciones conformes y robustas.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Desarrollo Web', 'APIs REST', 'AS400', 'Windows'],
      link: '#',
    },
	{
      name: 'Consultor Formador en Tecnologías de Software Libre',
      description: 'Lideré la capacitación de +700 usuarios en Software Libre (CorpoElec), impulsando una migración nacional clave. Transformando organizaciones a través de la tecnología.',
      tags: ['Debian', 'CentOs', 'Email', 'OpenOffice', 'Project', 'Consola'],
      link: '#',
    },
	{
      name: 'Desarrollo sistema Siadca para Aserraderos',
      description: 'Creé un sistema administrativo integral (PowerBuilder, MySQL) para aserraderos, optimizando producción, ventas y facturación. ¡Convierto necesidades operativas en software eficaz!',
      tags: ['Powerbuilder', 'MySql', 'PLSql'],
      link: '#',
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