import '../Login/Login.css';
import { Link } from 'react-router-dom';
import React, {useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';

function Login() {
  const { username, setUsername } = useContext
  (UserContext);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Recupera os usuários cadastrados em localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Verifica se o nome de usuário e senha informados correspondem a algum usuário cadastrado
    const user = users.find((u) => u.nome === username && u.senha === password);
  
    if (user) {
      setUsername(user.nome);
      localStorage.setItem('username', user.nome);
      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos.');
    }
  };
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="login-container">
      <form className='fomr-login' onSubmit={handleSubmit}>
        <h1 className='h1-login'>Login</h1>
        <label>
          Usuário:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Senha:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />
          <p className='p-mostrar'>Mostrar senha</p>
        </label>
        <button className='btn-login' type="submit">Entrar</button>
        <Link className='links' to="/cadastro">Cadastre-se aqui</Link>
        <Link className='links-2'  to="/EsqueciAsenha">Esqueci a Senha</Link>
        <Link className='links-1' to="/EsqueciUsuario">Esqueci o Usuário</Link>
      </form>
   
    </div>
  );
}

export default Login;
