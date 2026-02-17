import { useState, useEffect } from 'react';
import './home.css';
import Header from '../Header/Header';
import Cards from '../Cards/Cards'
import ExcluirItem from '../ExcluirItems/ExcluirItems';
import Modal from '../../components/Modal/Modal';

function Home() {

  const [produtos, setProdutos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  useEffect(() => {
    // Carrega os produtos armazenados no localStorage
    const storedProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(storedProdutos);

    // Verifica itens com estoque baixo (menor que 5)
    const itensBaixoEstoque = storedProdutos.filter(p => Number(p.quantidade) < 5);
    if (itensBaixoEstoque.length > 0) {
      setModalConfig({
        isOpen: true,
        title: 'Alerta de Estoque Baixo',
        message: `Os seguintes itens estão com estoque baixo: ${itensBaixoEstoque.map(i => i.nome).join(', ')}`,
        type: 'warning'
      });
    }
  }, []);

  // Função para excluir um produto da lista de produtos
  function excluirProduto(produtoParaExcluir) {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${produtoParaExcluir.nome}"?`)) {
      setProdutos((prevProdutos) => {
        const newProdutos = prevProdutos.filter(
          (produto) => produto.nome !== produtoParaExcluir.nome
        );
        setLocalStorage(newProdutos);
        return newProdutos;
      });
    }
  }

  function handleSearchInputChange(event) {
    setSearchValue(event.target.value);
  }

  function setLocalStorage(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const nomeLower = (produto.nome || '').toLowerCase();
    const categoriaLower = (produto.categoria || '').toLowerCase();
    const searchLower = searchValue.toLowerCase();

    return nomeLower.includes(searchLower) || categoriaLower.includes(searchLower);
  });

  return (
    <div className="home-container">
      <Header />
      <main>
        <section className="search-section">
          <div className="search-bar">
            <span className="material-icons-round search-icon">search</span>
            <input className='input-pesquisa'
              type="text"
              placeholder="Pesquisar por nome ou categoria..."
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </div>
        </section>

        <section className="table-section">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Categoria</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((produto, index) => (
                    <tr key={index}>
                      <td>
                        <div style={{ fontWeight: '600' }}>{produto.nome}</div>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{produto.descricao}</div>
                      </td>
                      <td className="price-cell">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                      </td>
                      <td>
                        <div style={{
                          fontWeight: '600',
                          color: Number(produto.quantidade) < 5 ? '#ff4444' : 'inherit'
                        }}>
                          {produto.quantidade || 0}
                        </div>
                      </td>
                      <td>
                        <span className="category-tag">{produto.categoria}</span>
                      </td>
                      <td className="delete-btn-cell">
                        <ExcluirItem item={produto} onClick={excluirProduto} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <Cards />
      </main>

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

export default Home;
