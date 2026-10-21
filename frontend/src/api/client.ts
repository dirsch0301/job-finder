// Mock-backed API. Replace the bodies with fetch() calls to the Spring Boot REST API later;
// the function signatures are the contract the pages depend on.
import type {
  Application,
  ApplicationStatus,
  JobFilters,
  JobWithMatch,
} from '../types'
import { applications, jobs, matches } from '../mocks/data'

const delay = (ms = 250) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function listJobs(filters: JobFilters): Promise<JobWithMatch[]> {
  await delay()
  const q = filters.query.trim().toLowerCase()
  
  const appliedIds = new Set(applications.map((a) => a.job.id))
  
  return jobs
    .map((job) => ({ ...job, match: matches[job.id] }))
    .filter((j) => {
      if (appliedIds.has(j.id)) return false // applied jobs live in Applications only
      if (q && !`${j.title} ${j.company} ${j.description}`.toLowerCase().includes(q)) return false
      if (filters.remoteOnly && !j.remote) return false
      if (filters.minSalary !== null && (j.salaryMax ?? 0) < filters.minSalary) return false
      if (j.match.score < filters.minScore) return false
      return true
    })
    .sort((a, b) => b.match.score - a.match.score)
}

export async function getJob(id: string): Promise<JobWithMatch> {
  await delay()
  const job = jobs.find((j) => j.id === id)
  if (!job) throw new Error('Job not found')
  return { ...job, match: matches[id] }
}

export async function listApplications(): Promise<Application[]> {
  await delay()
  return [...applications].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))
}

export async function recordApplication(jobId: string): Promise<Application> {
  await delay()
  const existing = applications.find((a) => a.job.id === jobId)
  if (existing) return existing
  const job = jobs.find((j) => j.id === jobId)
  if (!job) throw new Error('Job not found')
  const today = new Date().toISOString().slice(0, 10)
  const app: Application = {
    id: `a${applications.length + 1}`,
    job,
    status: 'submitted',
    appliedAt: today,
    lastCheckedAt: today,
  }
  applications.push(app)
  return app
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<Application> {
  await delay(150)
  const app = applications.find((a) => a.id === id)
  if (!app) throw new Error('Application not found')
  app.status = status
  return app
}
