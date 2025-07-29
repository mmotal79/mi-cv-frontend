// src/components/Skills.js
import React, { useState, useEffect, useRef } from 'react';

function Skills() {
  const technicalSkills = [
    'C#', 'PowerBuilder', 'SQL Server', 'Oracle', 'Modelos MVC', 'Desarrollo Desktop', 'Scrum',
    'Diseño de Bases de Datos', 'RESTful APIs', 'Git', 'JavaScript (Básico)', 'HTML/CSS (Básico)',
    'Jira', 'Confluence', 'Miro', 'PlantUML', 'LucidChart', 'Slack', 'Windows', 'AS400', 'Linux',
  ];

  const softSkills = [
    'Gestión de Equipos', 'Liderazgo', 'Trabajo Autónomo', 'Comunicación Efectiva', 'Asertividad',
    'Resolución de Problemas', 'Análisis de Requisitos', 'Proactividad', 'Pensamiento Crítico',
    'Tolerante', // CORREGIDO: Eliminada la comilla extra
    'Proactivo'
  ];

  // Combinamos todas las habilidades en una sola lista para la animación secuencial
  const allSkills = [...technicalSkills, ...softSkills];

  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [highlightedSkillIndex, setHighlightedSkillIndex] = useState(0);

  // Observador para detectar si la sección está en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // REMOVIDO: Ya no se reinicia el índice a 0 cuando entra en vista.
        // Ahora, el índice se mantiene para reanudar la secuencia.
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.3, // 30% de la sección debe ser visible
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar

  // Efecto para la animación secuencial de habilidades
  useEffect(() => {
    let animationInterval;

    if (isInView) {
      // Inicia un intervalo para cambiar la habilidad resaltada cada 1 segundo
      animationInterval = setInterval(() => {
        setHighlightedSkillIndex((prevIndex) =>
          (prevIndex + 1) % allSkills.length
        );
      }, 1000); // Cambia cada 1 segundo
    } else {
      // Si no está en vista, limpia el intervalo
      clearInterval(animationInterval);
    }

    // Función de limpieza para detener el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(animationInterval);
    };
  }, [isInView, allSkills.length]); // Vuelve a ejecutar si cambia la visibilidad o el número de habilidades

  // Helper para renderizar las habilidades
  const renderSkills = (skillsArray, type) => {
    return skillsArray.map((skill, index) => {
      // Calcular el índice global para la lista combinada
      const globalIndex = type === 'technical' ? index : technicalSkills.length + index;
      const isHighlighted = isInView && globalIndex === highlightedSkillIndex;

      const baseClasses = 'px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out';
      const typeClasses = type === 'technical'
        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
      const highlightClasses = isHighlighted
        ? 'transform scale-105 shadow-md ring-2 ring-opacity-75 ring-blue-500' // Agrega un anillo para mayor visibilidad
        : '';

      return (
        <span
          key={globalIndex}
          // CORREGIDO: Uso de Array.prototype.join(' ') para concatenar clases
          // Esto resuelve los errores de 'no-unused-vars' y 'no-template-curly-in-string'
          className={[baseClasses, typeClasses, highlightClasses].filter(Boolean).join(' ')}
        >
          {skill}
        </span>
      );
    });
  };

  return (
    <section id="skills" ref={sectionRef} className='py-16 bg-gray-50 border-b border-gray-200'>
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
              {renderSkills(technicalSkills, 'technical')}
            </div>
          </div>

          {/* Habilidades Blandas */}
          <div>
            <h3 className='text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-500 pb-2'>
              Blandas (Soft Skills)
            </h3>
            <div className='flex flex-wrap gap-3'>
              {renderSkills(softSkills, 'soft')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
