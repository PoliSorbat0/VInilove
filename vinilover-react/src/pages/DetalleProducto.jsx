import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerProductos } from '../data/productos'

export default function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    async function cargarProducto() {
      const productos = await obtenerProductos()
      setProducto(productos.find((item) => item.id === id) || null)
    }

    cargarProducto()
  }, [id])

  if (!producto) {
    return (
      <section>
        <h1>Producto no encontrado</h1>
        <p>Ese vinilo no está en el catálogo.</p>
        <Link to="/productos">Volver a productos</Link>
      </section>
    )
  }

  return (
    <section className="row align-items-center g-4">
      <div className="col-12 col-md-5 text-center">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="img-fluid rounded shadow"
        />
      </div>
      <div className="col-12 col-md-7">
        <h1>{producto.nombre}</h1>
        <p className="fs-4">{producto.artista}</p>
        <p className="fs-2 fw-bold">
          ${producto.precio.toLocaleString('es-CL')}
        </p>
        <p><strong>Año:</strong> {producto.anio}</p>
        <p>{producto.descripcion}</p>
        <button
           type="button"
          className="btn btn-primary me-2"
          onClick={() => agregarAlCarrito(producto)}
          >
          Añadir al carrito
        </button>
        <Link to="/productos" className="btn btn-outline-dark">
          Volver al catálogo
        </Link>
      </div>
    </section>
  )
}