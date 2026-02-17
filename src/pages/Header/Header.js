import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import UserContext from '../../UserContext';
import { Link } from 'react-router-dom';


function Header() {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera o nome de usuário armazenado em localStorage, se disponível
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setUsername]);

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('username');
    navigate('/');
  }
  return (
    <div className="header">
      <div className="brand-section">
        <div className="app-logo">
          <span className="material-icons-round">analytics</span>
          <span>ProStock</span>
        </div>
        <div className="user-welcome">
          <p className='p-header'>Bem-Vindo,</p>
          <h1 className='h1-user'>{username}</h1>
        </div>
      </div>
      <div className="nav-links">
        <Link className='link-cad-home' to="/home">Home</Link>
        <Link className='link-cad-categorias' to="/cadastro-categoria">Categorias</Link>
        <Link className='link-cad-produtos' to="/cadastro-produtos">Produtos</Link>
      </div>

      <button className='logout-btn' onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

export default Header;