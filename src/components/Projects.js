import React from 'react';

function Projects() {
  const projects = [
    {
      name: 'Sistema Gerencial para Conglomerado Ramo de Repuesto Vehicular',
      description: 'Desarrollo de una robusta aplicación de escritorio para el control de inventario, ventas y reportes financieros, optimizando procesos para pequeñas y medianas empresas. Implementado con C# y WPF, con SQL Server como backend.',
      tags: ['C#', 'WPF', 'SQL Server', 'Desktop', 'Gestión'],
      link: '#', // Reemplazar con URL real (GitHub, demo, etc.)
    },
    {
      name: 'Migración de Sistemas Inter-Bancarios',
      description: 'Migración y optimización de módulos críticos de un sistema bancario utilizando ACL para creación de sistema ETL. Incluyó refactorización de código y mejora de la conectividad a datos RPGle en sistemas OS400.',
      tags: ['RPGle', 'AS400', 'Windows', 'Sistemas Legados', 'Migración'],
      link: '#',
    },
    {
      name: 'Plataforma Web HomeBanking BancoGuayana',
      description: 'Colaboración en el testeo QA de la interfaz de usuario del HomeBanking de la Institución Bancaria Banco Guayana, revisión y certificación de nuevas funcionalidades., centrándose en la usabilidad y la experiencia del usuario. Integración con APIs RESTful existentes.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Desarrollo Web', 'APIs REST'],
      link: '#',
    },
    // Añade más proyectos aquí
	{
      name: 'Auditor de Sistemas en Control Interno y Control de Calidad (Tester QA)',
      description: 'Especialista Tecnico en la implementación de los Marcos de Trabajo COBIT y la Normativa de Sudeban, en el control de versiones y revisión de código, su prueba y certificación para los ambientes de prueba, preproduccion y producción en el ámbiente bancario, para sistemas desarrollados en los sistemas operativos Windows y AS400. ',
      tags: ['HTML', 'CSS', 'JavaScript', 'Desarrollo Web', 'APIs REST', 'AS400', 'Windows'],
      link: '#',
    },
	{
      name: 'Consultor Formador en Tecnologías de Software Libre',
      description: 'Especialista en capacitación técnica a nivel usuario en Software Libre a mas de 700 personas en CorpoElec (Antigua Edelca) para el periodo 2006-2007. En cumplimiento de la povidencia de Migración de sistemas a Sftware Libre por parte del ejecutivo Nacional de Venezuela.',
      tags: ['Debian', 'CentOs', 'Email', 'OpenOffice', 'Project', 'Consola'],
      link: '#',
    },
	{
      name: 'Desarrollo sistema Siadca para Aserraderos',
      description: 'Desarrollo de un sistema administrativo para aserraderos utilizando PowerBuilder (9.0, 10.0, 11.5), con base de datos en MySQL y PL/SQL, bajo el paradigma de programación orientada a objetos. Este sistema controlaba el flujo de madera, su transformación, cuantificación de producción, registro de guías de circulación legal, venta, facturación y despacho..',
      tags: ['Powerbuilder', 'MySql', 'PLSql'],
      link: '#',
    },
  ];
  
  

  return (
    <section className='py-16 bg-white border-b border-gray-200'>
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