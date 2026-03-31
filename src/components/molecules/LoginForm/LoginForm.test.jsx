import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/test-utils'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    renderWithProviders(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderWithProviders(<LoginForm />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('allows typing in email and password fields', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com')
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123')
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: /show/i }))
    expect(passwordInput).toHaveAttribute('type', 'text')
  })
})
