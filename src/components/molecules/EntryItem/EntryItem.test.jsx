import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/test-utils'
import EntryItem from './EntryItem'

const mockEntry = { id: '1', company_name: 'Google' }

describe('EntryItem', () => {
  it('renders company name as a link', () => {
    renderWithProviders(<EntryItem entry={mockEntry} jobTypeId="jt1" />)
    const link = screen.getByRole('link', { name: 'Google' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/entry/1')
  })

  it('renders action buttons', () => {
    renderWithProviders(<EntryItem entry={mockEntry} jobTypeId="jt1" />)
    expect(screen.getByText('Rename')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Clone')).toBeInTheDocument()
  })

  it('shows rename input when Rename is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<EntryItem entry={mockEntry} jobTypeId="jt1" />)
    await user.click(screen.getByText('Rename'))
    expect(screen.getByDisplayValue('Google')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('cancels rename and restores link', async () => {
    const user = userEvent.setup()
    renderWithProviders(<EntryItem entry={mockEntry} jobTypeId="jt1" />)
    await user.click(screen.getByText('Rename'))
    await user.click(screen.getByText('Cancel'))
    expect(screen.getByRole('link', { name: 'Google' })).toBeInTheDocument()
  })
})
