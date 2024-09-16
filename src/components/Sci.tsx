import React, { useState } from 'react';
import './sci.css';
import { scis, scis_mobile } from '@/data/data';

export default function Sci() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sci-container">
      {/* Botão para abrir/fechar o menu */}
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu lateral que desliza da esquerda */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {scis.map(sci => (
            <li key={sci.id}>
              <a href={sci.link} className="menu-item">
                <i className={`bi ${sci.icon}`}></i> {/* Ícone */}
                <span className="menu-label">{sci.label}</span> {/* Rótulo */}
              </a>
            </li>
          ))}
        </ul>

        <ul className="scis-mobile">
        {scis_mobile.map(sci => (
            <li key={sci.id}>
              <a href={sci.link} className="menu-item">
                <i className={`bi ${sci.icon}`}></i> {/* Ícone */}
                <span className="menu-label">{sci.label}</span> {/* Rótulo */}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay para fechar o menu ao clicar fora dele */}
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
}
