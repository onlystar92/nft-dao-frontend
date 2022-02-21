import Button from 'components/Button/Button'
import TxLoader from 'components/TxLoader/TxLoader'
import Modal from './Modal'
import styles from './Modal.module.css'

interface ICollateralModal {
  network?: number
  pending: boolean
  market: any
  disabled: string
  theme: string
  onSubmit: Function
  onClose: Function
  closeOnEscape?: boolean
}

export default function CollateralModal({
  pending,
  market,
  disabled,
  theme,
  onSubmit,
  onClose,
  closeOnEscape,
}: ICollateralModal) {
  const isEnable = market && market.assetIn
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Modal
      show={!!market}
      theme={theme}
      onRequestClose={onClose}
      closeOnEscape={closeOnEscape}
      loading={pending}
    >
      {pending ? (
        <TxLoader hash={pending ? disabled : ''} theme={theme} />
      ) : (
        <form onSubmit={handleSubmit} className={`${styles.form} ${(!theme || theme === 'dark') ? styles.darkForm : ''}`}>
          {market && (
            <div className={`flex-center ${styles.assetName}`}>
              <img
                src={`/assets/cryptologos/${market.underlyingSymbol
                  .split(' ')[0]
                  .toLowerCase()}.${
                  market.underlyingSymbol === 'DOP' ? 'png' : 'svg'
                }`}
                alt="asset"
              />
              <div className={`bold ${styles.name} ${(!theme || theme === 'dark') ? styles.darkName : ''}`}>{market.underlyingName}</div>
            </div>
          )}
          <p>
            Each asset used as collateral increases your borrowing limit. Be
            careful, this can subject the asset to being seized in liquidation.
          </p>
          <div className="flex justify-end">
            <Button disabled={disabled}>
              {isEnable ? 'Exit Market' : 'Enter Market'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
