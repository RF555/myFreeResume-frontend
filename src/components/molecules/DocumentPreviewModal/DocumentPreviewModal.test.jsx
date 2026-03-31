import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import DocumentPreviewModal from './DocumentPreviewModal'

vi.mock('@/lib/api/entries', () => ({
  fetchResumeBlob: vi.fn().mockResolvedValue(new Blob()),
  fetchCoverLetterBlob: vi.fn().mockResolvedValue(new Blob()),
  downloadResume: vi.fn(),
  downloadCoverLetter: vi.fn(),
}))

vi.mock('docx-preview', () => ({
  renderAsync: vi.fn().mockResolvedValue(undefined),
}))

describe('DocumentPreviewModal', () => {
  it('does not render content when closed', () => {
    render(<DocumentPreviewModal open={false} onClose={() => {}} documentType="resume" entryId="e1" />)
    expect(screen.queryByText(/preview/i)).not.toBeInTheDocument()
  })

  it('renders dialog title when open', () => {
    render(<DocumentPreviewModal open={true} onClose={() => {}} documentType="resume" entryId="e1" />)
    expect(screen.getByText(/resume preview/i)).toBeInTheDocument()
  })

  it('renders download button when open', () => {
    render(<DocumentPreviewModal open={true} onClose={() => {}} documentType="resume" entryId="e1" />)
    expect(screen.getByRole('button', { name: /download docx/i })).toBeInTheDocument()
  })
})
