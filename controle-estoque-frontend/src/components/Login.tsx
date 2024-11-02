import React, {useState} from 'react';
import api from '../services/api'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', {email, senha});
            console.log('Sucesso ao entrar: ', response.data);
            navigate('/produtos');
        }
        catch(error) {
            setMensagem('Erro ao fazer login');
            console.error('Erro ao fazer o login: ', error)
        }
    };

    const handleCadastro = () => { 
        navigate('/cadastro'); 
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    type='password'
                    placeholder='Senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button 
                    className="w-full p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
                    type='submit'>Entrar</button>
                    {mensagem && <p>{mensagem}</p>}
                <button 
                    className="w-full p-3 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={handleCadastro}>Cadastrar</button>
            </form>
        </div>
    </div>
    )
};

export default Login;