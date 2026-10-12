import { fireEvent, render, screen } from '@testing-library/react'
import Login from '../src/pages/Login'

describe('Login', () => {
  it('muestra error', () => {
    render(<Login />)

    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))

    expect(screen.getByText(/El correo debe ser válido/i)).toBeInTheDocument()
  })
})
