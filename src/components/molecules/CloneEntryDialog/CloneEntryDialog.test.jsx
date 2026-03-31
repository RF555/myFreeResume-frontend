import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/test-utils'
import CloneEntryDialog from './CloneEntryDialog'

describe('CloneEntryDialog', () => {
  it('renders trigger button', () => {
    renderWithProviders(<CloneEntryDialog entryId="e1" currentJobTypeId="jt1" />)
    expect(screen.getByText('Clone')).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CloneEntryDialog entryId="e1" currentJobTypeId="jt1" />)
    await user.click(screen.getByText('Clone'))
    expect(screen.getByText(/clone entry/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/new company name/i)).toBeInTheDocument()
  })
})
