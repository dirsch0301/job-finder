export default function MatchBadge({ score }: { score: number }) {
  const tone =
    score >= 80
      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
      : score >= 60
        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
        : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'
  const label = score >= 80 ? 'Strong match' : score >= 60 ? 'Possible match' : 'Weak match'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-sm font-medium ${tone}`}
      title={label}
    >
      <span className="tabular-nums">{score}%</span>
      <span className="text-xs font-normal">{label}</span>
    </span>
  )
}