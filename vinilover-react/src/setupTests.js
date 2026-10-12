import React from 'react'
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({ id: 'aenima' }),
}))
