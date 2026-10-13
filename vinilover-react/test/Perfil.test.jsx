import { render, screen } from '@testing-library/react'
import * as authData from '../src/data/auth'
import Perfil from '../src/pages/Perfil'

describe('Valida que el perfil del usuario se muestre', () => {
  it('muestra perfil', () => {
    vi.spyOn(authData, 'obtenerUsuarioActual').mockReturnValue({
      nombre: 'Ana',
      apellidos: 'Pérez',
      run: '19011022K',
      correo: 'ana@duoc.cl',
      rol: 'cliente',
    })

    render(<Perfil />)

    expect(screen.getByText(/Mi perfil/i)).toBeInTheDocument()
  })
})
