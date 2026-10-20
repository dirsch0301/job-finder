import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MatchBadge from '../components/MatchBadge'
import { useApplications, useJob, useRecordApplication } from '../hooks/useJobs'
import { formatSalary } from '../lib/format'

export default function JobDetailPage() {
  const { id = '' } = useParams()
  const { data: job, isLoading, isError } = useJob(id)
  const { data: applications } = useApplications()
  const record = useRecordApplication()
  const [asking, setAsking] = useState(false)

  if (isLoading) return <p className="text-slate-600">Loading job…</p>
  if (isError || !job) return <p className="text-red-700">Couldn’t find this job.</p>

  const applied = applications?.find((a) => a.job.id === job.id)
  const sameCompany = applications?.filter((a) => a.job.company === job.company).length ?? 0

  return (
    <article>
      <Link to="/jobs" className="text-sm text-accent underline">
        Back to jobs
      </Link>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
          <p className="text-slate-600">
            {job.company} · {job.location} · {formatSalary(job.salaryMin, job.salaryMax)}
          </p>
        </div>
        <MatchBadge score={job.match.score} />
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded border border-line bg-white p-4">
          <h2 className="mb-2 font-medium">Where your resume matches</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {job.match.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded border border-line bg-white p-4">
          <h2 className="mb-2 font-medium">What the posting asks for that’s missing</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {job.match.missing.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
      {job.match.summary && <p className="mt-4 text-sm text-slate-700">{job.match.summary}</p>}

      <section className="mt-6">
        <h2 className="mb-2 font-medium">Description</h2>
        <p className="max-w-prose leading-relaxed text-slate-800">{job.description}</p>
      </section>

      <section className="mt-8 rounded border border-line bg-white p-4">
        {applied ? (
          <p className="text-sm">
            You applied on {applied.appliedAt}. Status: <strong>{applied.status}</strong>.
          </p>
        ) : asking ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm">Did you submit your application?</p>
            <button
              className="rounded bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-strong"
              onClick={() => record.mutate(job.id, { onSuccess: () => setAsking(false) })}
              disabled={record.isPending}
            >
              Yes, save it
            </button>
            <button className="rounded border border-line px-3 py-1.5 text-sm" onClick={() => setAsking(false)}>
              Not yet
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="rounded bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-strong"
              onClick={() => setAsking(true)}
            >
              Open application page
            </a>
            {sameCompany > 0 && (
              <p className="text-sm text-amber-800">
                You’ve already applied to {sameCompany} role{sameCompany > 1 ? 's' : ''} at {job.company}.
              </p>
            )}
          </div>
        )}
        {record.isError && <p className="mt-2 text-sm text-red-700">Couldn’t save the application. Try again.</p>}
      </section>
    </article>
  )
}
