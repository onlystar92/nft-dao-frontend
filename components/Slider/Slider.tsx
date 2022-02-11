import { useEffect, useState } from 'react'
import styles from './Slider.module.css'

interface ISlider {
  value: boolean
  theme?: string
  onChange?: Function
}

export default function Slider({ value, theme, onChange }: ISlider) {
  const [checked, setChecked] = useState(false)
  const handleCheck = (e) => {
    e.stopPropagation()
    onChange && onChange()
  }

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <div
      className={`${styles.slider} ${checked ? styles.checked : ''}`}
      onClick={handleCheck}
    >
      <span className={`${styles.bar} ${theme === 'dark' ? styles.darkBar : ''}`}>
      </span>
    </div>
  )
}
