import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { fetchResumeProfile, updateResumeProfile } from '@/lib/api/users'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/organisms/Navbar/Navbar'
import ResumeForm from '@/components/organisms/EntryEditor/ResumeForm'

export default function ProfilePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { refreshUser } = useAuth()
  const [saveStatus, setSaveStatus] = useState('')
  const [resume, setResume] = useState(null)
  const [hiddenSections, setHiddenSections] = useState({})
  const [sectionOrder, setSectionOrder] = useState(['skill_highlights', 'experience', 'education', 'languages'])

  const { data, isLoading } = useQuery({ queryKey: ['resumeProfile'], queryFn: fetchResumeProfile })

  useEffect(() => {
    if (data?.resume_profile) setResume(data.resume_profile)
  }, [data])

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: () => updateResumeProfile(resume),
    onSuccess: async () => {
      setSaveStatus('Saved!')
      queryClient.invalidateQueries({ queryKey: ['resumeProfile'] })
      await refreshUser()
      setTimeout(() => setSaveStatus(''), 2000)
    },
    onError: () => setSaveStatus('Save failed'),
  })

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
          <h1 className="text-2xl font-bold text-[#224E76]">My Resume Profile</h1>
          <div className="flex items-center gap-3">
            {saveStatus && <span className="text-sm text-gray-500">{saveStatus}</span>}
            <Button onClick={() => saveProfile()} disabled={isPending}>{isPending ? 'Saving...' : 'Save Profile'}</Button>
          </div>
        </div>
        <p className="text-gray-500 mb-8">This is your base resume data. New entries will start with a copy of this profile.</p>
        <ResumeForm data={resume} onChange={setResume} hiddenSections={hiddenSections} onToggleVisibility={toggleVisibility} sectionOrder={sectionOrder} onReorderSections={setSectionOrder} />
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          <Button onClick={() => saveProfile()} disabled={isPending}>{isPending ? 'Saving...' : 'Save Profile'}</Button>
        </div>
      </main>
    </div>
  )
}
