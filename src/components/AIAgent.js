import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "¡Hola! Soy el asistente de Miguel. ¿Qué te gustaría saber?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    // CLAVE: Evita que la página se recargue o se ponga en blanco
    if (e) e.preventDefault();
    
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
        throw new Error(data.reply || 'Falla en el servidor');
      }

      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error("Error detectado:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `❌ Error: No pude obtener respuesta. (Detalle: ${error.message})` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-[500px]">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-[550px] overflow-hidden">
        
        {/* Cabecera */}
        <div className="bg-blue-700 p-4 text-white font-bold flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>Chat de Miguel Mota</span>
        </div>

        {/* Mensajes */}
        <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-xs text-gray-400 italic">Miguel está pensando...</div>}
        </div>

        {/* Formulario: El onSubmit aquí es lo que controla todo */}
        <form onSubmit={handleSendMessage} className="p-4 border-t flex space-x-2 bg-white">
          <input
            type="text"
            className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50"
            disabled={isLoading}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAgent;
