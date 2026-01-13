import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);
  const [loadingDots, setLoadingDots] = useState('');

  // Scroll automático al final
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Animación de carga
  useEffect(() => {
    let intervalId;
    if (isLoading) {
      intervalId = setInterval(() => {
        setLoadingDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 300);
    } else {
      setLoadingDots('');
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const handleSendMessage = async (e) => {
    // CORRECCIÓN CRÍTICA: Evita que la página se recargue/blanquee
    if (e) e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Usamos la URL de tu backend en Render
      const response = await fetch('https://mi-cv-backend.onrender.com/api/chat-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.reply || "No recibí una respuesta clara, intenta de nuevo." 
      }]);
    } catch (error) {
      console.error("Error al conectar con el Agente:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Lo siento, mi conexión con el servidor de IA se interrumpió. Por favor, verifica si el backend está activo." 
      }]);
    } finally {
      setIsLoading(false); // Asegura que el botón se desbloquee siempre
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage(e);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Encabezado */}
      <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="font-bold text-lg">Asistente Virtual de Miguel</h3>
        </div>
      </div>

      {/* Área de Mensajes */}
      <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p className="bg-blue-50 p-3 rounded-lg inline-block">
              ¡Hola! Pregúntame sobre la experiencia técnica o formación de Miguel Mota.
            </p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none text-gray-500">
              Escribiendo{loadingDots}
            </div>
          </div>
        )}
      </div>

      {/* Input de texto */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex space-x-2">
        <input
          type="text"
          className="flex-1 p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default AIAgent;
