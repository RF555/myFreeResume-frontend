import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '@/contexts/AuthContext'

const mockAuthValue = {
  user: { id: '1', name: 'Test User', email: 'test@test.com' },
  loading: false,
  loginUser: () => {},
  logoutUser: () => {},
}

export function renderWithProviders(ui, { authValue = mockAuthValue, ...options } = {}) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>
        <BrowserRouter>{ui}</BrowserRouter>
      </AuthContext.Provider>
    </QueryClientProvider>,
    options,
  )
}
