<?php
require __DIR__ . '/config.php';
require __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    $stmt = $pdo->query('SELECT id, run, nombre, correo, rol FROM usuarios ORDER BY nombre ASC');
    jsonResponse(['ok' => true, 'data' => $stmt->fetchAll()]);
}

if ($requestMethod === 'POST') {
    $data = readJsonBody();
    $action = strtolower((string)($data['action'] ?? 'register'));

    if ($action === 'login') {
        $correo = trim((string)($data['correo'] ?? ''));
        $contrasena = (string)($data['contrasena'] ?? '');

        if ($correo === '' || $contrasena === '') {
            jsonResponse(['ok' => false, 'error' => 'Correo y contraseña son obligatorios.'], 400);
        }

        $stmt = $pdo->prepare('SELECT id, run, nombre, correo, rol FROM usuarios WHERE correo = :correo AND contrasena = :contrasena LIMIT 1');
        $stmt->execute([':correo' => $correo, ':contrasena' => $contrasena]);
        $usuario = $stmt->fetch();

        if (!$usuario) {
            jsonResponse(['ok' => false, 'error' => 'Credenciales inválidas.'], 401);
        }

        jsonResponse(['ok' => true, 'data' => $usuario]);
    }

    $run = trim((string)($data['run'] ?? ''));
    $nombre = trim((string)($data['nombre'] ?? ''));
    $correo = trim((string)($data['correo'] ?? ''));
    $contrasena = (string)($data['contrasena'] ?? '');
    $rol = strtolower((string)($data['rol'] ?? 'cliente'));

    if ($nombre === '' || $correo === '' || $contrasena === '') {
        jsonResponse(['ok' => false, 'error' => 'Nombre, correo y contraseña son obligatorios.'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO usuarios (run, nombre, correo, contrasena, rol) VALUES (:run, :nombre, :correo, :contrasena, :rol)');
    $stmt->execute([
        ':run' => $run,
        ':nombre' => $nombre,
        ':correo' => $correo,
        ':contrasena' => $contrasena,
        ':rol' => in_array($rol, ['cliente', 'admin'], true) ? $rol : 'cliente',
    ]);

    jsonResponse([
        'ok' => true,
        'mensaje' => 'Usuario registrado correctamente.',
        'id' => $pdo->lastInsertId(),
    ], 201);
}

jsonResponse(['ok' => false, 'error' => 'Método no permitido.'], 405);
