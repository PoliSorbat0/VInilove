import { render, screen, waitFor } from '@testing-library/react'
import * as productosData from '../src/data/productos'
import Categorias from '../src/pages/Categorias'

describe('Valida que las categorías se muestren', () => {
  it('muestra categorías', async () => {
    vi.spyOn(productosData, 'obtenerProductos').mockResolvedValue([
      { id: 'aenima', nombre: 'Ænima', artista: 'TOOL', precio: 34990, categoria: 'Metal', oferta: false, imagen: '/imagenes/Tool-AEnima.jpg' },
      { id: 'meteora', nombre: 'Meteora', artista: 'Linkin Park', precio: 29990, categoria: 'Rock', oferta: true, imagen: '/imagenes/LinkinPark-Meteora.jpg' },
    ])

    render(<Categorias agregarAlCarrito={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByText(/Categorías/i)).toBeInTheDocument()
    })
  })
})
