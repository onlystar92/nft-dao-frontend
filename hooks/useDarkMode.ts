import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [theme, setTheme] = useState('dark')
  const [componentMounted, setComponentMounted] = useState(false)

  const setMode = (mode: any) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = () => {
    if (!theme || theme === 'dark') {
      setMode('light')
    } else {
      setMode('dark')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme)
    } else {
      setMode('dark')
    }
    setComponentMounted(true)
  }, [])

  return [theme, toggleTheme, componentMounted] as const
}
