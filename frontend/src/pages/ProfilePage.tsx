import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import type { ThemePreference } from '../lib/theme'

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Match my device' },
]

export default function ProfilePage() {
  const [fileName, setFileName] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex max-w-md flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>

      <section className="rounded border border-line bg-surface p-4">
        <label className="flex flex-col gap-2 text-sm">
          Upload your resume (PDF)
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
        {fileName && (
          <p className="mt-3 text-sm text-muted">
            Selected: {fileName}. Upload isn’t connected to the backend yet.
          </p>
        )}
      </section>

      <fieldset className="rounded border border-line bg-surface p-4">
        <legend className="px-1 text-sm font-medium">Appearance</legend>
        <div className="flex flex-col gap-2 text-sm">
          {themeOptions.map((o) => (
            <label key={o.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="theme"
                value={o.value}
                checked={theme === o.value}
                onChange={() => setTheme(o.value)}
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}