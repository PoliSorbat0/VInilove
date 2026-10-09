import { Link } from 'react-router-dom'

export default function CompraError() {
  return (
    <section className="text-center">
      <h1>No se pudo realizar el pago</h1>
      <p>El carrito estaba vacío o algo falló. Intentá de nuevo.</p>
      <Link to="/carrito" className="btn btn-outline-dark">
        Volver al carrito
      </Link>
    </section>
  )
}