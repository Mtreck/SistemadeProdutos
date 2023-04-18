import React, {useState, useEffect } from 'react';
import'./CadastroProdutos.css'
import Header from '../Header/Header';

function CadastroProduto() {
  const [categorias, setCategorias] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
  });
 
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos cadastrados

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoProduto = { ...formValues };
    setProdutos((prevProdutos) => [...prevProdutos, novoProduto]); // Adicione o novo produto ao estado de produtos
    setFormValues({
      nome: '',
      descricao: '',
      preco: '',
      categoria: '',
    });
    setLocalStorage([...produtos, novoProduto]); // Atualize o localStorage com os produtos atualizados
  };
  // Função para atualizar o localStorage com os produtos atualizados
  function setLocalStorage(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    
  }
  useEffect(() => {
    const storedCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(storedCategorias);
    const storedProdutos = JSON.parse(localStorage.getItem('produtos'));
    if (storedProdutos) {
      setProdutos(storedProdutos);
    }
  }, []);
  const handleCategoriaChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      categoria: event.target.value,
    }));
  };

  return (
    <>
    <Header />
      <form className="cadastro-pro" onSubmit={handleSubmit}>
       <h1 className='h1-produtos'>Cadastrar Produtos</h1>
        <label className='label-produtos'>
          <p>Nome do produto:</p>
          <input
            type="text"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='label-produtos'>
          <p>Descrição do produto:</p>
          <br></br>
          <textarea
            name="descricao"
            value={formValues.descricao}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className='label-produtos'>
          <p>Preço do produto:</p>
          <input
            type="text"
            name="preco"
            value={formValues.preco}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <p>Categoria do produto:</p>
          <select className='categoria-selecao' name="categoria" value={formValues.categoria} onChange={handleCategoriaChange}>
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.numeroCategoria} value={categoria.nomeCategoria}>
                {categoria.nomeCategoria}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br></br>
        <button type="submit">Cadastrar</button>
        <a className='voltar-btn' href="/home">Voltar</a>
      </form>
    </>
  );
}

export default CadastroProduto;
