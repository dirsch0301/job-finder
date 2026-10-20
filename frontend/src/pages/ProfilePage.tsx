import { useState } from 'react'

export default function ProfilePage() {
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Profile</h1>
      <div className="max-w-md rounded border border-line bg-white p-4">
        <label className="flex flex-col gap-2 text-sm">
          Upload your resume (PDF)
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
        {fileName && (
          <p className="mt-3 text-sm text-slate-700">
            Selected: {fileName}. Upload isn’t connected to the backend yet.
          </p>
        )}
      </div>
    </div>
  )
}
