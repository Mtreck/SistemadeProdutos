import React, { useState, useEffect } from 'react';
import './Cards.css';

function Cards() {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const storedCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
    setCategorias(storedCategorias);

    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(storedProdutos);
  }, []);

  function countItemsInCategory(categoria) {
    return produtos.filter((produto) => produto.categoria === categoria).length;
  }

  // Helper icons based on category name or generic
  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('eletr')) return 'devices';
    if (n.includes('alim') || n.includes('comida')) return 'restaurant';
    if (n.includes('roupa') || n.includes('moda')) return 'checkroom';
    if (n.includes('móvel') || n.includes('casa')) return 'home';
    return 'inventory_2';
  };

  return (
    <div className='cards-container'>
      <div className='cards-header'>
        <h2 className='cards-title'>Resumo por Categoria</h2>
        <span className='cards-subtitle'>Distribuição do inventário atual</span>
      </div>
      <div className='div-cards-grid'>
        {categorias.length > 0 ? (
          categorias.map((categoria, index) => (
            <div key={index} className="category-card glass-morphism">
              <div className="card-icon-wrapper">
                <span className="material-icons-round card-icon">{getIcon(categoria.nomeCategoria)}</span>
              </div>
              <div className="card-info">
                <h3 className='h3-cards'>{categoria.nomeCategoria}</h3>
                <div className="card-stats">
                  <span className='item-count'>{countItemsInCategory(categoria.nomeCategoria)}</span>
                  <span className='item-label'>ITENS</span>
                </div>
              </div>
              <div className="card-progress-bar">
                <div
                  className="card-progress-fill"
                  style={{ width: `${Math.min(100, (countItemsInCategory(categoria.nomeCategoria) / (produtos.length || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-cards glass-morphism">
            <span className="material-icons-round">info</span>
            <p>Nenhuma categoria cadastrada para exibir.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
