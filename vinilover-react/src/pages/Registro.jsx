import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarCorreo, validarRUN, registrarUsuario } from '../data/auth'

export default function Registro() {
  const navigate = useNavigate()
  const [run, setRun] = useState('')
  const [correo, setCorreo] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState([])

  function enviar(e) {
    e.preventDefault()
    const lista = []

    if (!validarRUN(run.trim())) {
      lista.push('El RUN debe ir sin puntos ni guion (ej: 19011022K).')
    }
    if (!correo || correo.length > 100 || !validarCorreo(correo.trim())) {
      lista.push('El correo debe ser @duoc.cl, @profesor.duoc.cl, @gmail.com o @vinilove.com.')
    }
    if (!nombre.trim()) {
      lista.push('El nombre es obligatorio.')
    }
    if (!password || password.length < 4 || password.length > 10) {
      lista.push('La contraseña debe tener entre 4 y 10 caracteres.')
    }

    if (lista.length > 0) {
      setErrores(lista)
      return
    }

    const resultado = registrarUsuario({
      run: run.trim(),
      correo: correo.trim(),
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      password,
      rol: 'cliente',
    })

    if (!resultado.exito) {
      setErrores([resultado.mensaje])
      return
    }

    setErrores([])
    navigate('/login')
  }

  return (
    <section className="row justify-content-center">
      <div className="col-md-7">
        <h1 className="mb-4">Registro</h1>
        <form onSubmit={enviar}>
          <div className="mb-3">
            <label className="form-label">RUN (sin puntos ni guion)</label>
            <input className="form-control" value={run} onChange={(e) => setRun(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
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

          <button type="submit" className="btn btn-primary">Registrarme</button>
        </form>
        <p className="mt-3">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </section>
  )
}