// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    // CAMBIO: Fondo a bg-black, texto a text-base y font-bold para resaltar
    <footer className="bg-black text-white py-8 text-center text-base font-bold">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Ing. Miguel Mota. Todos los derechos reservados.</p>
        <p className="mt-2">Diseñado y desarrollado por: Ing. Miguel Mota, Project Manager & Architect of Technological Solutions.</p>
      </div>
    </footer>
  );
}

export default Footer;
