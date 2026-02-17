import React, { useState, useEffect } from 'react';
import './CadastroProdutos.css'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

function CadastroProduto() {
  const [categorias, setCategorias] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    categoria: '',
  });

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const [produtos, setProdutos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValues.categoria) {
      setModalConfig({
        isOpen: true,
        title: 'Atenção',
        message: 'Por favor, selecione uma categoria.',
        type: 'warning'
      });
      return;
    }
    const novoProduto = { ...formValues };
    const updatedProdutos = [...produtos, novoProduto];
    setProdutos(updatedProdutos);
    setFormValues({
      nome: '',
      descricao: '',
      preco: '',
      quantidade: '',
      categoria: '',
    });
    localStorage.setItem('produtos', JSON.stringify(updatedProdutos));
    setModalConfig({
      isOpen: true,
      title: 'Sucesso',
      message: 'Produto cadastrado com sucesso!',
      type: 'success'
    });
  };

  useEffect(() => {
    const storedCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(storedCategorias);
    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(storedProdutos);
  }, []);

  const handleCategoriaChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      categoria: event.target.value,
    }));
  };

  return (
    <div className="cadastro-container">
      <Header />
      <div className="cadastro-card">
        <h1 className='h1-cadastro'>Cadastrar Novo Produto</h1>
        <form className="form-cadastro" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do produto</label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: Teclado Mecânico"
              value={formValues.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              placeholder="Breve descrição do produto..."
              value={formValues.descricao}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              name="preco"
              placeholder="0.00"
              value={formValues.preco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantidade em Estoque</label>
            <input
              type="number"
              name="quantidade"
              placeholder="Ex: 50"
              value={formValues.quantidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select name="categoria" value={formValues.categoria} onChange={handleCategoriaChange} required>
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.numeroCategoria} value={categoria.nomeCategoria}>
                  {categoria.nomeCategoria}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-form" type="submit">Finalizar Cadastro</button>
          <Link className='btn-voltar' to="/home">Voltar ao Início</Link>
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

export default CadastroProduto;
