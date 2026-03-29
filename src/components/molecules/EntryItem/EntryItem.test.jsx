import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import EntryItem from './EntryItem'

const mockEntry = { id: '1', company_name: 'Google' }

describe('EntryItem', () => {
  it('renders company name as a link', () => {
    renderWithProviders(<EntryItem entry={mockEntry} jobTypeId="jt1" />)
    expect(screen.getByText('Google')).toBeInTheDocument()
  })

  it('renders delete button', () => {
    renderWithProviders(<EntryItem entry={mockEntry} jobTypeId="jt1" />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
