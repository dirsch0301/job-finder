import type { Application, Job, MatchResult } from '../types'

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Software Engineer II, Platform',
    company: 'Northwind Cloud',
    location: 'Seattle, WA',
    remote: true,
    salaryMin: 150000,
    salaryMax: 185000,
    description:
      'Build and operate internal platform services in Java on AWS. You will own services end to end, improve reliability, and work with Lambda, DynamoDB and SQS.',
    url: 'https://example.com/jobs/northwind-swe2',
    source: 'mock',
    postedAt: '2026-10-18',
  },
  {
    id: 'j2',
    title: 'Backend Engineer, Traffic Protection',
    company: 'Larkspur Systems',
    location: 'Remote (US)',
    remote: true,
    salaryMin: 160000,
    salaryMax: 200000,
    description:
      'Design detection and mitigation pipelines for network abuse. Strong distributed systems fundamentals required. Rust or Go is a plus.',
    url: 'https://example.com/jobs/larkspur-backend',
    source: 'mock',
    postedAt: '2026-10-17',
  },
  {
    id: 'j3',
    title: 'Full Stack Engineer',
    company: 'Quillstone',
    location: 'Missoula, MT',
    remote: false,
    salaryMin: 120000,
    salaryMax: 145000,
    description:
      'Work across a React and TypeScript frontend and a Node backend. Experience with PostgreSQL and CI pipelines expected.',
    url: 'https://example.com/jobs/quillstone-fullstack',
    source: 'mock',
    postedAt: '2026-10-15',
  },
  {
    id: 'j4',
    title: 'Site Reliability Engineer',
    company: 'Brightwater Data',
    location: 'Denver, CO',
    remote: false,
    description:
      'Own uptime for a high-volume data platform. Kubernetes, Terraform and on-call experience required.',
    url: 'https://example.com/jobs/brightwater-sre',
    source: 'mock',
    postedAt: '2026-10-12',
  },
  {
    id: 'j5',
    title: 'Senior Java Engineer',
    company: 'Harbor & Pine',
    location: 'Remote (US)',
    remote: true,
    salaryMin: 175000,
    salaryMax: 215000,
    description:
      'Lead design of Spring Boot services for payments. 6+ years of Java experience and prior technical leadership required.',
    url: 'https://example.com/jobs/harborpine-senior-java',
    source: 'mock',
    postedAt: '2026-10-10',
  },
]

export const matches: Record<string, MatchResult> = {
  j1: {
    jobId: 'j1',
    score: 88,
    strengths: ['Java and AWS Lambda, DynamoDB, SQS in production', 'Three years owning services end to end'],
    missing: ['No explicit internal-platform tooling experience'],
    summary: 'Strong overlap on stack and level. The main gap is platform-tooling framing on the resume.',
  },
  j2: {
    jobId: 'j2',
    score: 84,
    strengths: ['DDoS mitigation pipelines at AWS Shield', 'Rust listed on resume'],
    missing: ['No Go experience', 'Limited network-level (L3/L4) detail on resume'],
  },
  j3: {
    jobId: 'j3',
    score: 71,
    strengths: ['React and TypeScript listed', 'PostgreSQL experience'],
    missing: ['Little frontend work shown on resume', 'No Node backend experience'],
  },
  j4: {
    jobId: 'j4',
    score: 55,
    strengths: ['On-call and operational ownership at Amazon'],
    missing: ['No Kubernetes', 'No Terraform'],
  },
  j5: {
    jobId: 'j5',
    score: 47,
    strengths: ['Java experience'],
    missing: ['Role needs 6+ years; resume shows about 3', 'No payments domain experience', 'No Spring Boot on resume'],
  },
}

export const applications: Application[] = [
  {
    id: 'a1',
    job: jobs[2],
    status: 'submitted',
    appliedAt: '2026-10-14',
    lastCheckedAt: '2026-10-19',
  },
]
