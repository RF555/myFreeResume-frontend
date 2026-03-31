import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/test-utils'
import CreateEntryDialog from './CreateEntryDialog'

describe('CreateEntryDialog', () => {
  it('renders trigger button', () => {
    renderWithProviders(<CreateEntryDialog jobTypeId="jt1" />)
    expect(screen.getByText('Add Entry')).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateEntryDialog jobTypeId="jt1" />)
    await user.click(screen.getByText('Add Entry'))
    expect(screen.getByText(/new entry/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
  })

  it('allows typing in company field', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateEntryDialog jobTypeId="jt1" />)
    await user.click(screen.getByText('Add Entry'))
    await user.type(screen.getByLabelText(/company/i), 'Google')
    expect(screen.getByLabelText(/company/i)).toHaveValue('Google')
  })
})
