import React, {useState} from 'react';
import api from '../services/api'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await api.post('/usuarios', {email, senha});
            console.log('Sucesso ao entrar: ', response.data);
        }
        catch(error) {
            console.error('Erro ao fazer o login: ', error)
        }
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
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
};

export default Login;