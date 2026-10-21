export type ThemePreference = 'light' | 'dark' | 'system'

const KEY = 'jobfinder-theme'

export function getStoredTheme(): ThemePreference {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    // storage unavailable: fall through to default
  }
  return 'system'
}

export function storeTheme(pref: ThemePreference) {
  try {
    localStorage.setItem(KEY, pref)
  } catch {
    // ignore
  }
}

export function applyTheme(pref: ThemePreference) {
  const dark =
    pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
}