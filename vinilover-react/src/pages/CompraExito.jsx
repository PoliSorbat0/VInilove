import { Link } from 'react-router-dom'

export default function CompraExito() {
  return (
    <section className="text-center">
      <h1>Compra exitosa</h1>
      <p>Tu pedido fue procesado. Gracias por comprar en Vinilover.</p>
      <Link to="/productos" className="btn btn-primary">
        Seguir comprando
      </Link>
    </section>
  )
}