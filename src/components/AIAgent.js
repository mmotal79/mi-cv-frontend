import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "¡Hola! Soy el asistente de Miguel. ¿En qué puedo ayudarte hoy?" }
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
    if (e) e.preventDefault(); // Evita que la página parpadee o se ponga en blanco
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

      if (!response.ok) throw new Error(data.reply || "Error en IA");

      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `⚠️ Error de conexión: No pude obtener respuesta del servidor de IA.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-transparent">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-[500px] overflow-hidden">
        
        {/* Cabecera Centrada */}
        <div className="bg-blue-800 p-4 text-white text-center shadow-md flex-shrink-0">
          <h3 className="font-bold text-lg">Asistente IA Miguel Mota</h3>
          <p className="text-xs text-blue-200">Consultas sobre Trayectoria Profesional</p>
        </div>

        {/* Cuerpo del Chat */}
        <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs animate-pulse font-medium">
                Miguel está analizando...
              </div>
            </div>
          )}
        </div>

        {/* Input con prevención de refresco */}
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex space-x-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
            placeholder="Pregunta sobre su experiencia..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="bg-blue-700 text-white px-5 py-2.5 rounded-xl hover:bg-blue-800 disabled:opacity-50 font-bold transition-all shadow-md"
            disabled={isLoading || !input.trim()}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAgent;
