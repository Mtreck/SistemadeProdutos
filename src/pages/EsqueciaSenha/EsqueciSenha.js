import React, { useState } from 'react';
import '../EsqueciaSenha/EsqueciSenha.css';
import { Link } from 'react-router-dom';

function EsqueciSenha() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.nome === username && u.email === email);

    if (user) {
      setPassword(user.senha);
      alert(`Sua senha é:  ${user.senha}`);
    } else {
      alert('Usuário ou e-mail incorretos.');
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="esqueci-senha">
      <form  onSubmit={handleSubmit}>
        <h1 className='h1-recuperarsenha'>Esqueci minha senha</h1>
        <label>
         <p className='p-esqeuci-senha'> Usuário:</p>
          <input type="text" name="username" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          <p className='p-esqeuci-senha'>E-mail: </p>
          <input type="email" name="email" value={email} onChange={handleEmailChange} />
        </label>
        <button className='btn1-esqeuci-senha' type="submit">Recuperar</button>
        <Link className='link-esqueciAsenha' to="/">voltar</Link>
      </form>
      {password && (
        <div className="senha-container">
          <p className='senha'>Sua senha é: {password}</p><p></p>
        </div>
      )}
    </div>
  );
}

export default EsqueciSenha;
