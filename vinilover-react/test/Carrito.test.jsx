import { render, screen } from '@testing-library/react'
import Carrito from '../src/pages/Carrito'

describe('Valida que el carrito se muestre', () => {
  it('muestra el carrito', () => {
    render(
      <Carrito
        carrito={[{ id: 'aenima', nombre: 'Ænima', precio: 34990, cantidad: 1 }]}
        cambiarCantidad={vi.fn()}
        eliminarDelCarrito={vi.fn()}
      />
    )

    expect(screen.getByText(/Carrito/i)).toBeInTheDocument()
  })
})
