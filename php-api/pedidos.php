<?php
require __DIR__ . '/config.php';
require __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    $idUsuario = $_GET['id_usuario'] ?? null;

    if ($idUsuario !== null) {
        $stmt = $pdo->prepare('SELECT * FROM pedidos WHERE id_usuario = :id_usuario ORDER BY fecha DESC');
        $stmt->execute([':id_usuario' => $idUsuario]);
        jsonResponse(['ok' => true, 'data' => $stmt->fetchAll()]);
    }

    $stmt = $pdo->query('SELECT * FROM pedidos ORDER BY fecha DESC');
    jsonResponse(['ok' => true, 'data' => $stmt->fetchAll()]);
}

if ($requestMethod === 'POST') {
    $data = readJsonBody();
    $idUsuario = (int)($data['id_usuario'] ?? 0);
    $total = (float)($data['total'] ?? 0);
    $estado = trim((string)($data['estado'] ?? 'pendiente'));

    if ($idUsuario <= 0 || $total < 0) {
        jsonResponse(['ok' => false, 'error' => 'id_usuario y total son obligatorios.'], 400);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO pedidos (id_usuario, total, estado) VALUES (:id_usuario, :total, :estado)'
    );

    $stmt->execute([
        ':id_usuario' => $idUsuario,
        ':total' => $total,
        ':estado' => $estado,
    ]);

    jsonResponse([
        'ok' => true,
        'mensaje' => 'Pedido creado correctamente.',
        'id' => $pdo->lastInsertId(),
    ], 201);
}

jsonResponse(['ok' => false, 'error' => 'Método no permitido.'], 405);
