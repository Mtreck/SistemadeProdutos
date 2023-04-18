import React, { useContext, useState } from 'react';
import './CadastroUsuario.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import Header from '../Header/Header';

function CadastroUsuario() {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [nome, setNome] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [senhaConfirmada, setSenhaConfirmada] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Verifica se todos os campos estão preenchidos
    const isFormValid = Object.values(formValues).every((value) => value);
  
    if (isFormValid && formValues.senha === formValues.confirmarSenha) {
      const newUser = {
        nome,
        email: formValues.email,
        senha: formValues.senha,
      };
  
      // Armazena o novo usuário em localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
  
      setUsername(newUser.nome);
      navigate('/');
    } else {
      if (!isFormValid) {
        alert('Por favor, preencha todos os campos.');
      } else {
        alert('As senhas não são iguais');
      }
    }
  };
  const handleChange = (event) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: event.target.value,
    }));
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit} className="cadastro-form">
      <h1 className='h1-cadastroUsuario'>Cadastrar</h1>
      <label>
        <p className='p=cadastrousurio'>usuário:</p>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={handleNomeChange}
        />
      </label>
      <br></br>
      <br></br>
      <label>
      <p className='p=cadastrousurio'>E-mail:</p>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <br></br>
      <label>
      <p className='p=cadastrousurio'>Senha:</p>
        <input
          type={showPassword ? 'text' : 'password'}
          name="senha"
          value={formValues.senha}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <br></br>
      <label>
      <p className='p=cadastrousurio'>Confirmar senha:</p>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmarSenha"
          value={formValues.confirmarSenha}
          onChange={handleChange}
        />
      </label>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleShowPassword}
          />
          Mostrar senha
        </label>
        <br></br>
      <br></br>
      </div>
      <button type="submit">Cadastrar</button>
      <Link className='link-cadastrousuario' to="/">voltar</Link>
    </form>
  );

}

export default CadastroUsuario;
