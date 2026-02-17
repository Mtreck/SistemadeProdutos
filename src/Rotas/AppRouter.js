import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from '../UserContext';
import Home from '../pages/home/home';
import CadastroUsuario from '../pages/cadastroUsuario/CadastroUsuario';
import CadastroCategoria from '../pages/CadastroCategoria/CadastroCategoria';
import CadastroProdutos from '../pages/CadastroProdutos/CadastroProdutos';
import Login from '../pages/Login/Login';
import EsqueciAsenha from '../pages/EsqueciaSenha/EsqueciSenha';
import EsqueciUsuario from '../pages/EsqueciUsuario/EsqueciUsuario';



function AppRouter() {
  const [username, setUsername] = useState('');
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/EsqueciAsenha" element={<EsqueciAsenha />} />
          <Route path="/EsqueciUsuario" element={<EsqueciUsuario />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-categoria" element={<CadastroCategoria />} />
          <Route path="/cadastro-produtos" element={<CadastroProdutos />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default AppRouter;