import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logolugarzinho.webp'; // Ajuste o caminho conforme a localização da sua logo

function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logotipo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center hover:text-gray-200 transition-colors">
            <img src={logo} alt="Logo da Imobiliária" className="h-12 w-12 mr-3 rounded-full" />
            <span className="text-white text-2xl font-bold">
              Imobiliária
            </span>
          </Link>
        </div>
        {/* Menu de Navegação */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/users" className="text-white hover:text-gray-200 transition-colors">
              Usuários
            </Link>
          </li>
          <li>
            <Link to="/properties" className="text-white hover:text-gray-200 transition-colors">
              Propriedades
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="text-white hover:text-gray-200 transition-colors">
              Agendamentos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
