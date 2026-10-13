const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'vinilove.com']
const CLAVE_USUARIOS = 'viniLoveUsuarios'
const CLAVE_SESION = 'viniLoveSesion'

const ADMIN_INICIAL = {
  run: '19011022K',
  correo: 'admin@vinilove.com',
  nombre: 'Admin',
  apellidos: 'Vinilove',
  password: 'admin1234',
  rol: 'admin',
}

function asegurarAdmin(usuarios) {
  const existe = usuarios.some(
    (u) => u.correo.toLowerCase() === ADMIN_INICIAL.correo
  )
  if (!existe) {
    usuarios.push({ ...ADMIN_INICIAL })
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
  }
  return usuarios
}

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
  const usuarios = datos ? JSON.parse(datos) : []
  return asegurarAdmin(Array.isArray(usuarios) ? usuarios : [])
}

export function esAdmin(usuario = obtenerUsuarioActual()) {
  return usuario?.rol === 'admin'
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