import { ReactNode, ReactNodeArray, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Table from 'components/Table/Table'
import styles from './Modal.module.css'

interface IModal {
  loading?: boolean
  children: ReactNode | ReactNodeArray
  show: boolean
  theme?: string
  onRequestClose?: Function
  closeOnEscape?: boolean
  extra?: ReactNode | ReactNodeArray
  className?: string
}

export default function Modal({
  loading = false,
  children,
  show,
  theme,
  onRequestClose,
  closeOnEscape = true,
  extra = null,
  className = '',
}: IModal) {
  const [loaded, setLoaded] = useState(false)
  function handleKeyUp(e) {
    if (e.key === 'Escape') onRequestClose && onRequestClose()
  }
  useEffect(() => {
    closeOnEscape && window.addEventListener('keyup', handleKeyUp)
    setLoaded(true)
    return () =>
      closeOnEscape && window.removeEventListener('keyup', handleKeyUp)
  }, [])
  if (!loaded) return null
  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${show ? styles.show : styles.hide} ${(!theme || theme === 'dark') ? styles.darkOverlay : ''}`}
      onMouseDown={() => onRequestClose && onRequestClose()}
    >
      <div className={`${styles.wrapper} ${className} ${(!theme || theme === 'dark') ? styles.darkWrapper : ''}`} onMouseDown={e => e.stopPropagation()}>
        <img className={`${styles.closeBtn} cursor`} src={(!theme || theme === 'dark') ? "/assets/dark-close.png" : "/assets/close.svg"} alt="close" onClick={() => onRequestClose && onRequestClose()} />
        <Table
          theme={theme}
          classes={{
            table: `${styles.table}`,
            content: loading ? styles.loading : styles.content,
          }}
        >
          {children}
        </Table>
        {extra}
      </div>
    </div>,
    document.body
  )
}
