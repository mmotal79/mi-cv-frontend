import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const chatMessagesRef = useRef(null);

  // Cargar modelos al iniciar
  useEffect(() => {
    fetch('https://mi-cv-backend.onrender.com/api/modelos-disponibles')
      .then(res => res.json())
      .then(data => setAvailableModels(data.models))
      .catch(() => setAvailableModels(["No se pudieron listar los modelos"]));
  }, []);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault(); // EVITA PANTALLA EN BLANCO
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://mi-cv-backend.onrender.com/api/chat-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error de comunicación. Intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border">
        
        {/* Cabecera con lista de modelos */}
        <div className="bg-blue-900 p-4 text-white">
          <h2 className="font-bold text-lg text-center">Asistente de Miguel Mota</h2>
          <div className="mt-2 text-[10px] text-blue-200 text-center opacity-70">
             Modelos Gemini detectados: {availableModels.join(' | ')}
          </div>
        </div>

        {/* Chat */}
        <div ref={chatMessagesRef} className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-xl max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-xs italic text-gray-400">Analizando...</div>}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <input
            className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué quieres saber de Miguel?"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Enviar</button>
        </form>
      </div>
    </section>
  );
}

export default AIAgent;
