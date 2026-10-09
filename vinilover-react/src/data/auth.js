const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'vinilove.com']
const CLAVE_USUARIOS = 'viniLoveUsuarios'
const CLAVE_SESION = 'viniLoveSesion'

export function validarCorreo(correo) {
  if (!correo) return false
  const partes = correo.split('@')
  if (partes.length !== 2) return false
  return DOMINIOS_PERMITIDOS.includes(partes[1].toLowerCase())
}

export function validarRUN(run) {
  const regexRUN = /^[0-9]{7,8}[0-9kK]{1}$/
  return regexRUN.test(run)
}

export function obtenerUsuarios() {
  const datos = localStorage.getItem(CLAVE_USUARIOS)
  return datos ? JSON.parse(datos) : []
}

export function registrarUsuario(nuevo) {
  const usuarios = obtenerUsuarios()
  const existe = usuarios.some(
    (u) => u.correo.toLowerCase() === nuevo.correo.toLowerCase()
  )
  if (existe) {
    return { exito: false, mensaje: 'Ese correo ya está registrado.' }
  }
  usuarios.push(nuevo)
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
  return { exito: true }
}

export function loginUsuario(correo, password) {
  const usuarios = obtenerUsuarios()
  const usuario = usuarios.find(
    (u) =>
      u.correo.toLowerCase() === correo.toLowerCase() &&
      u.password === password
  )
  if (!usuario) {
    return { exito: false, mensaje: 'Correo o contraseña incorrectos.' }
  }
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
  return { exito: true, usuario }
}

export function obtenerUsuarioActual() {
  const datos = localStorage.getItem(CLAVE_SESION)
  return datos ? JSON.parse(datos) : null
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}