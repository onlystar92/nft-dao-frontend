import Modal from './Modal'
import styles from './Modal.module.css'

interface IErrorModal {
  errMessage: string
  onClose: Function
  closeOnEscape?: boolean
}

export default function ErrorModal({
  errMessage,
  onClose,
  closeOnEscape,
}: IErrorModal) {
  return (
    <Modal
      show={!!errMessage}
      onRequestClose={onClose}
      closeOnEscape={closeOnEscape}
    >
      <form className={styles.form}>
        <p className={styles.errMsg}>
          {errMessage}
        </p>
      </form>
    </Modal>
  )
}
