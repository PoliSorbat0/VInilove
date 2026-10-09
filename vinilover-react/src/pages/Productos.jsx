import { useState } from 'react'
import TarjetaProducto from '../components/TarjetaProducto'
import { obtenerProductos } from '../data/productos'

export default function Productos({ agregarAlCarrito })  {
  const [busqueda, setBusqueda] = useState('')
  const listaVinilos = obtenerProductos()

  const filtrados = listaVinilos.filter((vinilo) => {
    const texto = busqueda.toLowerCase()
    return (
      vinilo.nombre.toLowerCase().includes(texto) ||
      vinilo.artista.toLowerCase().includes(texto)
    )
  })

  return (
    <section>
      <h1 className="mb-4 text-center">¿Qué tienes ganas de escuchar?</h1>

      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título o artista..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
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