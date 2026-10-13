import { render, screen } from '@testing-library/react'
import Inicio from '../src/pages/Inicio'

describe('Valida que la página de inicio se muestre', () => {
  it('muestra inicio', () => {
    render(<Inicio />)

    expect(screen.getByText(/Catálogo de Álbumes/i)).toBeInTheDocument()
  })
})
