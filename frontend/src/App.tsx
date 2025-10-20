import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaNumero, setBusquedaNumero] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPokemones = async () => {
      const res = await fetch("http://localhost:3002/pokemon");
      const data = await res.json();
      setPokemones(data.results);
      setCargando(false); // La carga terminó, lo ponemos en false
    };

    obtenerPokemones();
  }, []);

  const pokemonesFiltrados = pokemones.filter((poke) => {
    const id = poke.url.split("/")[6];
    const pokemonIdNumber = parseInt(id, 10);

    const coincideNombre = busqueda
      ? poke.name.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    const coincideId = busquedaNumero > 0
      ? pokemonIdNumber === busquedaNumero
      : true;
    return coincideNombre && coincideId;
  });

  return (
    <div className="App">
      <h1>Mi Pokédex</h1>
      <div className="search-instructions">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          className="search-bar"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <input
          type="number"
          min={1}
          step={1}
          max={151}
          placeholder="Buscar Pokémon por ID..."
          className="search-bar"
          onChange={(e) => {
            const val = (e.target as HTMLInputElement).valueAsNumber;
            setBusquedaNumero(Number.isNaN(val) ? 0 : val);
          }}
        />
      </div>

      {cargando ? (
        <p>Cargando Pokémon...</p>
      ) : (
        <div className="pokedex-grid">
          {pokemonesFiltrados.map((pokemon) => {
            // Extraemos el ID del Pokémon de la URL
            const pokemonId = pokemon.url.split("/")[6];

            return (
              <Link
                to={`/pokemon/${pokemon.name}`}
                key={pokemon.name}
                className="pokemon-link"
              >
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
