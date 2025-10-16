import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPokemones = async () => {
      const res = await fetch('http://localhost:3002/pokemon');
      const data = await res.json();
      setPokemones(data.results);
      setCargando(false); // La carga terminó, lo ponemos en false
    };

    obtenerPokemones();
  }, []);

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
        onChange={(e) => setBusqueda(e.target.value)} 
      />

      {cargando ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <div className="pokedex-grid">
          {pokemonesFiltrados.map(pokemon => {
            // Extraemos el ID del Pokémon de la URL
            const pokemonId = pokemon.url.split('/')[6];

            return (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} className="pokemon-link">
              <div className="pokemon-card" key={pokemon.name}>
                {/* Mostramos el ID que acabamos de extraer */}
                <p className="pokemon-id">#{pokemonId}</p> 
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} 
                  alt={pokemon.name} 
                />
                <p>{pokemon.name}</p>
              </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;