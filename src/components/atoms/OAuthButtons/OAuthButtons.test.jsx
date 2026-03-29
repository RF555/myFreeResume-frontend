import { render, screen } from '@testing-library/react'
import OAuthButtons from './OAuthButtons'

describe('OAuthButtons', () => {
  it('renders all three OAuth provider buttons', () => {
    render(<OAuthButtons />)
    expect(screen.getByText('Continue with Google')).toBeInTheDocument()
    expect(screen.getByText('Continue with GitHub')).toBeInTheDocument()
    expect(screen.getByText('Continue with LinkedIn')).toBeInTheDocument()
  })
})
