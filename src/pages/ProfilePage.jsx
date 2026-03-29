import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { fetchResumeProfile, updateResumeProfile } from '@/lib/api/users'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/organisms/Navbar/Navbar'
import ResumeForm from '@/components/organisms/EntryEditor/ResumeForm'
import SaveIndicator from '@/components/atoms/SaveIndicator/SaveIndicator'

const AUTO_SAVE_DELAY = 2000

export default function ProfilePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { refreshUser } = useAuth()
  const [resume, setResume] = useState(null)
  const [hiddenSections, setHiddenSections] = useState({})
  const [sectionOrder, setSectionOrder] = useState(['skill_highlights', 'experience', 'education', 'languages'])
  const [saving, setSaving] = useState(false)
  const saveTimeout = useRef(null)
  const lastSaved = useRef(null)
  const hasInitialized = useRef(false)

  const { data, isLoading } = useQuery({ queryKey: ['resumeProfile'], queryFn: fetchResumeProfile })

  useEffect(() => {
    if (data?.resume_profile) {
      setResume(data.resume_profile)
      if (!hasInitialized.current) {
        lastSaved.current = JSON.stringify(data.resume_profile)
        hasInitialized.current = true
      }
    }
  }, [data])

  const { mutate: save } = useMutation({
    mutationFn: (profileData) => updateResumeProfile(profileData),
    onMutate: () => setSaving(true),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['resumeProfile'] })
      await refreshUser()
    },
    onSettled: () => setSaving(false),
  })

  const triggerSave = useCallback(() => {
    if (!resume) return
    const serialized = JSON.stringify(resume)
    if (serialized === lastSaved.current) return
    lastSaved.current = serialized
    save(resume)
  }, [resume, save])

  useEffect(() => {
    if (!hasInitialized.current || !resume) return
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(triggerSave, AUTO_SAVE_DELAY)
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current) }
  }, [resume, triggerSave])

  const toggleVisibility = (id) => {
    setHiddenSections(prev => { const n = { ...prev }; if (n[id]) delete n[id]; else n[id] = true; return n })
  }

  if (isLoading || !resume) {
    return <div className="min-h-screen bg-gray-50"><Navbar /><div className="flex items-center justify-center py-20"><p className="text-gray-500">Loading profile...</p></div></div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#6B4C3B]">My Resume Profile</h1>
            <SaveIndicator saving={saving} />
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
        <p className="text-gray-500 mb-8">This is your base resume data. New entries will start with a copy of this profile.</p>
        <ResumeForm data={resume} onChange={setResume} hiddenSections={hiddenSections} onToggleVisibility={toggleVisibility} sectionOrder={sectionOrder} onReorderSections={setSectionOrder} />
      </main>
    </div>
  )
}
