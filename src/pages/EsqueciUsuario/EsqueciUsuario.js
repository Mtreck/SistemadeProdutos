import React, { useState } from 'react';
import '../EsqueciUsuario/EsqueciUsuario.css';
import { Link } from 'react-router-dom';

function EsqueciUsuario() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRecuperarClick = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email);

    if (user) {
      setUsername(user.nome);
      setMensagem(`Usuário correspondente ao e-mail ${email}: ${user.nome}`);
      
    } else {
      setMensagem(`E-mail ${email} Não foi encotrado`);
    }
  };

  return (
    <div className="recuperar-usuario-container">
      <p className='p-esqeuciusuario'>Email cadastrado:</p>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      <button className='btn-recuperarusuario' onClick={handleRecuperarClick}>Recuperar</button>
      <Link className='link-esqueci-usuario' to="/">voltar</Link>
      <p className='p-recuperarusuario'>{mensagem}</p>
    </div>
  );
}

export default EsqueciUsuario;
