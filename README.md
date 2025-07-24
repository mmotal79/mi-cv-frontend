# Portfolio Profesional: ING. MIGUEL MOTA

Este proyecto es una landing page dinámica y un portfolio profesional diseñado para presentar de manera moderna e interactiva la trayectoria, habilidades y proyectos destacados del Ing. Miguel Mota.

## 🌟 Visión y Valor del Proyecto

La visión de esta landing page es servir como una herramienta integral para el networking profesional, la búsqueda de oportunidades laborales y la captación de clientes. Su objetivo principal es ofrecer una visión clara y atractiva del perfil del Ing. Miguel Mota como Ingeniero en Informática y Project Manager.

**Valor que Aporta:**
* **Presentación Moderna:** Sustituye un CV estático por una experiencia interactiva y visualmente atractiva.
* **Accesibilidad:** Permite a reclutadores y potenciales clientes acceder rápidamente a información relevante desde cualquier dispositivo.
* **Interacción Innovadora:** Incluye un "Agente IA" que permite a los visitantes hacer preguntas directas sobre el perfil y la experiencia de Miguel Mota, proporcionando respuestas instantáneas y personalizadas basadas en su CV. Esto mejora la experiencia del usuario y demuestra un enfoque innovador.
* **Resumen Completo:** Detalla experiencia laboral, educación, habilidades técnicas y blandas, y certificaciones, ofreciendo un panorama completo de sus capacidades.
* **Destacado de Proyectos:** Presenta los proyectos más relevantes con descripciones y tecnologías utilizadas, incluyendo soporte visual (imágenes) para un mayor impacto.

## 💻 Tecnologías Utilizadas

El proyecto está construido con un stack moderno y eficiente para garantizar rendimiento y escalabilidad.

### Frontend
* **React.js:** Biblioteca de JavaScript para construir interfaces de usuario interactivas y componentes reutilizables.
* **Tailwind CSS:** Un framework CSS "utility-first" que permite un diseño rápido y altamente personalizable, garantizando una interfaz responsiva y atractiva.

### Backend (Para el Agente IA)
* **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
* **Express.js:** Framework de Node.js para la construcción de APIs RESTful que manejan las solicitudes del Agente IA.
* **Modelos de Lenguaje (LLMs):** El "Agente IA" se conecta a un modelo de lenguaje externo (ej. Google Gemini, OpenAI GPT, u otro API de IA) para procesar las preguntas del usuario y generar respuestas inteligentes basadas en el contenido del CV.
    * **Nota sobre los Datos del CV:** Los datos del CV son procesados por el backend (probablemente cargados desde un archivo JSON estático como el proporcionado, o un sistema de base de datos/CMS para el agente IA) para ser consultados por el modelo de IA.

### Base de Datos
* Para la landing page en sí, la información del perfil es gestionada a través de archivos JSON estáticos en el frontend.
* Para el Agente IA, la información del CV se procesa en el backend, lo que podría implicar el uso de bases de datos o sistemas de gestión de contenido para almacenar y consultar los datos que el LLM utiliza como fuente de conocimiento.

## 🚧 Limitaciones y Mejoras Futuras

### Limitaciones Actuales
* **Rutas de Imágenes de Proyectos:** Las imágenes de los proyectos (`imageUrl` en `Projects.js`) actualmente utilizan rutas placeholder. Es necesario reemplazar estas rutas con las imágenes reales y asegurarse de que estén ubicadas correctamente en el directorio `public/assets` o importadas en el componente.
* **Configuración del Backend del Agente IA:** La URL del API (`API_URL`) para el Agente IA en `AIAgent.js` apunta a una dirección local o de desarrollo. Para el despliegue en producción, esta URL debe ser la dirección real del servidor backend que aloja el Agente IA (ej. un servicio de Render, Vercel, etc.).
* **Contenido Estático del CV:** La información del CV se encuentra actualmente en un archivo JSON estático. Cualquier actualización del perfil requiere modificar directamente este archivo en el código.

### Mejoras Futuras
* **Panel de Administración (CMS):** Implementar un sistema de gestión de contenido (CMS) o un panel de administración para que Miguel Mota pueda actualizar fácilmente su información, proyectos, habilidades y certificaciones sin necesidad de modificar el código directamente.
* **Optimización SEO Avanzada:** Refinar aún más el SEO para mejorar la visibilidad en motores de búsqueda, incluyendo la generación dinámica de meta-etiquetas y un sitemap.
* **Internacionalización (i18n):** Añadir soporte para múltiples idiomas, permitiendo que la landing page se adapte a una audiencia global.
* **Analíticas:** Integrar herramientas de análisis web (ej. Google Analytics) para monitorear el tráfico y el comportamiento de los usuarios.
* **Funcionalidades Expandidas del Agente IA:** Explorar la adición de funcionalidades más avanzadas al Agente IA, como la capacidad de generar correos electrónicos de contacto, proporcionar enlaces a recursos específicos del CV, o interactuar de formas más contextuales.
* **Testing exhaustivo:** Realizar pruebas de compatibilidad con diversos navegadores y dispositivos para asegurar una experiencia de usuario consistente.
* **Base de datos dedicada para el CV:** Para el Agente IA, considerar almacenar la información del CV en una base de datos más robusta (MongoDB, PostgreSQL) en el backend, permitiendo una gestión más escalable y búsquedas más complejas para el LLM.

---