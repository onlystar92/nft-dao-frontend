import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [theme, setTheme] = useState('light')
  const [componentMounted, setComponentMounted] = useState(false)

  const setMode = (mode: any) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = () => {
    if (!theme || theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme)
    } else {
      setMode('light')
    }
    setComponentMounted(true)
  }, [])

  return [theme, toggleTheme, componentMounted] as const
}
