import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Produto } from './types'; // Importar a interface Produto

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [novoProduto, setNovoProduto] = useState<Produto>({
    id: 0,
    nome: '',
    descricao: '',
    imagem: '',
    valor: '',
    quantidade: ''
  });

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoProduto({
      ...novoProduto,
      [name]: value
    });
  };

  const handleAddProduto = async () => {
    try {
      const response = await api.post('/produtos', novoProduto);
      setProdutos([...produtos, response.data]);
      setShowModal(false);
      setNovoProduto({
        id: 0,
        nome: '',
        descricao: '',
        imagem: '',
        valor: '',
        quantidade: ''
      });
      window.location.reload(); // Forçar o recarregamento da página
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleEditProduto = (produtoId: number) => {
    // Função para editar produto
  };

  const handleUpdateQuantidade = (produtoId: number) => {
    // Função para atualizar quantidade
  };

  const handleDeleteProduto = (produtoId: number) => {
    // Função para deletar produto
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        className="mb-4 bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
        onClick={() => setShowModal(true)}
      >
        Adicionar Produto
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white rounded shadow-md p-4">
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
                  onClick={() => handleEditProduto(produto.id)}
                >
                  Editar
                </button>
                <button
                  className="mr-1 bg-gray-500 text-white rounded hover:bg-gray-600 p-1"
                  onClick={() => handleUpdateQuantidade(produto.id)}
                >
                  Alterar Quantidade
                </button>
                <button
                  className="bg-gray-500 text-white rounded hover:bg-gray-600 p-1"
                  onClick={() => handleDeleteProduto(produto.id)}
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
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Nome"
              name="nome"
              value={novoProduto.nome}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Descrição"
              name="descricao"
              value={novoProduto.descricao}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Imagem (URL)"
              name="imagem"
              value={novoProduto.imagem}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Valor"
              name="valor"
              value={novoProduto.valor}
              onChange={handleInputChange}
            />
            <input
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Quantidade"
              name="quantidade"
              value={novoProduto.quantidade}
              onChange={handleInputChange}
            />
            <button
              className="bg-gray-500 text-white rounded hover:bg-gray-600 p-2"
              onClick={handleAddProduto}
            >
              Adicionar Produto
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
    </div>
  );
};

export default Produtos;
