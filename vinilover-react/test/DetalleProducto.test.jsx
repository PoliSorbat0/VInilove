import { render, screen, waitFor } from '@testing-library/react'
import * as productosData from '../src/data/productos'
import DetalleProducto from '../src/pages/DetalleProducto'

describe('Valida que el detalle del producto se muestre', () => {
  it('muestra el producto', async () => {
    vi.spyOn(productosData, 'obtenerProductos').mockResolvedValue([
      { id: 'aenima', nombre: 'Ænima', artista: 'TOOL', precio: 34990, anio: '1996', descripcion: 'Álbum clásico.', imagen: '/imagenes/Tool-AEnima.jpg' },
    ])

    render(<DetalleProducto agregarAlCarrito={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByText(/Ænima/i)).toBeInTheDocument()
    })
  })
})
