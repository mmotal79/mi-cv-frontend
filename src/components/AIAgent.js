import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);
  const [loadingDots, setLoadingDots] = useState('');

  // Auto-scroll al fondo del chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Animación de puntos (...)
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); // ¡Vital para no recargar la página!
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      // Conexión al Backend
      const response = await fetch('https://mi-cv-backend.onrender.com/api/chat-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error('Error de red');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "😔 Perdí la conexión con el servidor. Por favor intenta más tarde." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL CENTRADO
    <div className="flex items-center justify-center min-h-[600px] p-4 bg-gray-50">
      
      {/* CAJA DEL CHAT (CARD) */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform transition-all hover:shadow-xl">
        
        {/* ENCABEZADO */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-xl shadow-inner">
                IA
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-800 rounded-full"></span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Asistente Virtual</h3>
              <p className="text-blue-200 text-xs">Experto en el CV de Miguel</p>
            </div>
          </div>
        </div>

        {/* ÁREA DE MENSAJES */}
        <div 
          ref={chatMessagesRef} 
          className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <p className="text-gray-500 text-sm">¡Hola! Pregúntame sobre la experiencia, <br/>habilidades o estudios de Miguel.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-2xl rounded-bl-none text-xs font-semibold">
                Analizando{loadingDots}
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              className="w-full bg-gray-100 text-gray-700 rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
