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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Login</button>
                {mensagem && <p>{mensagem}</p>}
                <button onClick={handleCadastro}>Cadastrar</button>
            </form>
        </div>
    )
};

export default Login;