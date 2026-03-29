import { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { downloadResume, downloadCoverLetter, refreshEntryFromProfile } from '@/lib/api/entries'
import { updateEntry } from '@/lib/api/entries'
import SaveIndicator from '@/components/atoms/SaveIndicator/SaveIndicator'
import ResumeForm from './ResumeForm'
import CoverLetterForm from './CoverLetterForm'

const DEFAULT_SECTION_ORDER = ['skill_highlights', 'experience', 'education', 'languages']
const AUTO_SAVE_DELAY = 2000

export default function EntryEditor({ entry }) {
  const queryClient = useQueryClient()
  const [resume, setResume] = useState(entry.resume)
  const [coverLetter, setCoverLetter] = useState(entry.cover_letter)
  const [hiddenSections, setHiddenSections] = useState(entry.hidden_sections || {})
  const [sectionOrder, setSectionOrder] = useState(entry.section_order || DEFAULT_SECTION_ORDER)
  const [saving, setSaving] = useState(false)
  const [refreshMsg, setRefreshMsg] = useState('')
  const saveTimeout = useRef(null)
  const lastSaved = useRef(null)

  const { mutate: save } = useMutation({
    mutationFn: (data) => updateEntry(entry.id, data),
    onMutate: () => setSaving(true),
    onSettled: () => setSaving(false),
  })

  const triggerSave = useCallback(() => {
    const payload = { resume, cover_letter: coverLetter, hidden_sections: hiddenSections, section_order: sectionOrder }
    const serialized = JSON.stringify(payload)
    if (serialized === lastSaved.current) return
    lastSaved.current = serialized
    save(payload)
  }, [resume, coverLetter, hiddenSections, sectionOrder, save])

  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(triggerSave, AUTO_SAVE_DELAY)
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current) }
  }, [resume, coverLetter, hiddenSections, sectionOrder, triggerSave])

  const toggleVisibility = useCallback((sectionId) => {
    setHiddenSections(prev => {
      const next = { ...prev }
      if (next[sectionId]) delete next[sectionId]
      else next[sectionId] = true
      return next
    })
  }, [])

  const { mutate: doRefresh, isPending: isRefreshing } = useMutation({
    mutationFn: () => refreshEntryFromProfile(entry.id),
    onSuccess: (data) => {
      setResume(data.resume)
      setCoverLetter(data.cover_letter)
      queryClient.invalidateQueries({ queryKey: ['entry', entry.id] })
      setRefreshMsg('Resume refreshed from profile')
      setTimeout(() => setRefreshMsg(''), 3000)
    },
  })

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">&larr; Back</Link>
          <h1 className="text-xl font-bold text-[#224E76]">{entry.company_name}</h1>
          <SaveIndicator saving={saving} />
          {refreshMsg && <span className="text-sm text-green-600">{refreshMsg}</span>}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => doRefresh()} disabled={isRefreshing}>
            {isRefreshing ? 'Refreshing...' : 'Reset from Profile'}
          </Button>
          <Button variant="outline" onClick={() => downloadResume(entry.id)}>Download Resume</Button>
          <Button variant="outline" onClick={() => downloadCoverLetter(entry.id)}>Download Cover Letter</Button>
        </div>
      </div>
      <Tabs defaultValue="resume">
        <TabsList>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
        </TabsList>
        <TabsContent value="resume" className="pt-6">
          <ResumeForm
            data={resume}
            onChange={setResume}
            hiddenSections={hiddenSections}
            onToggleVisibility={toggleVisibility}
            sectionOrder={sectionOrder}
            onReorderSections={setSectionOrder}
          />
        </TabsContent>
        <TabsContent value="cover-letter" className="pt-6">
          <CoverLetterForm data={coverLetter} onChange={setCoverLetter} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
