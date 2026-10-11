CREATE DATABASE IF NOT EXISTS vinilove CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE vinilove;

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
);

INSERT INTO productos (id, nombre, artista, precio, anio, categoria, oferta, imagen, descripcion)
VALUES
  ('aenima', 'Ænima', 'TOOL', 34990, '1996', 'Metal', 0, '/imagenes/Tool-AEnima.jpg', 'Segundo álbum de estudio de TOOL. Clásico en vinilo 180g.'),
  ('jar-of-flies', 'Jar of Flies', 'Alice in Chains', 28990, '1994', 'Grunge', 1, '/imagenes/AliceInChains-JarOfflies.jpg', 'EP icónico. Primer EP en llegar al número 1 del Billboard 200.'),
  ('dirt', 'Dirt', 'Alice in Chains', 31990, '1992', 'Grunge', 0, '/imagenes/AliceInChains-Dirt.jpg', 'Obra maestra del grunge y metal alternativo.'),
  ('white-pony', 'White Pony', 'Deftones', 32990, '2000', 'Metal', 1, '/imagenes/Deftones-WhitePony.jpg', 'Álbum definitivo de Deftones en los 2000.'),
  ('meteora', 'Meteora', 'Linkin Park', 29990, '2003', 'Rock', 1, '/imagenes/LinkinPark-Meteora.jpg', 'Segundo álbum de estudio. Incluye Numb y Faint.')
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  artista = VALUES(artista),
  precio = VALUES(precio),
  anio = VALUES(anio),
  categoria = VALUES(categoria),
  oferta = VALUES(oferta),
  imagen = VALUES(imagen),
  descripcion = VALUES(descripcion);
