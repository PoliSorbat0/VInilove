const CLAVE_PRODUCTOS = 'viniloverProductos'

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

export function obtenerProductos() {
  const datos = localStorage.getItem(CLAVE_PRODUCTOS)
  if (!datos) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaVinilos))
    return listaVinilos
  }
  const lista = JSON.parse(datos)
  if (!lista[0]?.categoria) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(listaVinilos))
    return listaVinilos
  }
  return lista
}

export function guardarProductos(lista) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista))
}
