import { abbreviateNumberSI, toShow } from 'utils/number'
import styles from './AssetInfo.module.css'

interface IAssetInfo {
  infoType: string
  assetUrl: string
  theme?: string
  isBorrowLimitInfo?: boolean
  apy?: string
  borrowBalance?: number
  borrowLimit?: number
  borrowLimitUsed?: number
  distributeApy?: string
}

export default function AssetInfo({
  infoType = 'supply',
  assetUrl,
  theme,
  isBorrowLimitInfo = true,
  apy = '0',
  borrowBalance = 0,
  borrowLimit = 0,
  borrowLimitUsed = 0,
  distributeApy,
}: IAssetInfo) {
  return (
    <div className={`${styles.assetInfo} ${(!theme || theme === 'dark') ? styles.darkAssetInfo : ''}`}>
      <div className={styles.apySection}>
        <div className={`${styles.info} flex justify-between`}>
          <div className="flex-center">
            <img src={assetUrl} alt="asset" />
            <span>{infoType === 'supply' ? 'Supply' : 'Borrow'} APY</span>
          </div>
          <span>{Number(apy || 0).toFixed(2)}%</span>
        </div>
        <div className={`${styles.info} flex justify-between`}>
          <div className="flex-center">
            <img src="/assets/token.png" alt="asset" />
            <span>Distribution APY</span>
          </div>
          <span>{distributeApy ? toShow(distributeApy, 2) : '-'}%</span>
        </div>
      </div>
      {isBorrowLimitInfo && (
        <div className={styles.borrowSection}>
          <div className={`${styles.info} flex justify-between`}>
            <span>
              {infoType === 'supply' ? 'Borrow Limit' : 'Borrow Balance'}
            </span>
            <span>{`$${
              infoType === 'supply'
                ? abbreviateNumberSI(borrowLimit, 2, 2)
                : abbreviateNumberSI(borrowBalance, 2, 2)
            }`}</span>
          </div>
          <div className={`${styles.info} flex justify-between`}>
            <span>Borrow Limit Used</span>
            <span>{(borrowLimitUsed || Number(0)).toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
