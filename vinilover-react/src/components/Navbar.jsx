import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { obtenerUsuarioActual, cerrarSesion } from '../data/auth'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    setUsuario(obtenerUsuarioActual())
  }, [location.pathname])

  function salir() {
    cerrarSesion()
    setUsuario(null)
    navigate('/login')
  }

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
          <Link className="nav-link" to="/admin">Admin</Link>
        </div>

        <div className="navbar-nav flex-row flex-wrap gap-2 ms-auto align-items-center">
          {usuario ? (
            <>
              <span className="navbar-text text-white me-2">
                Hola, {usuario.nombre}
              </span>
              <Link className="nav-link" to="/perfil">Perfil</Link>
              <button type="button" className="btn btn-sm btn-outline-light" onClick={salir}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/registro">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}