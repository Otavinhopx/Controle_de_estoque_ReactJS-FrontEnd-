import React, {useState} from 'react';
import api from '../services/api'
import { useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.post('/usuarios', {nome, email, senha});
            setMensagem('Usuário Cadastrado!')
            navigate('/login')
        }
        catch(error) {
            setMensagem('Erro ao cadastrar');
            console.error('Erro ao cadastrar: ', error)
        }
    };

    const handleLogin = () => { 
        navigate('/login'); 
    };

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type='submit'>Cadastrar</button>
                {mensagem && <p>{mensagem}</p>}
                <button onClick={handleLogin}>Já tem uma conta? Faça login</button>
            </form>
        </div>
    )
};

export default Cadastro;