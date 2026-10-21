import type { JobFilters } from '../types'

interface Props {
  filters: JobFilters
  onChange: (next: JobFilters) => void
}

const field = 'rounded border border-line bg-surface px-2 py-1.5 text-sm'

export default function JobFiltersBar({ filters, onChange }: Props) {
  return (
    <div className="mb-5 flex flex-wrap items-end gap-4 rounded border border-line bg-surface p-4">
      <label className="flex flex-col gap-1 text-sm">
        Search
        <input
          className={`${field} w-56`}
          value={filters.query}
          placeholder="Title, company, keyword"
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Minimum salary
        <input
          className={`${field} w-32`}
          type="number"
          min={0}
          step={5000}
          value={filters.minSalary ?? ''}
          placeholder="Any"
          onChange={(e) =>
            onChange({ ...filters, minSalary: e.target.value === '' ? null : Number(e.target.value) })
          }
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Minimum match
        <select
          className={field}
          value={filters.minScore}
          onChange={(e) => onChange({ ...filters, minScore: Number(e.target.value) })}
        >
          <option value={0}>Any</option>
          <option value={60}>60% and up</option>
          <option value={80}>80% and up</option>
        </select>
      </label>
      <label className="flex items-center gap-2 pb-1.5 text-sm">
        <input
          type="checkbox"
          checked={filters.remoteOnly}
          onChange={(e) => onChange({ ...filters, remoteOnly: e.target.checked })}
        />
        Remote only
      </label>
    </div>
  )
}
