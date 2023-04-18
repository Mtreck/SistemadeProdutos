import React, { useState, useEffect } from 'react';
import './CadastroCategoria.css';
import Header from '../Header/Header';

function CadastroCategoria() {
  const [formValues, setFormValues] = useState({
    numeroCategoria: '',
    nomeCategoria: '',
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
      alert('Já existe uma categoria com esse nome ou número.');
      return;
    }
    const novaCategoria = { ...formValues };
    setCategorias([...categorias, novaCategoria]);
    setFormValues({ numeroCategoria: '', nomeCategoria: '' });
    localStorage.setItem('categorias', JSON.stringify([...categorias, novaCategoria]));
  };

  const handleDelete = (numeroCategoria) => {
    const novasCategorias = categorias.filter((categoria) => categoria.numeroCategoria !== numeroCategoria);
    setCategorias(novasCategorias);
    localStorage.setItem('categorias', JSON.stringify(novasCategorias));
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
    <>
      <Header />
      <form className="cadastro-categ" onSubmit={handleSubmit}>
        <h1 className='h1-categorias'>Cadastro categorias</h1>
        <label className='label1'>
          <p>Número da categoria:</p>
          <input
            className='inp1'
            type="number"
            name="numeroCategoria"
            value={formValues.numeroCategoria}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <p>Nome da categoria:</p>
          <input
            className='inp2'
            type="text"
            name="nomeCategoria"
            value={formValues.nomeCategoria}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
        <a className='voltar-btn' href="/home">Voltar</a>
      </form>
      <ListaCategorias categorias={categorias} onDelete={handleDelete} />
    </>
  );
}

function ListaCategorias({ categorias, onDelete }) {
  return (
    <div className='div-categoria'>
      <h2 className='h2-cat'>Lista de categorias</h2>
      <ul className='ul-categorias'>
        {categorias.map((categoria) => (
          <li className='li-categoria' key={categoria.numeroCategoria}>
            {categoria.numeroCategoria} - {categoria.nomeCategoria}
            <button className='excluir-categorias' onClick={() => onDelete(categoria.numeroCategoria)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroCategoria;
