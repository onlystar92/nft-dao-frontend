import { useEffect, useState } from 'react'
import styles from './Highlight.module.css'

export default function Highlight({ value, unit = '' }) {
  const [[main, decimal, suffix], setValue] = useState([0, 0, ''])
  useEffect(() => {
    const [main, other = ''] = value.toString().split('.')
    const last = other.length - 1
    if (!other || /[0-9]/gi.test(other[last])) {
      setValue([main, other, ''])
    } else {
      setValue([main, other.substr(0, last), other[other.length - 1]])
    }
  }, [value])

  return (
    <span className={styles.hightLight}>
      {decimal ? `${main}.` : main}
      {decimal && <span>{decimal}</span>}
      {suffix && suffix}
      {/* {unit && <>&nbsp;{unit}</>} */}
    </span>
  )
}
