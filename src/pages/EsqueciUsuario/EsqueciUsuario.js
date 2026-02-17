import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

function EsqueciUsuario() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMensagem(`Seu nome de usuário foi enviado para ${email}`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className='h1-login'>Recuperar Usuário</h1>
        <span className="login-subtitle">Esqueceu seu nome de acesso? Nós ajudamos</span>

        <form className='fomr-login' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail cadastrado</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className='btn-login' type="submit">Recuperar</button>

          {mensagem && <p style={{ color: 'var(--neon-green)', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{mensagem}</p>}

          <div className="login-footer">
            <Link className='links' to="/">Voltar para o Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EsqueciUsuario;
