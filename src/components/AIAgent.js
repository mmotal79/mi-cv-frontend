import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);
  const [loadingDots, setLoadingDots] = useState('');
  const [debugInfo, setDebugInfo] = useState(null); // Estado para mostrar modelos

  // Auto-scroll
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading, debugInfo]);

  // Animación de puntos
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
    } else {
      setLoadingDots('');
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // ⚡️ NUEVO: Al cargar, verifica qué modelos funcionan y saluda
  useEffect(() => {
    const inicializarAgente = async () => {
      try {
        // 1. Mensaje de bienvenida inicial
        setMessages([{ 
          role: 'bot', 
          content: "¡Hola! Soy el asistente virtual de Miguel. Estoy analizando mis capacidades..." 
        }]);

        // 2. Consultar al backend qué modelos tiene disponibles
        const response = await fetch('https://mi-cv-backend.onrender.com/api/verificar-modelos');
        const data = await response.json();

        if (data.models && data.models.length > 0) {
          // ÉXITO: Mostramos los modelos disponibles
          setMessages(prev => [...prev, {
            role: 'bot',
            content: `✅ Conexión exitosa. Modelos de IA detectados y operativos para este chat:\n\n✨ ${data.models.join('\n✨ ')}\n\n¿Qué deseas saber sobre Miguel?`
          }]);
        } else {
          setMessages(prev => [...prev, {
            role: 'bot',
            content: "⚠️ Alerta: El servidor responde, pero no detecto modelos de IA disponibles. Verifica tu API Key."
          }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: "❌ Error de conexión con el Backend. Asegúrate de que el servidor en Render esté activo."
        }]);
      }
    };

    inicializarAgente();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault(); 
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://mi-cv-backend.onrender.com/api/chat-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.debug || 'Error desconocido');
      }

      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error("Error Frontend:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `⛔ Error: ${error.message}. Intenta recargar la página.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] p-4 bg-gray-50 font-sans">
      
      {/* TARJETA DE CHAT */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[600px]">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-4 shadow-md flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-xl shadow">IA</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-900 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Asistente de Miguel</h3>
              <p className="text-blue-200 text-xs">Potenciado por Gemini IA</p>
            </div>
          </div>
        </div>

        {/* ÁREA DE MENSAJES */}
        <div 
          ref={chatMessagesRef} 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-xs font-semibold animate-pulse">
                Escribiendo{loadingDots}
              </div>
            </div>
          )}
        </div>

        {/* INPUT */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="w-full bg-gray-100 text-gray-700 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default AIAgent;
