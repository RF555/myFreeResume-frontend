import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { downloadResume, downloadCoverLetter, refreshEntryFromProfile } from '@/lib/api/entries'
import { useAutoSave } from '@/hooks/useAutoSave'
import SaveIndicator from '@/components/atoms/SaveIndicator/SaveIndicator'
import ResumeForm from './ResumeForm'
import CoverLetterForm from './CoverLetterForm'

export default function EntryEditor({ entry }) {
  const queryClient = useQueryClient()
  const [refreshMsg, setRefreshMsg] = useState('')

  const { register, control, watch, reset } = useForm({
    defaultValues: {
      resume: entry.resume,
      cover_letter: entry.cover_letter,
    },
  })

  const formData = watch()
  const { saving } = useAutoSave(entry.id, formData)

  const { mutate: refreshFromProfile, isPending: isRefreshing } = useMutation({
    mutationFn: () => refreshEntryFromProfile(entry.id),
    onSuccess: (data) => {
      reset({ resume: data.resume, cover_letter: data.cover_letter })
      queryClient.invalidateQueries({ queryKey: ['entry', entry.id] })
      setRefreshMsg('Resume refreshed from profile')
      setTimeout(() => setRefreshMsg(''), 3000)
    },
    onError: () => {
      setRefreshMsg('Refresh failed')
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refreshFromProfile()}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Reset Resume from Profile'}
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
          <ResumeForm register={register} control={control} />
        </TabsContent>
        <TabsContent value="cover-letter" className="pt-6">
          <CoverLetterForm register={register} control={control} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
