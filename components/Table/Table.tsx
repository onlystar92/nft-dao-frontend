import { ReactNode, ReactNodeArray, useEffect } from 'react'
import styles from './Table.module.css'

interface Properties {
  [key: string]: string
}

interface ITable {
  children: ReactNode | ReactNodeArray
  labels?: Properties
  classes?: Properties
  onLoad?: Function
}

export default function Table({
  children,
  classes = {},
  labels,
  onLoad,
}: ITable) {

  useEffect(() => {
    onLoad && onLoad()
  }, [])

  return (
    <div
      className={`${styles.table} ${classes.title ? `${styles.second}` : `${styles.first}`} ${classes.table || ''}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {labels && labels.title && (
        <div className={`${styles.tableTitle} bold`}>
          {labels.title}
        </div>
      )}
      <div className={`${styles.tableContent}`}>
        {children}
      </div>
    </div>
  )
}
