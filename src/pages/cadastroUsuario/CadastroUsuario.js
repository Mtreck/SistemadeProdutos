import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroUsuario.css';
import Modal from '../../components/Modal/Modal';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onClose: null
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      setModalConfig({
        isOpen: true,
        title: 'Erro na Senha',
        message: 'As senhas não coincidem.',
        type: 'error'
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((u) => u.nome === nome);

    if (userExists) {
      setModalConfig({
        isOpen: true,
        title: 'Usuário já existe',
        message: 'Este nome de usuário já está em uso.',
        type: 'warning'
      });
      return;
    }

    const newUser = { nome, senha };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    setModalConfig({
      isOpen: true,
      title: 'Sucesso',
      message: 'Usuário cadastrado com sucesso!',
      type: 'success',
      onClose: () => navigate('/')
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className='h1-login'>Criar Conta</h1>
        <span className="login-subtitle">Junte-se ao sistema de gerenciamento</span>

        <form className='fomr-login' onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Escolha um nome de usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha forte"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              placeholder="Repita sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button className='btn-login' type="submit">Cadastrar</button>

          <div className="login-footer">
            <Link className='links' to="/">Já tem uma conta? Faça Login</Link>
          </div>
        </form>
      </div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => {
          if (modalConfig.onClose) modalConfig.onClose();
          setModalConfig({ ...modalConfig, isOpen: false });
        }}
        title={modalConfig.title}
        type={modalConfig.type}
      >
        <p>{modalConfig.message}</p>
      </Modal>
    </div>
  );
}

export default CadastroUsuario;
