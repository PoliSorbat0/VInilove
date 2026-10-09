import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarCorreo, loginUsuario } from '../data/auth'

export default function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState([])

  function enviar(e) {
    e.preventDefault()
    const lista = []

    if (!correo || correo.length > 100 || !validarCorreo(correo.trim())) {
      lista.push('El correo debe ser válido y de un dominio permitido.')
    }
    if (!password || password.length < 4 || password.length > 10) {
      lista.push('La contraseña debe tener entre 4 y 10 caracteres.')
    }

    if (lista.length > 0) {
      setErrores(lista)
      return
    }

    const resultado = loginUsuario(correo.trim(), password)
    if (!resultado.exito) {
      setErrores([resultado.mensaje])
      return
    }

    setErrores([])
    navigate('/')
  }

  return (
    <section className="row justify-content-center">
      <div className="col-md-5">
        <h1 className="mb-4">Iniciar sesión</h1>
        <form onSubmit={enviar}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <small>duoc.cl, profesor.duoc.cl, gmail.com, vinilove.com</small>
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {errores.length > 0 && (
            <div className="alert alert-danger">
              {errores.map((msg) => (
                <p key={msg} className="mb-1">{msg}</p>
              ))}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
        <p className="mt-3">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </section>
  )
}