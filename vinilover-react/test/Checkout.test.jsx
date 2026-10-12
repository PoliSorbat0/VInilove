import { render, screen } from '@testing-library/react'
import Checkout from '../src/pages/Checkout'

describe('Checkout', () => {
  it('muestra checkout', () => {
    render(<Checkout carrito={[{ id: 'aenima', nombre: 'Ænima', precio: 34990, cantidad: 1 }]} />)

    expect(screen.getByText(/Checkout/i)).toBeInTheDocument()
  })
})
