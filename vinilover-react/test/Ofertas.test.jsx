import { render, screen, waitFor } from '@testing-library/react'
import * as productosData from '../src/data/productos'
import Ofertas from '../src/pages/Ofertas'

describe('Ofertas', () => {
  it('muestra la oferta', async () => {
    vi.spyOn(productosData, 'obtenerProductos').mockResolvedValue([
      { id: 'aenima', nombre: 'Ænima', artista: 'TOOL', precio: 34990, categoria: 'Metal', oferta: false, imagen: '/imagenes/Tool-AEnima.jpg' },
      { id: 'white-pony', nombre: 'White Pony', artista: 'Deftones', precio: 32990, categoria: 'Metal', oferta: true, imagen: '/imagenes/Deftones-WhitePony.jpg' },
    ])

    render(<Ofertas agregarAlCarrito={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByText(/White Pony/i)).toBeInTheDocument()
    })
  })
})
