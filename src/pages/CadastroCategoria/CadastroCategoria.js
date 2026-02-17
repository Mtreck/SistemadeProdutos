import React, { useState, useEffect } from 'react';
import './CadastroCategoria.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

function CadastroCategoria() {
  const [formValues, setFormValues] = useState({
    numeroCategoria: '',
    nomeCategoria: '',
  });

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const [categorias, setCategorias] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isDuplicate()) {
      setModalConfig({
        isOpen: true,
        title: 'Categoria Duplicada',
        message: 'Já existe uma categoria com esse nome ou número.',
        type: 'warning'
      });
      return;
    }
    const novaCategoria = { ...formValues };
    const updatedCategorias = [...categorias, novaCategoria];
    setCategorias(updatedCategorias);
    setFormValues({ numeroCategoria: '', nomeCategoria: '' });
    localStorage.setItem('categorias', JSON.stringify(updatedCategorias));
  };

  const handleDelete = (numeroCategoria) => {
    if (window.confirm('Deseja realmente excluir esta categoria?')) {
      const novasCategorias = categorias.filter((categoria) => categoria.numeroCategoria !== numeroCategoria);
      setCategorias(novasCategorias);
      localStorage.setItem('categorias', JSON.stringify(novasCategorias));
    }
  }

  const isDuplicate = () => {
    return categorias.some(
      (categoria) =>
        categoria.numeroCategoria === formValues.numeroCategoria ||
        categoria.nomeCategoria === formValues.nomeCategoria
    );
  };

  useEffect(() => {
    const categoriasSalvas = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(categoriasSalvas);
  }, []);

  return (
    <div className="cadastro-categ-container">
      <Header />
      <div className="cadastro-card-categ">
        <h1 className='h1-categorias'>Nova Categoria</h1>
        <form className="form-cadastro" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Número da categoria</label>
            <input
              type="number"
              name="numeroCategoria"
              placeholder="Ex: 101"
              value={formValues.numeroCategoria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nome da categoria</label>
            <input
              type="text"
              name="nomeCategoria"
              placeholder="Ex: Eletrônicos"
              value={formValues.nomeCategoria}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn-form" type="submit">Cadastrar Categoria</button>
          <Link className='btn-voltar' to="/home">Voltar</Link>
        </form>
      </div>

      <div className='div-categoria'>
        <h2 className='h2-cat'>Categorias Existentes</h2>
        <ul className='ul-categorias'>
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <li className='li-categoria' key={categoria.numeroCategoria}>
                <div className="cat-info">
                  <span className="cat-number">#{categoria.numeroCategoria}</span>
                  <span className="cat-name">{categoria.nomeCategoria}</span>
                </div>
                <button className='excluir-categorias' onClick={() => handleDelete(categoria.numeroCategoria)}>
                  Excluir
                </button>
              </li>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', gridColumn: '1/-1' }}>
              Nenhuma categoria cadastrada.
            </p>
          )}
        </ul>
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

export default CadastroCategoria;
