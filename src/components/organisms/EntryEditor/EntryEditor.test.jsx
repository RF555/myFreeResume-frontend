import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, beforeEach, describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import EntryEditor from './EntryEditor'
import * as entriesApi from '@/lib/api/entries'

vi.mock('@/lib/api/entries', () => ({
  updateEntry: vi.fn().mockResolvedValue({}),
  refreshEntryFromProfile: vi.fn().mockResolvedValue({}),
  downloadResume: vi.fn(),
  downloadCoverLetter: vi.fn(),
  fetchResumeBlob: vi.fn(),
  fetchCoverLetterBlob: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k) => k }),
}))

vi.mock('@/components/molecules/DocumentPreviewModal/DocumentPreviewModal', () => ({
  default: () => null,
}))

vi.mock('./ResumeForm', () => ({
  default: () => null,
}))

vi.mock('./CoverLetterForm', () => ({
  default: () => null,
}))

function makeEntry({ name = 'Jane Doe', companyName = 'Globex' } = {}) {
  return {
    id: 'e1',
    company_name: companyName,
    resume: {
      personal_info: { name, contact: {} },
    },
    cover_letter: {},
    hidden_sections: {},
    section_order: [],
  }
}

function renderEditor(entry) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <EntryEditor entry={entry} />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('EntryEditor — download button enable/disable', () => {
  it('enables both download buttons when full name is non-empty', () => {
    renderEditor(makeEntry({ name: 'Jane Doe' }))
    expect(screen.getByRole('button', { name: 'entry.downloadResume' })).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'entry.downloadCoverLetter' })).not.toBeDisabled()
  })

  it('disables both download buttons when full name is empty', () => {
    renderEditor(makeEntry({ name: '' }))
    expect(screen.getByRole('button', { name: 'entry.downloadResume' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'entry.downloadCoverLetter' })).toBeDisabled()
  })

  it('disables both download buttons when full name is whitespace-only', () => {
    renderEditor(makeEntry({ name: '   ' }))
    expect(screen.getByRole('button', { name: 'entry.downloadResume' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'entry.downloadCoverLetter' })).toBeDisabled()
  })

  it('sets the disabled tooltip on disabled buttons', () => {
    renderEditor(makeEntry({ name: '' }))
    const btn = screen.getByRole('button', { name: 'entry.downloadResume' })
    expect(btn).toHaveAttribute('title', 'entry.downloadDisabledTooltip')
  })
})

describe('EntryEditor — include-company checkbox', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the include-company checkbox unchecked by default', () => {
    renderEditor(makeEntry())
    const checkbox = screen.getByRole('checkbox', { name: 'entry.includeCompanyInFilename' })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('passes includeCompany=false to downloadResume by default', async () => {
    const user = userEvent.setup()
    renderEditor(makeEntry({ name: 'Jane Doe', companyName: 'Globex' }))
    await user.click(screen.getByRole('button', { name: 'entry.downloadResume' }))
    expect(entriesApi.downloadResume).toHaveBeenCalledWith('e1', 'Jane Doe', 'Globex', false)
  })

  it('passes includeCompany=true after toggling the checkbox', async () => {
    const user = userEvent.setup()
    renderEditor(makeEntry({ name: 'Jane Doe', companyName: 'Globex' }))
    await user.click(screen.getByRole('checkbox', { name: 'entry.includeCompanyInFilename' }))
    await user.click(screen.getByRole('button', { name: 'entry.downloadResume' }))
    expect(entriesApi.downloadResume).toHaveBeenCalledWith('e1', 'Jane Doe', 'Globex', true)
  })

  it('passes includeCompany flag through to downloadCoverLetter as well', async () => {
    const user = userEvent.setup()
    renderEditor(makeEntry({ name: 'Jane Doe', companyName: 'Globex' }))
    await user.click(screen.getByRole('checkbox', { name: 'entry.includeCompanyInFilename' }))
    await user.click(screen.getByRole('button', { name: 'entry.downloadCoverLetter' }))
    expect(entriesApi.downloadCoverLetter).toHaveBeenCalledWith('e1', 'Jane Doe', 'Globex', true)
  })

  it('trims the full name before passing it to download helpers', async () => {
    const user = userEvent.setup()
    renderEditor(makeEntry({ name: '  Jane Doe  ', companyName: 'Globex' }))
    await user.click(screen.getByRole('button', { name: 'entry.downloadResume' }))
    expect(entriesApi.downloadResume).toHaveBeenCalledWith('e1', 'Jane Doe', 'Globex', false)
  })
})
