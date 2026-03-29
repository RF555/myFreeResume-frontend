import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { useJobTypes } from '@/hooks/useJobTypes'
import Navbar from '@/components/organisms/Navbar/Navbar'
import JobTypeCard from '@/components/organisms/JobTypeCard/JobTypeCard'
import CreateJobTypeDialog from '@/components/molecules/CreateJobTypeDialog/CreateJobTypeDialog'

export default function DashboardPage() {
  const { data: jobTypes, isLoading } = useJobTypes()
  const [search, setSearch] = useState('')

  const filtered = jobTypes?.filter((jt) =>
    jt.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#224E76]">My Applications</h1>
          <CreateJobTypeDialog />
        </div>
        <Input
          placeholder="Search job types..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6"
        />
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filtered?.length === 0 ? (
          <p className="text-gray-400">No job types found. Create one to get started.</p>
        ) : (
          <div className="space-y-4">
            {filtered?.map((jt) => <JobTypeCard key={jt.id} jobType={jt} />)}
          </div>
        )}
      </main>
    </div>
  )
}
