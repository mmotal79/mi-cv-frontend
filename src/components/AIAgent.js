import React, { useState, useRef, useEffect } from 'react';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para mostrar un indicador de carga
  const chatMessagesRef = useRef(null); // Nueva referencia para el contenedor de mensajes
  const [loadingDots, setLoadingDots] = useState(''); // <-- CAMBIO: Nuevo estado para los puntos de carga

  // Función para hacer scroll al último mensaje
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  // Efecto para hacer scroll cada vez que los mensajes cambian
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // <-- CAMBIO: Nuevo efecto para la animación de los puntos de carga
  useEffect(() => {
    let intervalId;
    if (isLoading) {
      setLoadingDots(''); // Reiniciar puntos al iniciar la carga
      intervalId = setInterval(() => {
        setLoadingDots(prevDots => {
          if (prevDots.length < 3) {
            return prevDots + '.';
          }
          return ''; // Reiniciar a vacío después de 3 puntos
        });
      }, 300); // Cambiar cada 300ms
    } else {
      setLoadingDots(''); // Limpiar puntos cuando la carga termina
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar o cambiar isLoading
  }, [isLoading]); // Dependencia: se ejecuta cuando isLoading cambia

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

        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6 flex flex-col border border-gray-200 max-h-[80vh]">
          
          <div ref={chatMessagesRef} className="flex-1 p-6 overflow-y-auto space-y-4">
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
                  {/* <-- CAMBIO: Mostrar el mensaje dinámico de puntos de carga */}
                  Escribiendo{loadingDots}
                </div>
              </div>
            )}
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
              className="ml-4 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         md:px-6"
            >
              <span className="hidden md:inline">Enviar</span> 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="2.5" 
                stroke="currentColor" 
                className="w-6 h-6 inline md:hidden"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L6 12zm0 0h12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAgent;
