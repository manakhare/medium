import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute';

// Render a mini router starting at `path`, with a real /signin target.
const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/signin" element={<div>Sign in page</div>} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <div>Create post page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )

describe('ProtectedRoute', () => {
  beforeEach(() => localStorage.clear())

  it('redirects to /signin when there is no token', () => {
    renderAt('/create')
    expect(screen.getByText('Sign in page')).toBeInTheDocument()
    expect(screen.queryByText('Create post page')).not.toBeInTheDocument()
  })

  it('renders the protected page when a token exists', () => {
    localStorage.setItem('token', 'fake.jwt')
    renderAt('/create')
    expect(screen.getByText('Create post page')).toBeInTheDocument()
  })
})