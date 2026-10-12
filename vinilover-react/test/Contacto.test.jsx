import { fireEvent, render, screen } from '@testing-library/react'
import Contacto from '../src/pages/Contacto'

describe('Contacto', () => {
  it('valida el formulario', () => {
    render(<Contacto />)

    fireEvent.click(screen.getByRole('button', { name: /Enviar mensaje/i }))

    expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument()
  })
})
