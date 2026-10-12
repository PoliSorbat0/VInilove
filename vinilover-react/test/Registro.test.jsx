import { fireEvent, render, screen } from '@testing-library/react'
import Registro from '../src/pages/Registro'

describe('Registro', () => {
  it('valida registro', () => {
    render(<Registro />)

    fireEvent.click(screen.getByRole('button', { name: /Registrarme/i }))

    expect(screen.getByText(/El RUN debe ir sin puntos ni guion/i)).toBeInTheDocument()
  })
})
