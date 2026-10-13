import { render, screen } from '@testing-library/react'
import CompraExito from '../src/pages/CompraExito'

describe('Valida que se muestre la confirmación de compra exitosa', () => {
  it('muestra éxito', () => {
    render(<CompraExito />)

    expect(screen.getByText(/Compra exitosa/i)).toBeInTheDocument()
  })
})
