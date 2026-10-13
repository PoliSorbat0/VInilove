import { render, screen } from '@testing-library/react'
import CompraError from '../src/pages/CompraError'

describe('Valida que se muestre el error de pago', () => {
  it('muestra un error', () => {
    render(<CompraError />)

    expect(screen.getByText(/No se pudo realizar el pago/i)).toBeInTheDocument()
  })
})
