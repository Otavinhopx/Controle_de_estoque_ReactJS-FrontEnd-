import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import Produtos from './components/products';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/produtos" element={<Produtos/>} />
            <Route path="/" element={<Cadastro/>} />
        </Routes>
    </Router>
)

export default AppRoutes;