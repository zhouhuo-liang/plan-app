export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'plan.theme'

export function applyTheme(name: ThemeName): void {
  document.documentElement.setAttribute('data-theme', name)
}

export function getTheme(): ThemeName {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function setTheme(name: ThemeName): void {
  applyTheme(name)
  try {
    localStorage.setItem(STORAGE_KEY, name)
  } catch {
    // ignore
  }
}
