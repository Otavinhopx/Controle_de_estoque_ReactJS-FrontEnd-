import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Produto } from './types';

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showQuantidadeModal, setShowQuantidadeModal] = useState(false);
  const [novoProduto, setNovoProduto] = useState<Produto>({
    id: 0,
    nome: '',
    descricao: '',
    imagem: '',
    valor: '',
    quantidade: '',
    expanded: false
  });
  const [quantidadeEditada, setQuantidadeEditada] = useState<string>('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        const produtosComExpandido = response.data.map((produto: Produto) => ({
          ...produto,
          expanded: false
        }));
        setProdutos(produtosComExpandido);
        setFilteredProdutos(produtosComExpandido);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    const results = produtos.filter(produto =>
      (produto.nome || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProdutos(results);
  }, [searchTerm, produtos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoProduto({
      ...novoProduto,
      [name]: value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidadeEditada(e.target.value);
  };

  const handleAddOrEditProduto = async () => {
    if (novoProduto.id === 0) {
      try {
        const response = await api.post('/produtos', novoProduto);
        const updatedProdutos = [...produtos, { ...response.data, expanded: false }];
        setProdutos(updatedProdutos);
        setFilteredProdutos(updatedProdutos);
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    } else {
      try {
        const response = await api.put(`/produtos/${novoProduto.id}`, novoProduto);
        const updatedProdutos = produtos.map(produto =>
          produto.id === novoProduto.id ? { ...response.data, expanded: false } : produto
        );
        setProdutos(updatedProdutos);
        setFilteredProdutos(updatedProdutos);
      } catch (error) {
        console.error('Erro ao editar produto:', error);
      }
    }
    setShowModal(false);
    setNovoProduto({
      id: 0,
      nome: '',
      descricao: '',
      imagem: '',
      valor: '',
      quantidade: '',
      expanded: false
    });
    window.location.reload()
  };

  
  const handleEditProduto = (produto: Produto) => {
    setNovoProduto(produto);
    setShowModal(true);
  };

  const handleOpenQuantidadeModal = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setShowQuantidadeModal(true);
    setQuantidadeEditada(produto.quantidade);
  };

  const handleUpdateQuantidade = async () => {
    if (produtoSelecionado) {
      try {
        const response = await api.patch(`/produtos/${produtoSelecionado.id}/quantidade`, { quantidade: quantidadeEditada });
        if (response.status === 200) {
          const updatedProdutos = produtos.map(produto =>
            produto.id === produtoSelecionado.id ? { ...produto, quantidade: quantidadeEditada } : produto
          );
          setProdutos(updatedProdutos);
          setFilteredProdutos(updatedProdutos);
          setShowQuantidadeModal(false);
          setQuantidadeEditada('');
        } else {
          console.error('Erro ao alterar quantidade:', response.data);
        }
      } catch (error) {
        console.error('Erro ao alterar quantidade:', error);
      }
    }
  };

  const handleDeleteProduto = async (produtoId: number) => {
    const confirmar = window.confirm("Tem certeza de que deseja excluir este produto?");
    if (confirmar) {
      try {
        await api.delete(`/produtos/${produtoId}`);
        const updatedProdutos = produtos.filter(produto => produto.id !== produtoId);
        setProdutos(updatedProdutos);
        setFilteredProdutos(updatedProdutos);
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient min-h-screen relative">
      <div className="absolute top-4 left-4">
        <img src={require('../assets/logo.png')} alt="Logo" className="w-24 h-auto" />
      </div>

      <div className="mb-10 ml-20 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-19 p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
          onClick={() => {
            setNovoProduto({
              id: 0,
              nome: '',
              descricao: '',
              imagem: '',
              valor: '',
              quantidade: '',
              expanded: false
            });
            setShowModal(true);
          }}
        >
          Adicionar Produto
        </button>
      </div>
  
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {filteredProdutos.map((produto) => (
          <div key={produto.id} className="bg-white rounded shadow-md cursor-pointer p-4" >
            <div className="flex justify-center mb-2">
              <img src={produto.imagem} alt={produto.nome} className="w-20 h-20 object-cover rounded" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold">{produto.nome}</h3>
              <div className="text-xs">
                <p>{produto.descricao}</p>
                <p><strong>Valor:</strong> {produto.valor}</p>
                <p><strong>Quantidade:</strong> {produto.quantidade}</p>
                <button
                  className="mr-1 bg-gray-500 text-white rounded hover:bg-gray-600 p-1"
                  onClick={(e) => { e.stopPropagation(); handleEditProduto(produto); }}
                >
                  Editar
                </button>
                <button
                  className="mr-1 bg-gray-500 text-white rounded hover:bg-gray-600 p-1"
                  onClick={(e) => { e.stopPropagation(); handleOpenQuantidadeModal(produto); }}
                >
                  Alterar Quantidade
                </button>
                <button
                  className="bg-gray-500 text-white rounded hover:bg-gray-600 p-1"
                  onClick={(e) => { e.stopPropagation(); handleDeleteProduto(produto.id); }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{novoProduto.id === 0 ? 'Adicionar Produto' : 'Editar Produto'}</h2>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              name="nome"
              placeholder="Nome do Produto"
              value={novoProduto.nome}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              name="descricao"
              placeholder="Descrição do Produto"
              value={novoProduto.descricao}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              name="imagem"
              placeholder="URL da Imagem"
              value={novoProduto.imagem}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              name="valor"
              placeholder="Valor do Produto"
              value={novoProduto.valor}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              name="quantidade"
              placeholder="Quantidade"
              value={novoProduto.quantidade}
              onChange={handleInputChange}
            />
            <button
              className="bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
              onClick={handleAddOrEditProduto}
            >
              Salvar
            </button>
            <button
              className="ml-2 bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {showQuantidadeModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Alterar Quantidade</h2>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="number"
              placeholder="Nova Quantidade"
              value={quantidadeEditada}
              onChange={handleQuantidadeChange}
            />
            <button
              className="bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
              onClick={handleUpdateQuantidade}
            >
              Salvar
            </button>
            <button
              className="ml-2 bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
              onClick={() => setShowQuantidadeModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
