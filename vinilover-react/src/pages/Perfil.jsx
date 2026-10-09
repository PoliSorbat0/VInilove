import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerUsuarioActual, cerrarSesion } from '../data/auth'

export default function Perfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const actual = obtenerUsuarioActual()
    if (!actual) {
      navigate('/login')
      return
    }
    setUsuario(actual)
  }, [navigate])

  function salir() {
    cerrarSesion()
    navigate('/login')
  }

  if (!usuario) {
    return <p>Cargando perfil...</p>
  }

  return (
    <section className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Mi perfil</h1>
        <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellidos}</p>
        <p><strong>RUN:</strong> {usuario.run}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>

        <button type="button" className="btn btn-outline-dark me-2" onClick={salir}>
          Cerrar sesión
        </button>
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </section>
  )
}