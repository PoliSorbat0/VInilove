const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();


app.use(cors()); 
app.use(express.json()); 

// @GetMapping("/api/vinilos") -> Listar vinilos
app.get('/api/vinilos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vinilos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    }
});

// @PostMapping("/api/vinilos") 
app.post('/api/vinilos', async (req, res) => {
    const { titulo, artista, precio, imagen, stock } = req.body;
    try {
        const query = 'INSERT INTO vinilos (titulo, artista, precio, imagen, stock) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [titulo, artista, precio, imagen, stock || 10]);
        res.status(201).json({ mensaje: "Vinilo creado con éxito", id: result.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al guardar", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});