import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Navbar from '@/components/organisms/Navbar/Navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-[#224E76] mb-6">
          Create Professional Resumes & Cover Letters
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build job-specific documents, organize by role, and download polished Word files.
          Free forever.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="bg-[#224E76] hover:bg-[#1a3d5c]">
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">Sign In</Button>
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Organize by Job Type</h3>
            <p className="text-gray-600">Group your documents by role — Frontend Developer, Fullstack, and more. Each with tailored entries per company.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Resume & Cover Letter Pairs</h3>
            <p className="text-gray-600">Every application entry includes both a resume and cover letter. Edit together, download separately.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Professional Word Documents</h3>
            <p className="text-gray-600">Download beautifully formatted .docx files ready to send. Clean design with navy headers and structured sections.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
