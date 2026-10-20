import { useState } from 'react'
import { Link } from 'react-router-dom'
import JobFiltersBar from '../components/JobFiltersBar'
import MatchBadge from '../components/MatchBadge'
import { useJobs } from '../hooks/useJobs'
import type { JobFilters } from '../types'
import { formatSalary } from '../lib/format'

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({
    query: '',
    remoteOnly: false,
    minSalary: null,
    minScore: 0,
  })
  const { data, isLoading, isError } = useJobs(filters)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Recommended jobs</h1>
      <JobFiltersBar filters={filters} onChange={setFilters} />

      {isLoading && <p className="text-slate-600">Loading jobs…</p>}
      {isError && <p className="text-red-700">Couldn’t load jobs. Check that the API is running and try again.</p>}
      {data && data.length === 0 && (
        <p className="text-slate-600">No jobs match these filters. Lower the minimum match or clear the search.</p>
      )}

      <ul className="flex flex-col gap-3">
        {data?.map((job) => (
          <li key={job.id}>
            <Link
              to={`/jobs/${job.id}`}
              className="flex items-start justify-between gap-4 rounded border border-line bg-white p-4 hover:border-accent"
            >
              <div>
                <h2 className="font-medium">{job.title}</h2>
                <p className="text-sm text-slate-600">
                  {job.company} · {job.location}
                  {job.remote ? ' · Remote OK' : ''}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {formatSalary(job.salaryMin, job.salaryMax)} · Posted {job.postedAt}
                </p>
              </div>
              <MatchBadge score={job.match.score} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
