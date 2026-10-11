const CLAVE_PRODUCTOS = 'viniloverProductos'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const listaVinilos = [
  {
    id: 'aenima',
    nombre: 'Ænima',
    artista: 'TOOL',
    precio: 34990,
    anio: '1996',
    categoria: 'Metal',
    oferta: false,
    imagen: '/imagenes/Tool-AEnima.jpg',
    descripcion: 'Segundo álbum de estudio de TOOL. Clásico en vinilo 180g.'
  },
  {
    id: 'jar-of-flies',
    nombre: 'Jar of Flies',
    artista: 'Alice in Chains',
    precio: 28990,
    anio: '1994',
    categoria: 'Grunge',
    oferta: true,
    imagen: '/imagenes/AliceInChains-JarOfflies.jpg',
    descripcion: 'EP icónico. Primer EP en llegar al número 1 del Billboard 200.'
  },
  {
    id: 'dirt',
    nombre: 'Dirt',
    artista: 'Alice in Chains',
    precio: 31990,
    anio: '1992',
    categoria: 'Grunge',
    oferta: false,
    imagen: '/imagenes/AliceInChains-Dirt.jpg',
    descripcion: 'Obra maestra del grunge y metal alternativo.'
  },
  {
    id: 'white-pony',
    nombre: 'White Pony',
    artista: 'Deftones',
    precio: 32990,
    anio: '2000',
    categoria: 'Metal',
    oferta: true,
    imagen: '/imagenes/Deftones-WhitePony.jpg',
    descripcion: 'Álbum definitivo de Deftones en los 2000.'
  },
  {
    id: 'meteora',
    nombre: 'Meteora',
    artista: 'Linkin Park',
    precio: 29990,
    anio: '2003',
    categoria: 'Rock',
    oferta: true,
    imagen: '/imagenes/LinkinPark-Meteora.jpg',
    descripcion: 'Segundo álbum de estudio. Incluye Numb y Faint.'
  },
]

function leerLocal() {
  const datos = localStorage.getItem(CLAVE_PRODUCTOS)
  if (!datos) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaVinilos))
    return listaVinilos
  }

  try {
    const lista = JSON.parse(datos)
    if (!Array.isArray(lista) || !lista[0]?.categoria) {
      localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaVinilos))
      return listaVinilos
    }
    return lista
  } catch {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaVinilos))
    return listaVinilos
  }
}

async function pedirJSON(url, opciones = {}) {
  const respuesta = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(opciones.headers || {}),
    },
    ...opciones,
  })

  const contenido = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    throw new Error(contenido?.error || 'Error en la API de productos')
  }

  return contenido
}

export async function obtenerProductos() {
  try {
    const productos = await pedirJSON(`${API_URL}/productos`)
    if (Array.isArray(productos)) {
      localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
      return productos
    }
    return leerLocal()
  } catch (error) {
    console.warn('No se pudo conectar a la API; usando datos locales.', error)
    return leerLocal()
  }
}

export async function agregarProducto(producto) {
  try {
    const nuevo = await pedirJSON(`${API_URL}/productos`, {
      method: 'POST',
      body: JSON.stringify(producto),
    })
    return nuevo
  } catch (error) {
    const lista = leerLocal()
    const actualizada = [...lista, producto]
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(actualizada))
    return producto
  }
}

export async function eliminarProducto(id) {
  try {
    await pedirJSON(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
    })
    return id
  } catch (error) {
    const lista = leerLocal().filter((item) => item.id !== id)
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista))
    return id
  }
}

export function guardarProductos(lista) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista))
}
