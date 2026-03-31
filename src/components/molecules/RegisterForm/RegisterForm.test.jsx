import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/test-utils'
import RegisterForm from './RegisterForm'

describe('RegisterForm', () => {
  it('renders name, email, and password fields', () => {
    renderWithProviders(<RegisterForm />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders submit button with correct text', () => {
    renderWithProviders(<RegisterForm />)
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('toggles password visibility when show/hide is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
    await user.click(screen.getByRole('button', { name: /^show$/i }))
    expect(passwordInput).toHaveAttribute('type', 'text')
    await user.click(screen.getByRole('button', { name: /^hide$/i }))
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('allows typing in all fields', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterForm />)
    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe')
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com')
    expect(screen.getByLabelText(/password/i)).toHaveValue('secret123')
  })
})
