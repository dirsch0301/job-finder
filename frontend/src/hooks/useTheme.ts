import { useEffect, useState } from 'react'
import { applyTheme, getStoredTheme, storeTheme } from '../lib/theme'
import type { ThemePreference } from '../lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<ThemePreference>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = (next: ThemePreference) => {
    storeTheme(next)
    setThemeState(next)
  }

  return { theme, setTheme }
}