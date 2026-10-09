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
    </section>
  )
}