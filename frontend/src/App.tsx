// frontend/src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  // useEffect se ejecuta una vez cuando el componente carga
  useEffect(() => {
    const obtenerPokemones = async () => {
      // Le pedimos los datos a NUESTRO backend
      const res = await fetch('http://localhost:3002/pokemon');
      const data = await res.json();

      // La API nos da un objeto { results: [...] }, extraemos la lista
      setPokemones(data.results); 
    };

    obtenerPokemones();
  }, []); // El array vacío asegura que solo se ejecute una vez

  // Filtramos la lista de Pokémon en base a la búsqueda
  const pokemonesFiltrados = pokemones.filter(poke => 
    poke.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Mi Pokédex</h1>
      <input 
        type="text"
        placeholder="Buscar Pokémon..."
        className="search-bar"
        // Cada vez que escribes, actualizamos el estado 'busqueda'
        onChange={(e) => setBusqueda(e.target.value)} 
      />
      <div className="pokedex-grid">
        {pokemonesFiltrados.map(pokemon => {
          const pokemonId = pokemon.url.split('/')[6]; // Extraemos el ID del Pokémon de la URL
          return (
            <div className="pokemon-card" key={pokemon.name}>
              {/* La API no nos da la imagen directamente, pero podemos construir la URL */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;