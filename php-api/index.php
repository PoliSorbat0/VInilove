<?php
require __DIR__ . '/config.php';

jsonResponse([
    'ok' => true,
    'mensaje' => 'API de Vinilover funcionando con Laragon + MySQL.',
    'endpoints' => [
        'GET /productos.php',
        'GET /productos.php?id=1',
        'POST /productos.php',
        'PUT /productos.php?id=1',
        'DELETE /productos.php?id=1',
        'GET /usuarios.php',
        'POST /usuarios.php',
        'POST /pedidos.php',
    ]
]);
