import { render, screen } from '@testing-library/react'
import CompraExito from '../src/pages/CompraExito'

describe('CompraExito', () => {
  it('muestra éxito', () => {
    render(<CompraExito />)

    expect(screen.getByText(/Compra exitosa/i)).toBeInTheDocument()
  })
})
