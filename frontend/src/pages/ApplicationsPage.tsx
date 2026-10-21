import { Link } from 'react-router-dom'
import { useApplications, useUpdateStatus } from '../hooks/useJobs'
import type { ApplicationStatus } from '../types'
import { formatSalary } from '../lib/format'

const statuses: ApplicationStatus[] = ['submitted', 'closed', 'rejected']

export default function ApplicationsPage() {
  const { data, isLoading, isError } = useApplications()
  const update = useUpdateStatus()

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Applications</h1>
      {isLoading && <p className="text-muted">Loading applications…</p>}
      {isError && <p className="text-red-700 dark:text-red-400">Couldn’t load applications.</p>}
      {data && data.length === 0 && (
        <p className="text-muted">
          Nothing tracked yet. Apply to a job from the{' '}
          <Link className="text-link underline" to="/jobs">
            jobs list
          </Link>{' '}
          and it will show up here.
        </p>
      )}
      {data && data.length > 0 && (
        <div className="overflow-x-auto rounded border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-subtle">
              <tr>
                <th className="px-3 py-2 font-medium">Company</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Pay</th>
                <th className="px-3 py-2 font-medium">Applied</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.id} className="border-b border-line last:border-0">
                  <td className="px-3 py-2">{a.job.company}</td>
                  <td className="px-3 py-2">
                    <Link className="text-link underline" to={`/jobs/${a.job.id}`}>
                      {a.job.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{formatSalary(a.job.salaryMin, a.job.salaryMax)}</td>
                  <td className="px-3 py-2">{a.appliedAt}</td>
                  <td className="px-3 py-2">
                    <select
                      aria-label={`Status for ${a.job.title}`}
                      className="rounded border border-line bg-surface px-2 py-1"
                      value={a.status}
                      onChange={(e) => update.mutate({ id: a.id, status: e.target.value as ApplicationStatus })}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
