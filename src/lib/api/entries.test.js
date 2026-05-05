import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('./client', () => ({
  apiJson: vi.fn(),
  apiBlob: vi.fn(),
}))

import { sanitizeForFilename, buildFilename, downloadResume, downloadCoverLetter } from './entries'
import { apiBlob } from './client'

describe('sanitizeForFilename', () => {
  it('removes filesystem-illegal characters', () => {
    expect(sanitizeForFilename('Jane<>:"/\\|?*Doe')).toBe('JaneDoe')
  })

  it('collapses runs of whitespace to a single space', () => {
    expect(sanitizeForFilename('Jane   Doe')).toBe('Jane Doe')
  })

  it('trims leading and trailing whitespace', () => {
    expect(sanitizeForFilename('  Jane Doe  ')).toBe('Jane Doe')
  })

  it('handles a typical name unchanged', () => {
    expect(sanitizeForFilename('Jane Doe')).toBe('Jane Doe')
  })

  it('returns empty string for whitespace-only input', () => {
    expect(sanitizeForFilename('   ')).toBe('')
  })

  it('returns empty string for null/undefined input', () => {
    expect(sanitizeForFilename(null)).toBe('')
    expect(sanitizeForFilename(undefined)).toBe('')
  })

  it('preserves Unicode characters (e.g. Hebrew)', () => {
    expect(sanitizeForFilename('יעל כהן')).toBe('יעל כהן')
  })
})

describe('buildFilename', () => {
  it('builds resume filename without company when includeCompany is false', () => {
    expect(buildFilename('Jane Doe', 'Resume', 'Globex', false))
      .toBe('Jane Doe - Resume.docx')
  })

  it('builds cover letter filename without company when includeCompany is false', () => {
    expect(buildFilename('Jane Doe', 'Cover Letter', 'Globex', false))
      .toBe('Jane Doe - Cover Letter.docx')
  })

  it('builds resume filename with company when includeCompany is true', () => {
    expect(buildFilename('Jane Doe', 'Resume', 'Globex', true))
      .toBe('Jane Doe - Resume - Globex.docx')
  })

  it('builds cover letter filename with company when includeCompany is true', () => {
    expect(buildFilename('Jane Doe', 'Cover Letter', 'Globex', true))
      .toBe('Jane Doe - Cover Letter - Globex.docx')
  })

  it('falls back to no-company format when includeCompany is true but company is empty', () => {
    expect(buildFilename('Jane Doe', 'Resume', '', true))
      .toBe('Jane Doe - Resume.docx')
  })

  it('falls back to no-company format when includeCompany is true but company is whitespace', () => {
    expect(buildFilename('Jane Doe', 'Resume', '   ', true))
      .toBe('Jane Doe - Resume.docx')
  })

  it('sanitizes illegal characters in name', () => {
    expect(buildFilename('Jane / Doe', 'Resume', 'Globex', false))
      .toBe('Jane Doe - Resume.docx')
  })

  it('sanitizes illegal characters in company name', () => {
    expect(buildFilename('Jane Doe', 'Resume', 'Globex: The "Best"', true))
      .toBe('Jane Doe - Resume - Globex The Best.docx')
  })
})

describe('downloadResume / downloadCoverLetter', () => {
  let lastAnchor

  beforeEach(() => {
    apiBlob.mockResolvedValue(new Blob())
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    globalThis.URL.revokeObjectURL = vi.fn()

    const realCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag) => {
      const el = realCreateElement(tag)
      if (tag === 'a') {
        el.click = vi.fn()
        lastAnchor = el
      }
      return el
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    apiBlob.mockReset()
  })

  it('downloadResume builds filename without company by default', async () => {
    await downloadResume('e1', 'Jane Doe', 'Globex', false)
    expect(lastAnchor.download).toBe('Jane Doe - Resume.docx')
  })

  it('downloadResume builds filename with company when includeCompany is true', async () => {
    await downloadResume('e1', 'Jane Doe', 'Globex', true)
    expect(lastAnchor.download).toBe('Jane Doe - Resume - Globex.docx')
  })

  it('downloadCoverLetter builds cover-letter filename without company', async () => {
    await downloadCoverLetter('e1', 'Jane Doe', 'Globex', false)
    expect(lastAnchor.download).toBe('Jane Doe - Cover Letter.docx')
  })

  it('downloadCoverLetter builds cover-letter filename with company when includeCompany is true', async () => {
    await downloadCoverLetter('e1', 'Jane Doe', 'Globex', true)
    expect(lastAnchor.download).toBe('Jane Doe - Cover Letter - Globex.docx')
  })
})
