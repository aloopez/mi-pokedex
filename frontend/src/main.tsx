// frontend/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Importamos las herramientas del router ---
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PokemonDetail from './PokemonDetail.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*Envolvemos todo en el BrowserRouter --- */}
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: Muestra la lista de Pokémon */}
        <Route path="/" element={<App />} />
        {/* Ruta de detalle: Muestra el componente de detalle */}
        <Route path="/pokemon/:nombre" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)