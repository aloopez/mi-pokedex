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

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});