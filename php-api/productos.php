<?php
require __DIR__ . '/config.php';
require __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    $id = $_GET['id'] ?? null;

    if ($id !== null) {
        $stmt = $pdo->prepare('SELECT * FROM productos WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $producto = $stmt->fetch();

        if (!$producto) {
            jsonResponse(['ok' => false, 'error' => 'Producto no encontrado.'], 404);
        }

        jsonResponse(['ok' => true, 'data' => $producto]);
    }

    $stmt = $pdo->query('SELECT * FROM productos ORDER BY nombre ASC');
    jsonResponse(['ok' => true, 'data' => $stmt->fetchAll()]);
}

if ($requestMethod === 'POST') {
    $data = readJsonBody();
    $nombre = trim((string)($data['nombre'] ?? ''));
    $artista = trim((string)($data['artista'] ?? ''));
    $precio = (float)($data['precio'] ?? 0);
    $imagen = trim((string)($data['imagen'] ?? '/imagenes/default.jpg'));
    $categoria = trim((string)($data['categoria'] ?? 'Rock'));
    $oferta = !empty($data['oferta']) ? 1 : 0;
    $descripcion = trim((string)($data['descripcion'] ?? ''));

    if ($nombre === '' || $artista === '') {
        jsonResponse(['ok' => false, 'error' => 'Nombre y artista son obligatorios.'], 400);
    }

    $existsStmt = $pdo->prepare('SELECT id FROM productos WHERE nombre = :nombre AND artista = :artista LIMIT 1');
    $existsStmt->execute([':nombre' => $nombre, ':artista' => $artista]);
    $existing = $existsStmt->fetch();

    if ($existing) {
        $stmt = $pdo->prepare(
            'UPDATE productos SET precio = :precio, imagen = :imagen, categoria = :categoria, oferta = :oferta, descripcion = :descripcion WHERE id = :id'
        );

        $stmt->execute([
            ':precio' => $precio,
            ':imagen' => $imagen,
            ':categoria' => $categoria,
            ':oferta' => $oferta,
            ':descripcion' => $descripcion,
            ':id' => $existing['id'],
        ]);

        jsonResponse([
            'ok' => true,
            'mensaje' => 'Producto actualizado correctamente.',
            'id' => $existing['id'],
        ], 200);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO productos (nombre, artista, precio, imagen, categoria, oferta, descripcion) VALUES (:nombre, :artista, :precio, :imagen, :categoria, :oferta, :descripcion)'
    );

    $stmt->execute([
        ':nombre' => $nombre,
        ':artista' => $artista,
        ':precio' => $precio,
        ':imagen' => $imagen,
        ':categoria' => $categoria,
        ':oferta' => $oferta,
        ':descripcion' => $descripcion,
    ]);

    jsonResponse([
        'ok' => true,
        'mensaje' => 'Producto creado correctamente.',
        'id' => $pdo->lastInsertId(),
    ], 201);
}

if ($requestMethod === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'Debes indicar el id del producto.'], 400);
    }

    $data = readJsonBody();
    $nombre = trim((string)($data['nombre'] ?? ''));
    $artista = trim((string)($data['artista'] ?? ''));
    $precio = (float)($data['precio'] ?? 0);
    $imagen = trim((string)($data['imagen'] ?? '/imagenes/default.jpg'));
    $categoria = trim((string)($data['categoria'] ?? 'Rock'));
    $oferta = !empty($data['oferta']) ? 1 : 0;
    $descripcion = trim((string)($data['descripcion'] ?? ''));

    $stmt = $pdo->prepare(
        'UPDATE productos SET nombre = :nombre, artista = :artista, precio = :precio, imagen = :imagen, categoria = :categoria, oferta = :oferta, descripcion = :descripcion WHERE id = :id'
    );

    $stmt->execute([
        ':nombre' => $nombre,
        ':artista' => $artista,
        ':precio' => $precio,
        ':imagen' => $imagen,
        ':categoria' => $categoria,
        ':oferta' => $oferta,
        ':descripcion' => $descripcion,
        ':id' => $id,
    ]);

    $affected = $stmt->rowCount();
    if ($affected === 0) {
        jsonResponse(['ok' => false, 'error' => 'No se encontró el producto para editar.'], 404);
    }

    jsonResponse(['ok' => true, 'mensaje' => 'Producto actualizado correctamente.']);
}

if ($requestMethod === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['ok' => false, 'error' => 'Debes indicar el id del producto.'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM productos WHERE id = :id');
    $stmt->execute([':id' => $id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['ok' => false, 'error' => 'Producto no encontrado para eliminar.'], 404);
    }

    jsonResponse(['ok' => true, 'mensaje' => 'Producto eliminado correctamente.']);
}

jsonResponse(['ok' => false, 'error' => 'Método no permitido.'], 405);
