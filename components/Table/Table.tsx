import { ReactNode, ReactNodeArray, useEffect } from 'react'
import styles from './Table.module.css'

interface Properties {
  [key: string]: string
}

interface ITable {
  children: ReactNode | ReactNodeArray
  labels?: Properties
  theme?: string
  classes?: Properties
  noBorder?: Boolean
  isBackground?: Boolean
  onLoad?: Function
}

export default function Table({
  children,
  classes = {},
  labels,
  theme,
  noBorder,
  isBackground,
  onLoad,
}: ITable) {

  useEffect(() => {
    onLoad && onLoad()
  }, [])

  return (
    <div
      className={`${styles.table} ${(!theme || theme === 'dark') ? styles.darkTable : ''} ${classes.title === 'second' ? `${styles.second}` : ``} ${classes.title === 'first' ? `${styles.first}` : ``} ${classes.table || ''}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {labels && labels.title && (
        <div className={`${styles.tableTitle} ${(!theme || theme === 'dark') ? styles.darkTableTitle : ''} bold`}>
          {labels.title}
        </div>
      )}
      <div className={`${styles.tableContent} ${(!theme || theme === 'dark') ? styles.darkTableContent : ''} ${noBorder ? styles.noBorder : ''} ${(!theme || theme === 'dark') && isBackground ? styles.backgroundTableContent : ''}`}>
        {children}
      </div>
    </div>
  )
}
