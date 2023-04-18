import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../UserContext';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Cards from '../Cards/Cards'
import ExcluirItem from '../ExcluirItems/ExcluirItems';

function Home() {
  const navigate = useNavigate();
  const { username } = useContext(UserContext);

  const [produtos, setProdutos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Carrega os produtos armazenados no localStorage
    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(storedProdutos);

    // Carrega as categorias armazenadas no localStorage
    const storedCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(storedCategorias);
  }, []);

  // Função para adicionar um novo produto à lista de produtos
  function adicionarProduto(novoProduto) {
    setProdutos((prevProdutos) => {
      const newProdutos = [...prevProdutos, novoProduto];
      setLocalStorage(newProdutos); // Atualize o localStorage com os produtos atualizados
      return newProdutos;
    });
  }

  // Função para excluir um produto da lista de produtos
  function excluirProduto(produtoParaExcluir) {
    setProdutos((prevProdutos) => {
      const newProdutos = prevProdutos.filter(
        (produto) => produto.nome !== produtoParaExcluir.nome
      );
      setLocalStorage(newProdutos); // Atualize o localStorage com os produtos atualizados
      return newProdutos;
    });
  }

  // Função para atualizar o valor de pesquisa do usuário
  function handleSearchInputChange(event) {
    setSearchValue(event.target.value);
  }

  function setLocalStorage(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }

  // Filtra os produtos com base no valor de pesquisa do usuário
  const produtosFiltrados = produtos.filter((produto) => {
    const nomeLower = produto.nome.toLowerCase();
    const categoriaLower = produto.categoria.toLowerCase();
    const searchLower = searchValue.toLowerCase();
  
    return nomeLower.includes(searchLower) || categoriaLower.includes(searchLower);
  });

  return (
    <div>
      <Header />
      <main>
        <div className="search-bar">
          <input className='input-pesquisa'
            type="text"
            placeholder="Pesquisar por nome ou categoria"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.nome}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.preco}</td>
                <td>{produto.categoria}</td>
                <td>
                  <ExcluirItem item={produto} onClick={excluirProduto} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              <Cards />
      </main>
    
    </div>
  );
}

export default Home;
