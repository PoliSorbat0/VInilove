import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Vinilover
        </Link>
        <div className="navbar-nav flex-row flex-wrap gap-3">
          <Link className="nav-link" to="/">Inicio</Link>
          <Link className="nav-link" to="/productos">Productos</Link>
          <Link className="nav-link" to="/categorias">Categorías</Link>
          <Link className="nav-link" to="/ofertas">Ofertas</Link>
          <Link className="nav-link" to="/carrito">Carrito</Link>
          <Link className="nav-link" to="/blog">Blog</Link>
          <Link className="nav-link" to="/contacto">Contacto</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  )
}
