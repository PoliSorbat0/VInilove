import { Link } from 'react-router-dom'

export default function Carrito({ carrito, cambiarCantidad, eliminarDelCarrito }) {
  const total = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  )

  if (carrito.length === 0) {
    return (
      <section>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos">Ir a productos</Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="mb-4">Carrito</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>${item.precio.toLocaleString('es-CL')}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => cambiarCantidad(item.id, -1)}
                >
                  −
                </button>
                <span className="mx-2">{item.cantidad}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => cambiarCantidad(item.id, 1)}
                >
                  +
                </button>
              </td>
              <td>
                ${(item.precio * item.cantidad).toLocaleString('es-CL')}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fs-4 fw-bold">Total: ${total.toLocaleString('es-CL')}</p>
      <Link to="/checkout" className="btn btn-primary">
        Ir a pagar
      </Link>
    </section>
  )
}