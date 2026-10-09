import { useState } from 'react'
import TarjetaProducto from '../components/TarjetaProducto'
import { obtenerProductos } from '../data/productos'

export default function Categorias({ agregarAlCarrito }) {
  const [categoria, setCategoria] = useState('Todas')
  const productos = obtenerProductos()
  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria))]

  const filtrados =
    categoria === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria === categoria)

  return (
    <section>
      <h1 className="mb-4">Categorías</h1>
      <div className="mb-4 d-flex flex-wrap gap-2">
        {categorias.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className={`btn ${categoria === nombre ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setCategoria(nombre)}
          >
            {nombre}
          </button>
        ))}
      </div>
      <div className="row justify-content-center g-4">
        {filtrados.map((vinilo) => (
          <TarjetaProducto
            key={vinilo.id}
            id={vinilo.id}
            nombre={vinilo.nombre}
            artista={vinilo.artista}
            precio={vinilo.precio}
            imagen={vinilo.imagen}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </section>
  )
}
