export const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return 'Salary not listed'
  const k = (n: number) => `$${Math.round(n / 1000)}k`
  return min && max ? `${k(min)} – ${k(max)}` : k((min ?? max) as number)
}
