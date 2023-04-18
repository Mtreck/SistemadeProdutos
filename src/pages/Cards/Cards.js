import React, { useState, useEffect } from 'react';
import './Cards.css'
import { useNavigate } from 'react-router-dom';


function Cards() {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca as categorias armazenadas no localStorage
    const storedCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(storedCategorias);

    // Busca os produtos armazenados no localStorage
    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(storedProdutos);
  }, []);

  // Função para contar a quantidade de itens em uma categoria
  function countItemsInCategory(categoria) {
    return produtos.filter((produto) => produto.categoria === categoria).length;
  }

  return (
    <div className='div-cards'>
      {categorias.map((categoria, index) => (
        <div key={index} className="category-card">
          <h3 className='h3-cards'>{categoria.nome}</h3>
          <p className='p-cards'>{countItemsInCategory(categoria.nome)} itens</p>
        </div>
      ))}
    </div>
  );
}

export default Cards;
