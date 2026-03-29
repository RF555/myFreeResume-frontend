import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { downloadResume, downloadCoverLetter } from '@/lib/api/entries'
import { useAutoSave } from '@/hooks/useAutoSave'
import SaveIndicator from '@/components/atoms/SaveIndicator/SaveIndicator'
import ResumeForm from './ResumeForm'
import CoverLetterForm from './CoverLetterForm'

export default function EntryEditor({ entry }) {
  const { register, control, watch } = useForm({
    defaultValues: {
      resume: entry.resume,
      cover_letter: entry.cover_letter,
    },
  })

  const formData = watch()
  const { saving } = useAutoSave(entry.id, formData)

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">&larr; Back</Link>
          <h1 className="text-xl font-bold text-[#224E76]">{entry.company_name}</h1>
          <SaveIndicator saving={saving} />
        </div>
        <div className="flex gap-2">
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
