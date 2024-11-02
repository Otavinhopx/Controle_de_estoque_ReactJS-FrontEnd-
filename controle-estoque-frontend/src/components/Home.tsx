import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Inicio: React.FC = () => {
  const navigate = useNavigate();

  const handleAcessar = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient text-center">
      <img src={require('../assets/logo.png')} alt="Logo" className="w-100 h-auto mb-10 animate-spin-slow" />
      <h1 className="text-7xl font-bold text-gray-800 mb-6">Bem-vindo ao BoxTock!</h1>
      <button
        onClick={handleAcessar}
        className="px-10 py-2 text-white bg-gray-500 hover:bg-gray-700 rounded-md"
      >
        Acessar
      </button>
    </div>
  );
};

export default Inicio;
