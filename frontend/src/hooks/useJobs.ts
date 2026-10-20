import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/client'
import type { ApplicationStatus, JobFilters } from '../types'

export const useJobs = (filters: JobFilters) =>
  useQuery({ queryKey: ['jobs', filters], queryFn: () => api.listJobs(filters) })

export const useJob = (id: string) =>
  useQuery({ queryKey: ['job', id], queryFn: () => api.getJob(id) })

export const useApplications = () =>
  useQuery({ queryKey: ['applications'], queryFn: api.listApplications })

export function useRecordApplication() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (jobId: string) => api.recordApplication(jobId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  })
}

export function useUpdateStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: { id: string; status: ApplicationStatus }) =>
      api.updateApplicationStatus(v.id, v.status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['applications'] }),
  })
}
