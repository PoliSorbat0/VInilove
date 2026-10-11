# Vinilove

Proyecto de tienda de vinilos con React, Node.js y MySQL.

## Arquitectura

- Frontend: Vite + React
- Backend opcional 1: Express + Node.js
- Backend compatible con Laragon: PHP + MySQL
- Base de datos: MySQL/MariaDB
- Trabajo en equipo: Linux Pop!_OS para el entorno local de uno y Laragon para el compañero

### Implementación conforme a la guía del compañero

Se añadió una API PHP compatible con la guía de Laragon, en la carpeta:

- `php-api/`

Los archivos disponibles son:

- `php-api/index.php`
- `php-api/productos.php`
- `php-api/usuarios.php`
- `php-api/pedidos.php`

La base de datos sugerida en la guía se define en:

- `database/schema_laragon.sql`

Con el nombre `vinilover` y las tablas:

- `productos`
- `usuarios`
- `pedidos`

## Base de datos

La base de datos principal se llama `vinilove` y el esquema se encuentra en:

- `database/schema.sql`

Se puede importar así:

```bash
mysql -u root -p < database/schema.sql
```

O desde MySQL Workbench o phpMyAdmin:

```sql
SOURCE database/schema.sql;
```

## Configuración del backend

Dentro de `vinilover-api`, crea un archivo `.env` desde el ejemplo:

```bash
cp vinilover-api/.env.example vinilover-api/.env
```

Ajusta tus datos:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=vinilove
PORT=4000
```

## Configuración del frontend

Crea el archivo `.env` del frontend:

```bash
cp vinilover-react/.env.example vinilover-react/.env
```

Contenido recomendado:

```env
VITE_API_URL=http://localhost:4000/api
```

## Instalación y ejecución

```bash
cd Vinilove/VInilove/vinilover-api && npm install
cd ../vinilover-react && npm install
```

Terminal 1:

```bash
cd Vinilove/VInilove/vinilover-api && npm run dev
```

Terminal 2:

```bash
cd Vinilove/VInilove/vinilover-react && npm run dev
```

## Endpoints

### Node / Express

- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

### PHP / Laragon

- `GET /productos.php`
- `GET /productos.php?id=1`
- `POST /productos.php`
- `PUT /productos.php?id=1`
- `DELETE /productos.php?id=1`
- `GET /usuarios.php`
- `POST /usuarios.php`
- `GET /pedidos.php`
- `POST /pedidos.php`

## Recomendación para Laragon

El compañero puede trabajar con la misma estructura MySQL desde Laragon, usando la base `vinilove` y conectando a la API desde la misma red o desde el mismo equipo. La forma más estable para este caso es mantener la base en MySQL y dejar la API corriendo en el equipo que tiene el backend activo.
