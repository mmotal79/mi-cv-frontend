import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatMessagesRef = useRef(null);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
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
      
      // Agregamos la respuesta junto con el estatus de los modelos
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: data.reply,
        status: data.modelStatus 
      }]);

    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "⚠️ No logré conectar con el servidor. Revisa los logs de Render.",
        status: []
      }]);
    } finally {
      setIsLoading(false);
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 border rounded-xl shadow-lg bg-white flex flex-col h-[600px]">
      <div className="p-4 bg-blue-700 text-white font-bold rounded-t-xl text-center">
        Asistente IA Miguel Mota - V3.0
      </div>

      <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-3 rounded-lg max-w-[90%] ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
            </div>
            
            {/* Reporte de Modelos (Solo para la IA) */}
            {msg.sender === 'ai' && msg.status && msg.status.length > 0 && (
              <div className="mt-2 text-[10px] w-full max-w-[90%] border-t pt-1 border-gray-300">
                <p className="font-semibold text-gray-500 mb-1">Traza de conexión:</p>
                {msg.status.map((m, idx) => (
                  <div key={idx} className={`flex justify-between ${m.status === 'FAILED' ? 'text-red-500' : m.status === 'SUCCESS' ? 'text-green-600' : 'text-gray-400'}`}>
                    <span>• {m.name}</span>
                    <span className="font-bold">{m.status === 'FAILED' ? '❌ SIN SERVICIO' : m.status === 'SUCCESS' ? '✅ CONECTADO' : '⏳ -'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="text-sm text-blue-500 italic animate-pulse">Consultando modelos V3.0...</div>}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe 'accesos' o una pregunta..."
        />
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Enviar</button>
      </form>
    </div>
  );
}

export default AIAgent;

