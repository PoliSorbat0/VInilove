import { render, screen, waitFor } from '@testing-library/react'
import * as productosData from '../src/data/productos'
import Productos from '../src/pages/Productos'

describe('Valida que los productos se muestren', () => {
  it('muestra productos', async () => {
    vi.spyOn(productosData, 'obtenerProductos').mockResolvedValue([
      { id: 'aenima', nombre: 'Ænima', artista: 'TOOL', precio: 34990, categoria: 'Metal', oferta: false, imagen: '/imagenes/Tool-AEnima.jpg' },
      { id: 'white-pony', nombre: 'White Pony', artista: 'Deftones', precio: 32990, categoria: 'Metal', oferta: true, imagen: '/imagenes/Deftones-WhitePony.jpg' },
    ])

    render(<Productos agregarAlCarrito={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByText(/Ænima/i)).toBeInTheDocument()
    })
  })
})
