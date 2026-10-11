import { useEffect, useState } from 'react'
import { agregarProducto, eliminarProducto, obtenerProductos } from '../data/productos'

export default function Admin() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [artista, setArtista] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('Rock')
  const [oferta, setOferta] = useState(false)
  const [imagen, setImagen] = useState('/imagenes/Tool-AEnima.jpg')

  async function cargarProductos() {
    const lista = await obtenerProductos()
    setProductos(lista)
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  async function agregar(e) {
    e.preventDefault()
    if (!nombre.trim() || !artista.trim() || !precio) return

    const nuevo = {
      id: nombre.toLowerCase().replaceAll(' ', '-') + '-' + Date.now(),
      nombre: nombre.trim(),
      artista: artista.trim(),
      precio: Number(precio),
      anio: '2024',
      categoria,
      oferta,
      imagen,
      descripcion: 'Producto agregado desde el panel admin.',
    }

    await agregarProducto(nuevo)
    await cargarProductos()
    setNombre('')
    setArtista('')
    setPrecio('')
    setOferta(false)
  }

  async function borrar(id) {
    await eliminarProducto(id)
    await cargarProductos()
  }

  return (
    <section>
      <h1 className="mb-4">Panel admin</h1>
      <p className="text-secondary">
        CRUD conectado a la API de MySQL. Si la base de datos no responde, el sistema usa un respaldo local.
      </p>

      <form className="row g-3 mb-4" onSubmit={agregar}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Nombre del álbum"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Artista"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option>Rock</option>
            <option>Metal</option>
            <option>Grunge</option>
          </select>
        </div>
        <div className="col-md-1 d-flex align-items-center">
          <div className="form-check">
            <input
              id="checkOferta"
              className="form-check-input"
              type="checkbox"
              checked={oferta}
              onChange={(e) => setOferta(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="checkOferta">
              Oferta
            </label>
          </div>
        </div>
        <div className="col-12">
          <input
            className="form-control"
            placeholder="Ruta de imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Agregar producto
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Artista</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Oferta</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.artista}</td>
              <td>${Number(item.precio).toLocaleString('es-CL')}</td>
              <td>{item.categoria}</td>
              <td>{item.oferta ? 'Sí' : 'No'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => borrar(item.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
