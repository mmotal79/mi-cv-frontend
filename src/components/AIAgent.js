import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para mostrar un indicador de carga
  // const messagesEndRef = useRef(null); // <-- Esta línea se está modificando/reemplazando

  // Función para hacer scroll al último mensaje
  // const scrollToBottom = () => { // <-- Esta línea se está modificando/reemplazando
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // <-- Esta línea se está modificando/reemplazando
  // }; // <-- Esta línea se está modificando/reemplazando

  // <-- Las siguientes líneas son nuevas o se están modificando para un scroll más controlado:
  const chatMessagesRef = useRef(null); // <-- Esta línea es nueva: Nueva referencia para el contenedor de mensajes
  const scrollToBottom = () => { // <-- Esta línea se está modificando
    if (chatMessagesRef.current) {
      // <-- Esta línea es nueva: Manipulación directa del scrollTop para un scroll interno
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };
  // <-- Fin de las modificaciones del scroll

  // Efecto para hacer scroll cada vez que los mensajes cambian
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSendMessage = async () => {
  if (input.trim() === '') return;

  const newUserMessage = { sender: 'user', text: input };
  setMessages((prevMessages) => [...prevMessages, newUserMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/chat-cv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const aiReply = { sender: 'ai', text: data.reply };
    setMessages((prevMessages) => [...prevMessages, aiReply]);

  } catch (error) {
    console.error('Error al enviar mensaje al backend:', error);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'ai', text: 'Lo siento, no pude procesar tu solicitud. Por favor, inténtalo de nuevo.' }
    ]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <section id="ai-agent" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Consúltame! Pregúntame sobre Miguel... 
        </h2>

        {/* <-- Esta línea se está modificando: Añadimos 'max-h-[80vh]' para altura responsiva
             y asegurar que el scroll se confine al contenedor del chat.
             Esto reemplaza una posible 'h-96' u otra altura fija. */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6 flex flex-col border border-gray-200 max-h-[80vh]"> {/* <-- LÍNEA MODIFICADA */}
          
          {/* Área de mensajes */}
          {/* <-- Esta línea se está modificando: Aplicamos 'ref={chatMessagesRef}' a este div,
               que es el que tiene 'overflow-y-auto' y es el que queremos desplazar. */}
          <div ref={chatMessagesRef} className="flex-1 p-6 overflow-y-auto space-y-4"> {/* <-- LÍNEA MODIFICADA */}
            {messages.length === 0 && (
              <p className="text-gray-500 text-center italic">
                ¡Hola! Soy el asistente personal de Miguel. Responderé cualquier pregunta sobre su currículum. Por ejemplo: "¿Cuál es su experiencia en C#?" o "¿Qué proyectos ha realizado?"
              </p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2 rounded-lg shadow-sm bg-gray-200 text-gray-800">
                  Escribiendo...
                  <span className="animate-pulse ml-2">...</span>
                </div>
              </div>
            )}
            {/* <-- Esta línea se está eliminando: Ya no necesitamos este div vacío para el scroll */}
            {/* <div ref={messagesEndRef} /> */} 
          </div>

          {/* Área de entrada de texto */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex">
            <input
              type="text"
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu pregunta aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAgent;
