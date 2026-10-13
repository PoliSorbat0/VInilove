import { render, screen, waitFor } from '@testing-library/react'
import * as productosData from '../src/data/productos'
import Admin from '../src/pages/Admin'

describe('Valida que el panel de administración se muestre', () => {
  it('muestra admin', async () => {
    vi.spyOn(productosData, 'obtenerProductos').mockResolvedValue([
      { id: 'aenima', nombre: 'Ænima', artista: 'TOOL', precio: 34990, categoria: 'Metal', oferta: false, imagen: '/imagenes/Tool-AEnima.jpg' },
    ])

    render(<Admin />)

    await waitFor(() => {
      expect(screen.getByText(/Panel admin/i)).toBeInTheDocument()
    })
  })
})
