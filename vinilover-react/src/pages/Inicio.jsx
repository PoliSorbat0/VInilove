const albumesDestacados = [
  {
    nombre: 'Ænima',
    artista: 'TOOL',
    ano: '1996',
    genero: 'Rock progresivo',
    descripcion: 'Un álbum intenso, experimental y profundamente atmosférico.',
    imagen: '/imagenes/Tool-AEnima.jpg',
  },
  {
    nombre: 'White Pony',
    artista: 'Deftones',
    ano: '2000',
    genero: 'Metal alternativo',
    descripcion: 'Equilibrio perfecto entre agresividad, melodía y textura emocional.',
    imagen: '/imagenes/Deftones-WhitePony.jpg',
  },
  {
    nombre: 'Dirt',
    artista: 'Alice in Chains',
    ano: '1992',
    genero: 'Grunge / Rock',
    descripcion: 'Crudo, oscuro y memorable, con una identidad sonora muy poderosa.',
    imagen: '/imagenes/AliceInChains-Dirt.jpg',
  },
]

export default function Inicio() {
  return (
    <div className="container py-4">
      {/* Sección Hero / Bienvenida usando .panel-oscuro */}
      <section className="panel-oscuro p-5 mb-5 text-center text-md-start position-relative overflow-hidden">
        <div className="py-2">
          <span className="badge bg-primary text-dark mb-3 px-3 py-2 text-uppercase fw-bold">
            Edición Especial
          </span>
          <h1 className="display-4 mb-3 titulo-principal">Catálogo de Álbumes</h1>
          <p className="fs-5 text-secondary mb-4 col-md-8">
            Página dedicada a mostrar álbumes destacando los mejores lanzamientos y obras maestras del rock y metal.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <a href="#destacados" className="btn btn-primary fw-semibold px-4 py-2">
              Ver Destacados
            </a>
            <button className="btn btn-outline-light px-4 py-2">
              Explorar Catálogo
            </button>
          </div>
        </div>
      </section>

      {/* Carrusel dinámico */}
      <section className="mb-5">
        <h2 className="h3 text-center mb-4">Lanzamientos en Rotación</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div
              id="carruselAlbumes"
              className="carousel slide shadow rounded overflow-hidden border border-light border-opacity-10"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {albumesDestacados.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carruselAlbumes"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                    aria-current={index === 0 ? 'true' : 'false'}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              <div className="carousel-inner">
                {albumesDestacados.map((album, index) => (
                  <div
                    key={album.nombre}
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  >
                    <img
                      src={album.imagen}
                      className="d-block w-100 object-fit-cover"
                      style={{ height: '400px' }}
                      alt={`${album.artista} - ${album.nombre}`}
                    />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-2 mb-2">
                      <h5 className="mb-1 text-white">{album.nombre}</h5>
                      <p className="mb-0 text-secondary small">{album.artista} ({album.ano})</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carruselAlbumes"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carruselAlbumes"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Destacados del Mes usando .card-producto */}
      <section id="destacados" className="mt-5 pt-3">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Destacados del mes</h2>
          <p className="text-secondary">Álbumes imperdibles seleccionados por su gran identidad sonora.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {albumesDestacados.map((album) => (
            <div key={album.nombre} className="col-12 col-md-6 col-lg-4">
              <div className="card-producto h-100 d-flex flex-column">
                <div className="position-relative">
                  <img 
                    src={album.imagen} 
                    className="card-img-top object-fit-cover" 
                    style={{ height: '220px' }} 
                    alt={album.nombre} 
                  />
                  <span className="position-absolute top-0 end-0 m-3 badge bg-dark text-white border border-light border-opacity-25">
                    {album.ano}
                  </span>
                </div>
                <div className="card-body p-4 text-start d-flex flex-column flex-grow-1">
                  <small className="text-secondary d-block mb-1 text-uppercase fw-bold">
                    {album.artista}
                  </small>
                  <h3 className="h5 mb-1">{album.nombre}</h3>
                  <p className="text-secondary mb-3">{album.genero}</p>
                  <p className="mb-0 mt-auto">{album.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
