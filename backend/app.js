// backend/app.js
import express from 'express';
import cors from 'cors';
import axios from 'axios'; // Importamos axios

const app = express();
const PORT = 3002; 

app.use(cors()); // Habilitamos CORS para todas las rutas

// Nuestra ruta para obtener los Pokémon
app.get('/pokemon', async (req, res) => {
  try {
    // Hacemos una petición a la API externa de Pokémon
    const respuestaApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

    // Enviamos los resultados que obtuvimos de la API
    res.json(respuestaApi.data);

  } catch (error) {
    // Si algo sale mal, enviamos un error
    console.error("Error al obtener Pokémon:", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los Pokémon" });
  }
});
// Ruta para obtener detalles de un Pokémon por nombre
app.get('/pokemon/:nombre', async (req, res) => {
  const nombre = req.params.nombre;

  try {
    // Hacemos una petición a la API externa de Pokémon
    const respuestaApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    // Enviamos los resultados que obtuvimos de la API
    res.json(respuestaApi.data);

  } catch (error) {
    // Si algo sale mal, enviamos un error
    console.error("Error al obtener detalles del Pokémon:", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los detalles del Pokémon" });
  }
});

// ... (las otras rutas están bien)

app.get('/pokemon/tipo/:tipo', async (req, res) => {
 const tipo = req.params.tipo;

   try {
    // 1. Hacemos la petición a la API externa
     const respuestaApi = await axios.get(`https://pokeapi.co/api/v2/type/${tipo}`);

   // 2. Extraemos y transformamos la lista de pokémon
   // La API de tipo devuelve { pokemon: [ { pokemon: { name: '..', url: '..' } }, ... ] }
     // Necesitamos extraer solo el objeto { name: '..', url: '..' } de cada elemento
    const pokemonesTransformados = respuestaApi.data.pokemon.map(p => p.pokemon);

     // 3. Enviamos los datos en el mismo formato que tu ruta /pokemon
    res.json({ pokemonesTransformados }); // <--- ¡AQUÍ ESTÁ EL ARREGLO!

  } catch (error) {
    console.error("Error al obtener Pokémon por tipo:", error);
    res.status(500).json({ mensaje: "No se pudieron obtener los Pokémon por tipo" });
  }
});

// ... (el resto del archivo)

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});