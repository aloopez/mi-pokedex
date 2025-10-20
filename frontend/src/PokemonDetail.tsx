import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importa Link para volver atrás
import './PokemonDetail.css'; // Crearemos este archivo para los estilos

// Interfaz para los datos del Pokémon (ajústala si tu backend devuelve algo diferente)
interface PokemonDetailData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    // Podrías añadir otras imágenes si quieres, ej: other['official-artwork'].front_default
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string; // URL del tipo
    };
  }[];
  height: number; // Altura en decímetros
  weight: number; // Peso en hectogramos
  abilities: {
    ability: {
      name: string;
      url: string; // URL de la habilidad
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string; // URL de la estadística
    };
  }[];
  // Añade más campos si los necesitas
}

function PokemonDetail() {
  const { nombre } = useParams<{ nombre: string }>(); // Obtiene el nombre de la URL
  const [pokemonData, setPokemonData] = useState<PokemonDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDetallesPokemon = async () => {
      setIsLoading(true);
      setError(null);
      setPokemonData(null); // Limpia datos anteriores
      try {
        // Llama a tu backend
        const res = await fetch(`http://localhost:3002/pokemon/${nombre}`);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: No se pudo encontrar el Pokémon "${nombre}"`);
        }
        const data: PokemonDetailData = await res.json();
        setPokemonData(data);
      } catch (err: any) {
        console.error("Error fetching Pokemon details:", err);
        setError(err.message || 'Ocurrió un error al cargar los detalles.');
      } finally {
        setIsLoading(false);
      }
    };

    if (nombre) {
      obtenerDetallesPokemon();
    } else {
      setError('Nombre de Pokémon no encontrado en la URL.');
      setIsLoading(false);
    }
  }, [nombre]); // Se ejecuta cuando el nombre en la URL cambia

  // --- Renderizado ---

  if (isLoading) {
    return <div className="loading">Cargando detalles de {nombre}...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/">Volver a la lista</Link>
      </div>
    );
  }

  if (!pokemonData) {
    return (
        <div className="error-container">
            <p>No se encontraron datos para este Pokémon.</p>
            <Link to="/">Volver a la lista</Link>
        </div>
    ); // No debería pasar si no hubo error, pero por si acaso
  }

  // Si todo fue bien, muestra la tarjeta
  return (
    <div className="pokemon-detail-page">
        {/* Enlace para volver */}
        <Link to="/" className="back-link">← Volver a la Lista</Link>

        <div className="pokemon-detail-card">
        <h1>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} (#{pokemonData.id})</h1>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image"/>

        <div className="pokemon-info">
            <section>
                <h2>Información Básica</h2>
                <p><strong>Altura:</strong> {pokemonData.height / 10} m</p> {/* Convertir a metros */}
                <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p> {/* Convertir a kg */}
            </section>

            <section>
                <h2>Tipos</h2>
                <ul className="types-list">
                {pokemonData.types.map((typeInfo) => (
                    <li key={typeInfo.slot} className={`type-${typeInfo.type.name}`}>
                         {typeInfo.type.name}
                    </li>
                ))}
                </ul>
            </section>

            <section>
                <h2>Habilidades</h2>
                <ul className="abilities-list">
                {pokemonData.abilities.map((abilityInfo) => (
                    <li key={abilityInfo.ability.name}>
                        {abilityInfo.ability.name.replace('-', ' ')}{abilityInfo.is_hidden ? ' (Oculta)' : ''}
                    </li>
                ))}
                </ul>
            </section>

            <section>
                <h2>Estadísticas Base</h2>
                <ul className="stats-list">
                {pokemonData.stats.map((statInfo) => (
                    <li key={statInfo.stat.name}>
                        <strong>{statInfo.stat.name.replace('-', ' ')}:</strong> {statInfo.base_stat}
                        {/* Opcional: Barra de estadística */}
                         <div className="stat-bar-container">
                             <div className="stat-bar" style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}></div> {/* Asumiendo 255 como máx */}
                        </div>
                    </li>
                ))}
                </ul>
            </section>
        </div>
        </div>
    </div>
  );
}
export default PokemonDetail;