import BigNumber from 'bignumber.js'
import Button from 'components/Button/Button'
import TxLoader from 'components/TxLoader/TxLoader'
import Modal from './Modal'
import styles from './Modal.module.css'

interface IDopModal {
  isOpen: boolean
  pending: boolean
  balance: number
  rewardBalance: number
  price: number
  disabled: string
  theme: string
  onSubmit: Function
  onClose: Function
  closeOnEscape?: boolean
}

export default function DopModal({
  isOpen,
  pending,
  balance,
  rewardBalance,
  price,
  disabled,
  theme,
  onSubmit,
  onClose,
  closeOnEscape,
}: IDopModal) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ amount: rewardBalance })
  }

  return (
    <Modal
      show={!!isOpen}
      theme={theme}
      onRequestClose={onClose}
      closeOnEscape={closeOnEscape}
      loading={pending}
    >
      {pending ? (
        <TxLoader hash={pending ? disabled : ''} theme={theme} />
      ) : (
        <>
          {isOpen && (
            <div className={`${styles.form} ${theme === 'dark' ? styles.darkForm : ''}`}>
              <div className={`${styles.info} flex justify-between`}>
                <div className="flex-center">
                  <img src="/assets/token.png" alt="asset" />
                  <span>DOP Balance</span>
                </div>
                <div>
                  {/* <p className="text-right">
                    {new BigNumber(rewardBalance).dp(4, 1).toString(10)}
                  </p>
                  <p className="text-right">
                    $
                    {new BigNumber(rewardBalance)
                      .times(price)
                      .dp(2, 1)
                      .toString(10)}
                  </p> */}
                </div>
              </div>
              <div className={`${styles.info} flex justify-between`}>
                <div className="flex-center">
                  <span>Wallet Balance</span>
                </div>
                <span>{new BigNumber(balance).dp(4, 1).toString(10)}</span>
              </div>
              <div className={`${styles.info} flex justify-between`}>
                <div className="flex-center">
                  <span>Unclaimed Balance</span>
                </div>
                <span>
                  {new BigNumber(rewardBalance).dp(4, 1).toString(10)}
                </span>
              </div>
              <div className={`${styles.info} flex justify-between`}>
                <div className="flex-center">
                  <span>Price</span>
                </div>
                <span>${new BigNumber(price).dp(2, 1).toString(10)}</span>
              </div>
              <div className={`flex justify-end ${styles.claimBtn}`}>
                <Button
                  onClick={handleSubmit}
                  // disabled={disabled || rewardBalance === 0}
                >
                  CLAIM {new BigNumber(rewardBalance).dp(4, 1).toString(10)} DOP
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
