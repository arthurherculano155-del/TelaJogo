import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Pages/Inicio/Inicio.jsx';
import NormalMode from './Pages/ModoNormal/NormalMode.jsx';
import HardMode from './Pages/ModoDificil/HardMode.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/normal' element={<NormalMode />}/>
            <Route path='/hard' element={<HardMode />}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
