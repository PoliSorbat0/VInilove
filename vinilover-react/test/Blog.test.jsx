import { render, screen } from '@testing-library/react'
import Blog from '../src/pages/Blog'

describe('Blog', () => {
  it('muestra el blog', () => {
    render(<Blog />)

    expect(screen.getByText(/Vinilover Blog/i)).toBeInTheDocument()
  })
})
