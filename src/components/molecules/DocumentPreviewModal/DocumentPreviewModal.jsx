import { useState, useRef, useEffect, useCallback } from 'react'
import { renderAsync } from 'docx-preview'
import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { fetchResumeBlob, fetchCoverLetterBlob, downloadResume, downloadCoverLetter } from '@/lib/api/entries'
import { DOCUMENT_TYPES } from '@/lib/constants'

const PREVIEW_OPTIONS = {
  breakPages: true,
  inWrapper: true,
  ignoreWidth: false,
  ignoreHeight: false,
}

const LABELS = {
  [DOCUMENT_TYPES.RESUME]: 'Resume Preview',
  [DOCUMENT_TYPES.COVER_LETTER]: 'Cover Letter Preview',
}

export default function DocumentPreviewModal({ open, onClose, documentType, entryId }) {
  const containerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadPreview = useCallback(async () => {
    if (!open || !entryId || !documentType) return

    setLoading(true)
    setError(null)

    try {
      const fetchBlob = documentType === DOCUMENT_TYPES.RESUME ? fetchResumeBlob : fetchCoverLetterBlob
      const blob = await fetchBlob(entryId)
      const arrayBuffer = await blob.arrayBuffer()

      if (containerRef.current) {
        containerRef.current.innerHTML = ''
        await renderAsync(arrayBuffer, containerRef.current, null, PREVIEW_OPTIONS)
      }
    } catch (err) {
      setError(err.message || 'Failed to load preview')
    } finally {
      setLoading(false)
    }
  }, [open, entryId, documentType])

  useEffect(() => {
    loadPreview()
  }, [loadPreview])

  const handleDownload = () => {
    if (documentType === DOCUMENT_TYPES.RESUME) {
      downloadResume(entryId)
    } else {
      downloadCoverLetter(entryId)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent
        showCloseButton
        className="sm:max-w-4xl max-h-[90vh] flex flex-col"
      >
        <DialogHeader>
          <DialogTitle>{LABELS[documentType]}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto min-h-0 bg-gray-100 rounded-md p-4">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground/30 border-t-muted-foreground" />
                <span className="text-sm">Generating preview...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3 text-destructive">
                <span className="text-sm">{error}</span>
                <Button variant="outline" size="sm" onClick={loadPreview}>
                  Retry
                </Button>
              </div>
            </div>
          )}

          <div
            ref={containerRef}
            className={cn((loading || error) && 'hidden')}
          />
        </div>

        <DialogFooter>
          <Button onClick={handleDownload}>
            Download DOCX
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
