import React, { useState } from 'react';
import './EsqueciSenha.css';
import { Link } from 'react-router-dom';

function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulação de envio de link de recuperação
    setMensagem(`Um link de recuperação foi enviado para ${email}`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className='h1-login'>Recuperar Senha</h1>
        <span className="login-subtitle">Enviaremos as instruções para o seu e-mail</span>

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

          <button className='btn-login' type="submit">Enviar Link</button>

          {mensagem && <p style={{ color: 'var(--neon-green)', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{mensagem}</p>}

          <div className="login-footer">
            <Link className='links' to="/">Voltar para o Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EsqueciSenha;
