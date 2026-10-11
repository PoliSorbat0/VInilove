import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 4000)

app.use(cors())
app.use(express.json())

async function initDatabase() {
  const adminConnection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    charset: 'utf8mb4',
  })

  try {
    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS vinilove CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci`)
    await adminConnection.query('USE vinilove')

    await adminConnection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id VARCHAR(120) PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        artista VARCHAR(150) NOT NULL,
        precio DECIMAL(10,2) NOT NULL DEFAULT 0,
        anio VARCHAR(10) DEFAULT '2024',
        categoria VARCHAR(60) NOT NULL DEFAULT 'Rock',
        oferta TINYINT(1) NOT NULL DEFAULT 0,
        imagen VARCHAR(255) NOT NULL DEFAULT '/imagenes/default.jpg',
        descripcion TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    const [rows] = await adminConnection.query('SELECT COUNT(*) AS total FROM productos')
    if (Number(rows[0].total) === 0) {
      await adminConnection.query(`
        INSERT INTO productos (id, nombre, artista, precio, anio, categoria, oferta, imagen, descripcion) VALUES
          ('aenima', 'Ænima', 'TOOL', 34990, '1996', 'Metal', 0, '/imagenes/Tool-AEnima.jpg', 'Segundo álbum de estudio de TOOL. Clásico en vinilo 180g.'),
          ('jar-of-flies', 'Jar of Flies', 'Alice in Chains', 28990, '1994', 'Grunge', 1, '/imagenes/AliceInChains-JarOfflies.jpg', 'EP icónico. Primer EP en llegar al número 1 del Billboard 200.'),
          ('dirt', 'Dirt', 'Alice in Chains', 31990, '1992', 'Grunge', 0, '/imagenes/AliceInChains-Dirt.jpg', 'Obra maestra del grunge y metal alternativo.'),
          ('white-pony', 'White Pony', 'Deftones', 32990, '2000', 'Metal', 1, '/imagenes/Deftones-WhitePony.jpg', 'Álbum definitivo de Deftones en los 2000.'),
          ('meteora', 'Meteora', 'Linkin Park', 29990, '2003', 'Rock', 1, '/imagenes/LinkinPark-Meteora.jpg', 'Segundo álbum de estudio. Incluye Numb y Faint.')
      `)
    }
  } finally {
    await adminConnection.end()
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vinilove',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
})

function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, message: 'API de Vinilove conectada a MySQL' })
  } catch (error) {
    res.status(500).json({ ok: false, error: 'No se pudo conectar a la base de datos.' })
  }
})

app.get('/api/productos', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos ORDER BY nombre ASC')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al consultar productos.' })
  }
})

app.get('/api/productos/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])

    if (!rows.length) {
      return res.status(404).json({ error: 'Producto no encontrado.' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al buscar el producto.' })
  }
})

app.post('/api/productos', async (req, res) => {
  try {
    const data = req.body || {}
    const id = data.id || `${slugify(data.nombre || 'producto')}-${Date.now()}`

    const producto = {
      id,
      nombre: data.nombre || '',
      artista: data.artista || '',
      precio: Number(data.precio || 0),
      anio: data.anio || '2024',
      categoria: data.categoria || 'Rock',
      oferta: Boolean(data.oferta),
      imagen: data.imagen || '/imagenes/default.jpg',
      descripcion: data.descripcion || 'Producto agregado desde la API.'
    }

    await pool.query(
      `INSERT INTO productos (id, nombre, artista, precio, anio, categoria, oferta, imagen, descripcion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [producto.id, producto.nombre, producto.artista, producto.precio, producto.anio, producto.categoria, producto.oferta ? 1 : 0, producto.imagen, producto.descripcion]
    )

    res.status(201).json(producto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo crear el producto.' })
  }
})

app.put('/api/productos/:id', async (req, res) => {
  try {
    const data = req.body || {}
    const updates = [
      'nombre = ?',
      'artista = ?',
      'precio = ?',
      'anio = ?',
      'categoria = ?',
      'oferta = ?',
      'imagen = ?',
      'descripcion = ?'
    ]

    const values = [
      data.nombre,
      data.artista,
      Number(data.precio || 0),
      data.anio || '2024',
      data.categoria || 'Rock',
      data.oferta ? 1 : 0,
      data.imagen || '/imagenes/default.jpg',
      data.descripcion || 'Producto actualizado.'
    ]

    const [result] = await pool.query(
      `UPDATE productos SET ${updates.join(', ')} WHERE id = ?`,
      [...values, req.params.id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado para editar.' })
    }

    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id])
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo actualizar el producto.' })
  }
})

app.delete('/api/productos/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar.' })
    }

    res.json({ ok: true, id: req.params.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo eliminar el producto.' })
  }
})

async function startServer() {
  try {
    await initDatabase()
    app.listen(PORT, () => {
      console.log(`API de Vinilove corriendo en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error inicializando la base de datos:', error)
    process.exit(1)
  }
}

startServer()
