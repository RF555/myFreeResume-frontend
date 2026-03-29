import { render, screen } from '@testing-library/react'
import SaveIndicator from './SaveIndicator'

describe('SaveIndicator', () => {
  it('shows Saving when saving is true', () => {
    render(<SaveIndicator saving={true} />)
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('shows Saved when saving is false', () => {
    render(<SaveIndicator saving={false} />)
    expect(screen.getByText('Saved')).toBeInTheDocument()
  })
})
