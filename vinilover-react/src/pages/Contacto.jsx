import { useState } from 'react'
import { validarCorreo } from '../data/auth'

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [comentario, setComentario] = useState('')
  const [errores, setErrores] = useState([])
  const [exito, setExito] = useState(false)

  function enviar(e) {
    e.preventDefault()
    const lista = []

    if (!nombre.trim() || nombre.length > 100) {
      lista.push('El nombre es obligatorio y no debe superar 100 caracteres.')
    }

    if (correo.trim() && (correo.length > 100 || !validarCorreo(correo.trim()))) {
      lista.push('Si ingresas correo, debe ser de un dominio permitido.')
    }

    if (!comentario.trim() || comentario.length > 500) {
      lista.push('El comentario es obligatorio y no debe superar 500 caracteres.')
    }

    if (lista.length > 0) {
      setErrores(lista)
      setExito(false)
      return
    }

    setErrores([])
    setExito(true)
    setNombre('')
    setCorreo('')
    setComentario('')
  }

  return (
    <section className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="mb-4">Contáctanos</h1>
        <form onSubmit={enviar}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo (opcional)</label>
            <input
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <small>Si lo escribes: duoc.cl, profesor.duoc.cl, gmail.com o vinilove.com</small>
          </div>
          <div className="mb-3">
            <label className="form-label">Comentario</label>
            <textarea
              className="form-control"
              rows="4"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
            <small>Máximo 500 caracteres.</small>
          </div>

          {errores.length > 0 && (
            <div className="alert alert-danger">
              {errores.map((msg) => (
                <p key={msg} className="mb-1">{msg}</p>
              ))}
            </div>
          )}

          {exito && (
            <div className="alert alert-success">
              Mensaje enviado correctamente.
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  )
}
