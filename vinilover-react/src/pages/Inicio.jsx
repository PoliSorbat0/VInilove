const albumesDestacados = [
  {
    nombre: 'Ænima',
    artista: 'TOOL',
    ano: '1996',
    genero: 'Rock progresivo',
    descripcion: 'Un álbum intenso, experimental y profundamente atmosférico.',
  },
  {
    nombre: 'White Pony',
    artista: 'Deftones',
    ano: '2000',
    genero: 'Metal alternativo',
    descripcion:
      'Equilibrio perfecto entre agresividad, melodía y textura emocional.',
  },
  {
    nombre: 'Dirt',
    artista: 'Alice in Chains',
    ano: '1992',
    genero: 'Grunge / Rock',
    descripcion: 'Crudo, oscuro y memorable, con una identidad sonora muy poderosa.',
  },
]

export default function Inicio() {
  return (
    <section className="text-center">
      <h1 className="mb-3">Catálogo de Álbumes</h1>
      <p className="fs-5 mb-4">
        Página dedicada a mostrar álbumes destacando los mejores lanzamientos.
      </p>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div
            id="carruselAlbumes"
            className="carousel slide shadow rounded overflow-hidden"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/imagenes/Tool-AEnima.jpg"
                  className="d-block w-100"
                  alt="TOOL - Ænima"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imagenes/Deftones-WhitePony.jpg"
                  className="d-block w-100"
                  alt="Deftones - White Pony"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/imagenes/AliceInChains-Dirt.jpg"
                  className="d-block w-100"
                  alt="Alice in Chains - Dirt"
                />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carruselAlbumes"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carruselAlbumes"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="h4 mb-3">Destacados del mes</h2>

        <div className="row g-3 justify-content-center">
          {albumesDestacados.map((album) => (
            <div key={album.nombre} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-start">
                  <small className="text-muted d-block mb-2">
                    {album.artista} • {album.ano}
                  </small>
                  <h3 className="h5 mb-1">{album.nombre}</h3>
                  <p className="text-secondary mb-2">{album.genero}</p>
                  <p className="mb-0">{album.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
