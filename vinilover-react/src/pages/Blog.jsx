import { Link } from 'react-router-dom'

export default function Blog() {
  return (
    <section>
      <p className="text-uppercase fw-bold text-primary mb-2">Vinilover Blog</p>
      <h1 className="mb-3">Noticias y cultura vinílica</h1>
      <p className="mb-4">
        Historias del vinilo, consejos de colección y lanzamientos que no te puedes perder.
      </p>

      <div className="row g-4">
        <div className="col-md-6">
          <article className="card h-100 shadow-sm">
            <img src="/imagenes/Tool-AEnima.jpg" className="card-img-top" alt="Ænima" />
            <div className="card-body">
              <span className="badge bg-primary mb-2">Reseña</span>
              <h2 className="h4">¿Por qué Ænima sigue siendo un clásico?</h2>
              <p>
                La mezcla de tensión y atmósfera de Tool lo convierte en una pieza
                fundamental para cualquier colección.
              </p>
              <Link to="/productos/aenima" className="btn btn-outline-dark btn-sm">
                Ver álbum
              </Link>
            </div>
          </article>
        </div>

        <div className="col-md-6">
          <article className="card h-100 shadow-sm">
            <img src="/imagenes/Deftones-WhitePony.jpg" className="card-img-top" alt="White Pony" />
            <div className="card-body">
              <span className="badge bg-primary mb-2">Recomendación</span>
              <h2 className="h4">White Pony: el disco que hay que tener</h2>
              <p>
                Deftones cruzó metal y clima en los 2000. Si estás armando tu
                estantería, este vinilo no puede faltar.
              </p>
              <Link to="/productos/white-pony" className="btn btn-outline-dark btn-sm">
                Ver álbum
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
