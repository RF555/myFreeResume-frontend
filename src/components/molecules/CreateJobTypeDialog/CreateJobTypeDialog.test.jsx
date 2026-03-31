import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/tests/test-utils'
import CreateJobTypeDialog from './CreateJobTypeDialog'

describe('CreateJobTypeDialog', () => {
  it('renders trigger button', () => {
    renderWithProviders(<CreateJobTypeDialog />)
    expect(screen.getByText('New Job Type')).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateJobTypeDialog />)
    await user.click(screen.getByText('New Job Type'))
    expect(screen.getByText(/create job type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  })

  it('allows typing in name field', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateJobTypeDialog />)
    await user.click(screen.getByText('New Job Type'))
    await user.type(screen.getByLabelText(/name/i), 'Frontend Developer')
    expect(screen.getByLabelText(/name/i)).toHaveValue('Frontend Developer')
  })
})
