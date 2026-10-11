CREATE DATABASE IF NOT EXISTS vinilover CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE vinilover;

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  artista VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0,
  imagen VARCHAR(255) NOT NULL DEFAULT '/imagenes/default.jpg',
  categoria VARCHAR(60) NOT NULL DEFAULT 'Rock',
  oferta TINYINT(1) NOT NULL DEFAULT 0,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_productos_nombre_artista (nombre, artista)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  run VARCHAR(20) DEFAULT NULL,
  nombre VARCHAR(150) NOT NULL,
  correo VARCHAR(150) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

INSERT INTO productos (nombre, artista, precio, imagen, categoria, oferta, descripcion)
VALUES
  ('Ænima', 'TOOL', 34990, '/imagenes/Tool-AEnima.jpg', 'Metal', 0, 'Segundo álbum de estudio de TOOL. Clásico en vinilo 180g.'),
  ('Jar of Flies', 'Alice in Chains', 28990, '/imagenes/AliceInChains-JarOfflies.jpg', 'Grunge', 1, 'EP icónico. Primer EP en llegar al número 1 del Billboard 200.'),
  ('Dirt', 'Alice in Chains', 31990, '/imagenes/AliceInChains-Dirt.jpg', 'Grunge', 0, 'Obra maestra del grunge y metal alternativo.'),
  ('White Pony', 'Deftones', 32990, '/imagenes/Deftones-WhitePony.jpg', 'Metal', 1, 'Álbum definitivo de Deftones en los 2000.'),
  ('Meteora', 'Linkin Park', 29990, '/imagenes/LinkinPark-Meteora.jpg', 'Rock', 1, 'Segundo álbum de estudio. Incluye Numb y Faint.')
ON DUPLICATE KEY UPDATE
  artista = VALUES(artista),
  precio = VALUES(precio),
  imagen = VALUES(imagen),
  categoria = VALUES(categoria),
  oferta = VALUES(oferta),
  descripcion = VALUES(descripcion);
