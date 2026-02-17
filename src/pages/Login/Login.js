import '../Login/Login.css';
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import Modal from '../../components/Modal/Modal';

function Login() {
  const { username, setUsername } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

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
      setModalConfig({
        isOpen: true,
        title: 'Erro de Login',
        message: 'Usuário ou senha incorretos.',
        type: 'error'
      });
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
    <div className="login-page">
      <div className="login-card">
        <h1 className='h1-login'>Login</h1>
        <span className="login-subtitle">Acesse sua conta para gerenciar produtos</span>

        <form className='fomr-login' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="show-password-wrapper" onClick={handleShowPasswordChange}>
              <input
                type="checkbox"
                checked={showPassword}
                readOnly
              />
              <span className='p-mostrar'>Mostrar senha</span>
            </div>
          </div>

          <button className='btn-login' type="submit">Entrar</button>

          <div className="login-footer">
            <Link className='links' to="/cadastro">Não tem conta? Cadastre-se</Link>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link className='links-1' to="/EsqueciUsuario">Esqueci Usuário</Link>
              <Link className='links-2' to="/EsqueciAsenha">Esqueci Senha</Link>
            </div>
          </div>
        </form>
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        type={modalConfig.type}
      >
        <p>{modalConfig.message}</p>
      </Modal>
    </div>
  );
}

export default Login;
