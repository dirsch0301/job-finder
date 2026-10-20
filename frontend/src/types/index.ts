// Mirrors the backend's generic Job class. Keep in sync with the Spring Boot DTOs.
export interface Job {
  id: string
  title: string
  company: string
  location: string
  remote: boolean
  salaryMin?: number
  salaryMax?: number
  description: string
  url: string
  source: string
  postedAt: string // ISO date
}

export interface MatchResult {
  jobId: string
  score: number // 0-100
  strengths: string[]
  missing: string[]
  summary?: string
}

export type JobWithMatch = Job & { match: MatchResult }

export type ApplicationStatus = 'submitted' | 'closed' | 'rejected'

export interface Application {
  id: string
  job: Job
  status: ApplicationStatus
  appliedAt: string // ISO date
  lastCheckedAt: string // ISO date
}

export interface JobFilters {
  query: string
  remoteOnly: boolean
  minSalary: number | null
  minScore: number
}
