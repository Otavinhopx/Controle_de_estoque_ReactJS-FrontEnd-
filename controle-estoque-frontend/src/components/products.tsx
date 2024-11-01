import React, {useEffect, useState} from 'react';
import api from '../services/api'

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
    valor: number;
    quantidade: number;
}

const Produtos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        api.get('/produtos').then(response => {
            setProdutos(response.data)
        })
    .catch(error => {
        console.error('Erro ao buscar produtos', error);
    });
}, []);
    
    return (
        <div>
            <h1>Produtos</h1>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        {produto.nome} - {produto.descricao} - {produto.imagem} - R${produto.valor} - {produto.quantidade} unidades
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Produtos;