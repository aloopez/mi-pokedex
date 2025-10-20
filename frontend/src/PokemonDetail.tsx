import { useEffect, useState} from "react";
import { useParams} from "react-router-dom";

function PokemonDetail() {
  const pokemonNombre = useParams().nombre;
  const [data, setData] = useState(null);

  useEffect(() => {
    const obtenerDetallesPokemon = async () => {
      const res = await fetch(`http://localhost:3002/pokemon/${pokemonNombre}`);
      const data = await res.json();
      const detallesPokemon = data;
      setData(detallesPokemon);
      // Aquí puedes hacer algo con los detalles del Pokémon
    };

    obtenerDetallesPokemon();
  }, [pokemonNombre]);

  return (
    <div>
      <h2>Pokemon Detail</h2>
      <p>Nombre: {pokemonNombre}</p>
      <p>Detalles: {JSON.stringify(data)}</p>

    </div>
  );
}
export default PokemonDetail;