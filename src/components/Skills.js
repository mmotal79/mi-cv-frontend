import React from 'react';

function Skills() {
  const technicalSkills = [
    'C#', 'PowerBuilder', 'SQL Server', 'Oracle', 'Modelos MVC', 'Desarrollo Desktop', 'Scrum',
    'Diseño de Bases de Datos', 'RESTful APIs', 'Git', 'JavaScript (Básico)', 'HTML/CSS (Básico)',
	'Jira', 'Confluence', 'Miro', 'PlantUML', 'LucidChart', 'Slack', 'Windows', 'AS400', 'Linux',
  ];

  const softSkills = [
    'Gestión de Equipos', 'Liderazgo', 'Trabajo Autónomo', 'Comunicación Efectiva', 'Asertividad',
    'Resolución de Problemas', 'Análisis de Requisitos', 'Proactividad', 'Pensamiento Crítico',
	'Tolerante', 'Proactivo'
  ];

  return (
    <section id="skills" className='py-16 bg-gray-50 border-b border-gray-200'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10'>
          Mis Habilidades
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Habilidades Técnicas */}
          <div>
            <h3 className='text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-blue-500 pb-2'>
              Técnicas
            </h3>
            <div className='flex flex-wrap gap-3'>
              {technicalSkills.map((skill, index) => (
                <span
                  key={index}
                  className='bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition duration-200'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Habilidades Blandas */}
          <div>
            <h3 className='text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-500 pb-2'>
              Blandas (Soft Skills)
            </h3>
            <div className='flex flex-wrap gap-3'>
              {softSkills.map((skill, index) => (
                <span
                  key={index}
                  className='bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition duration-200'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;