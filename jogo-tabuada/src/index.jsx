import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Pages/Inicio/Inicio.jsx';
import NormalMode from './Pages/ModoNormal/NormalMode.jsx';
import HardMode from './Pages/ModoDificil/HardMode.jsx';
import NotFound from './Pages/Modo-Nao-Encontrado/notfound.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/normal' element={<NormalMode />}/>
            <Route path='/hard' element={<HardMode />}/>

            <Route path='*' element={<NotFound />}/>
        </Routes>
    </HashRouter>
  </React.StrictMode>
);
