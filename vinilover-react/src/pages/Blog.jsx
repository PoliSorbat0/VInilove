import { useState } from 'react'
import { Link } from 'react-router-dom'

const articulosBlog = [
  {
    id: 'aenima',
    categoria: 'Reseña',
    titulo: '¿Por qué Ænima sigue siendo un clásico?',
    extracto: 'La mezcla de tensión y atmósfera de Tool lo convierte en una pieza fundamental para cualquier colección.',
    contenidoCompleto: 'Lanzado en 1996, Ænima consolidó a TOOL como una de las propuestas más originales del rock progresivo y alternativo. La producción cruda combinada con pasajes atmosféricos profundos y las complejas líneas de batería de Danny Carey hacen que cada escucha revele nuevos matices. Para los coleccionistas de vinilos, la edición doble LP es una auténtica joya visual y sonora debido al arte de embalaje lenticular y la calidad de masterización analógica.',
    imagen: '/imagenes/Tool-AEnima.jpg',
    enlaceProducto: '/productos/aenima',
    fecha: '10 de Octubre, 2026',
  },
  {
    id: 'white-pony',
    categoria: 'Recomendación',
    titulo: 'White Pony: el disco que hay que tener',
    extracto: 'Deftones cruzó metal y clima en los 2000. Si estás armando tu estantería, este vinilo no puede faltar.',
    contenidoCompleto: 'White Pony de Deftones (2000) marcó un antes y un después en el sonido del metal alternativo, incorporando elementos de trip-hop, shoegaze y una atmósfera nocturna inigualable. Canciones como "Change (In the House of Flies)" suenan con una calidez excepcional en formato vinilo. Tener este disco en tu estantería no solo eleva tu colección visualmente por sus icónicas portadas (gris o negra con relieve), sino que representa un hito fundamental de la música de transición de milenio.',
    imagen: '/imagenes/Deftones-WhitePony.jpg',
    enlaceProducto: '/productos/white-pony',
    fecha: '02 de Octubre, 2026',
  },
  {
    id: 'cuidado-vinilos',
    categoria: 'Consejos',
    titulo: 'Guía definitiva: ¿Cómo limpiar tus vinilos sin dañarlos?',
    extracto: 'Descubre los mejores métodos, líquidos recomendados y el uso correcto de cepillos antiestáticos.',
    contenidoCompleto: 'El vinilo es un formato delicado que requiere mantenimiento constante para evitar ruidos de estática y saltos en la púa. Te recomendamos usar siempre un cepillo de fibra de carbono antes de reproducir cada disco para remover el polvo superficial. Para limpiezas profundas, utiliza una mezcla de agua destilada con unas gotas de alcohol isopropílico y un paño de microfibra sin pelusa, girando siempre en el sentido de los surcos. Evita tocar la superficie con los dedos para no transferir aceites naturales.',
    imagen: '/imagenes/limpieza.webp',
    enlaceProducto: null,
    fecha: '25 de Septiembre, 2026',
  },
]

