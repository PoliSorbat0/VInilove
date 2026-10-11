import { useEffect, useState } from 'react'
import TarjetaProducto from '../components/TarjetaProducto'
import { obtenerProductos } from '../data/productos'

export default function Ofertas({ agregarAlCarrito }) {
  const [ofertas, setOfertas] = useState([])

  useEffect(() => {
    async function cargar() {
      const productos = await obtenerProductos()
      setOfertas(productos.filter((p) => p.oferta))
    }

    cargar()
  }, [])

  return (
    <section>
      <h1 className="mb-4">Ofertas</h1>
      {ofertas.length === 0 ? (
        <p>No hay productos en oferta por ahora.</p>
      ) : (
        <div className="row justify-content-center g-4">
          {ofertas.map((vinilo) => (
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
      )}
    </section>
  )
}
