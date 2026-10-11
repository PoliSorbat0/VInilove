import { Link } from 'react-router-dom'

export default function TarjetaProducto({ id, nombre, artista, precio, imagen, agregarAlCarrito }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div className="card shadow-sm h-100" style={{ width: '18rem' }}>
        <Link to={`/productos/${id}`}>
          <img src={imagen} className="card-img-top" alt={nombre} />
        </Link>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/productos/${id}`}>{nombre}</Link>
          </h5>
          <p className="card-text">{artista}</p>
          <p className="fw-bold">${precio.toLocaleString('es-CL')}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
            agregarAlCarrito({ id, nombre, artista, precio, imagen })
            }
          >
          Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}