export default function Blog() {
  // Estado para controlar cuál artículo está abierto en la ventana modal
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null)

  const abrirModal = (articulo) => {
    setArticuloSeleccionado(articulo)
  }

  const cerrarModal = () => {
    setArticuloSeleccionado(null)
  }

  return (
    <section className="container py-4">
      {/* Encabezado */}
      <div className="text-center text-md-start mb-5">
        <p className="text-uppercase fw-bold text-primary mb-2">Vinilover Blog</p>
        <h1 className="mb-3 titulo-principal">Noticias y cultura vinílica</h1>
        <p className="text-secondary col-lg-8 fs-5">
          Historias del vinilo, consejos de colección y lanzamientos que no te puedes perder.
        </p>
      </div>

      {/*¡Nos cambiamos! */}
      <div className="panel-oscuro mb-5 p-4 p-md-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <span className="badge bg-primary text-dark mb-3 px-3 py-2 text-uppercase fw-bold">
              ¡Gran Noticia!
            </span>
            <h2 className="h2 mb-3">¡Nos cambiamos de casa! 🚚✨</h2>
            <p className="text-secondary mb-4">
              Crecemos junto a ustedes. A partir de este mes nos trasladamos a un nuevo local mucho más amplio, con mayor stock, zona de escucha exclusiva y un rincón de café para los amantes de la buena música.
            </p>
            <div className="d-flex flex-wrap gap-4">
              <div>
                <strong className="d-block text-primary">Nueva Dirección:</strong>
                <span className="small text-light">Av. Providencia 1234, Local 45</span>
              </div>
              <div>
                <strong className="d-block text-primary">Horario de Atención:</strong>
                <span className="small text-light">Lunes a Sábado, 10:00 - 20:00 hrs</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 text-center">
            <div className="p-4 rounded-3 border border-light border-opacity-15 bg-black bg-opacity-25">
              <h5 className="fw-bold mb-2">¡Te esperamos!</h5>
              <p className="small text-secondary mb-0">Ven a conocer nuestra nueva sucursal con sorpresas y descuentos de inauguración.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Publicaciones */}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h2 className="h4 mb-0 fw-bold">Últimas Publicaciones</h2>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-outline-light btn-sm active">Todos</button>
          <button type="button" className="btn btn-outline-light btn-sm">Reseñas</button>
          <button type="button" className="btn btn-outline-light btn-sm">Consejos</button>
        </div>
      </div>

      <div className="row g-4">
        {articulosBlog.map((articulo) => (
          <div key={articulo.id} className="col-12 col-md-6 col-lg-4">
            <article className="card-producto h-100 d-flex flex-column">
              <div className="position-relative">
                <img 
                  src={articulo.imagen} 
                  className="card-img-top object-fit-cover" 
                  style={{ height: '220px' }} 
                  alt={articulo.titulo} 
                />
                <span className="position-absolute top-0 start-0 m-3 badge bg-primary text-dark">
                  {articulo.categoria}
                </span>
              </div>
              <div className="card-body p-4 d-flex flex-column flex-grow-1 text-start">
                <small className="text-secondary mb-2">{articulo.fecha}</small>
                <h2 className="h5 mb-2 fw-bold">{articulo.titulo}</h2>
                <p className="text-secondary small mb-4 flex-grow-1">
                  {articulo.extracto}
                </p>
                <div>
                  {}
                  <button 
                    onClick={() => abrirModal(articulo)} 
                    className="btn btn-primary btn-sm px-4"
                  >
                    Leer artículo
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {}
      {articuloSeleccionado && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)' }}
          onClick={cerrarModal}
        >
          <div 
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content panel-oscuro border border-light border-opacity-25 shadow-lg">
              <div className="modal-header border-bottom border-light border-opacity-15">
                <div>
                  <span className="badge bg-primary text-dark mb-1">{articuloSeleccionado.categoria}</span>
                  <small className="d-block text-secondary">{articuloSeleccionado.fecha}</small>
                  <h3 className="h4 mb-0 fw-bold text-white">{articuloSeleccionado.titulo}</h3>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={cerrarModal}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body py-4">
                <img 
                  src={articuloSeleccionado.imagen} 
                  className="img-fluid rounded-3 mb-4 w-100 object-fit-cover shadow" 
                  style={{ maxHeight: '300px' }} 
                  alt={articuloSeleccionado.titulo} 
                />
                <p className="text-secondary fs-6 lh-base mb-0">
                  {articuloSeleccionado.contenidoCompleto}
                </p>
              </div>
              <div className="modal-footer border-top border-light border-opacity-15 d-flex justify-content-between">
                {articuloSeleccionado.enlaceProducto ? (
                  <Link to={articuloSeleccionado.enlaceProducto} className="btn btn-outline-light btn-sm">
                    Ver álbum relacionado
                  </Link>
                ) : (
                  <span></span>
                )}
                <button type="button" className="btn btn-secondary btn-sm" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
