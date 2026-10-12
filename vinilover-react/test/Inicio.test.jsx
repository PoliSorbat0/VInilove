import { render, screen } from '@testing-library/react'
import Inicio from '../src/pages/Inicio'

describe('Inicio', () => {
  it('muestra inicio', () => {
    render(<Inicio />)

    expect(screen.getByText(/Catálogo de Álbumes/i)).toBeInTheDocument()
  })
})
