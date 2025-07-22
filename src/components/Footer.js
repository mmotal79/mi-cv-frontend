import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center text-sm">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Miguel Mota. Todos los derechos reservados.</p>
        <p className="mt-2">Diseñado y desarrollado por: Miguel Mota Architect of Technological Solutions.</p>
      </div>
    </footer>
  );
}

export default Footer;