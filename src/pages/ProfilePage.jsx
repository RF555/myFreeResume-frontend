import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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

  const { data, isLoading } = useQuery({
    queryKey: ['resumeProfile'],
    queryFn: fetchResumeProfile,
  })

  const { register, control, reset, handleSubmit } = useForm()

  useEffect(() => {
    if (data?.resume_profile) {
      reset({ resume: data.resume_profile })
    }
  }, [data, reset])

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: (formData) => updateResumeProfile(formData.resume),
    onSuccess: async () => {
      setSaveStatus('Saved!')
      queryClient.invalidateQueries({ queryKey: ['resumeProfile'] })
      await refreshUser()
      setTimeout(() => setSaveStatus(''), 2000)
    },
    onError: () => setSaveStatus('Save failed'),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-[#224E76]">My Resume Profile</h1>
          <div className="flex items-center gap-3">
            {saveStatus && <span className="text-sm text-gray-500">{saveStatus}</span>}
            <Button onClick={handleSubmit(saveProfile)} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
        <p className="text-gray-500 mb-8">
          This is your base resume data. New entries will start with a copy of this profile.
        </p>
        <form onSubmit={handleSubmit(saveProfile)}>
          <ResumeForm register={register} control={control} />
        </form>
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button onClick={handleSubmit(saveProfile)} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </main>
    </div>
  )
}
