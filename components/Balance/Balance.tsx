import { abbreviateNumberSI, toShow } from 'utils/number'
import styles from './Balance.module.css'

interface IBalance {
  totalCash: number
  totalBorrow: number
  netAPY: number
}

export default function Balance({ totalCash, totalBorrow, netAPY }: IBalance) {
  const borrowPercent = totalCash > 0 ? (totalBorrow / totalCash) * 100 : 0
  return (
    <div className={styles.balance}>
      <div className={`bold ${styles.loansTitle}`}>Loans</div>
      <div className={`flex-center ${styles.info}`}>
        <div className={styles.infoWrapper}>
          <div className={styles.label}>Net APY</div>
          <div className={`bold ${styles.value}`}>
            {netAPY !== 0
              ? `${
                  netAPY.toString() === 'Infinity'
                    ? '< 0.01'
                    : toShow(netAPY, 2)
                } %`
              : '...'}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.infoWrapper}>
          <div className={styles.label}>Borrow limit</div>
          <div className={`bold ${styles.value}`}>
            ${abbreviateNumberSI(totalCash, 2, 2)}
          </div>
        </div>
        <div className={styles.status}>
          <div className={`flex-center ${styles.progress}`}>
            <span
              className={styles.bar}
              style={{ width: `${Math.min(borrowPercent, 100)}%` }}
            />
            <div
              className={`bold ${styles.percent}`}
              style={{ left: `calc(${Math.min(borrowPercent, 100)}% - 31px)` }}
            >
              {borrowPercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobileInfo}>
        <div className={`flex-center justify-between ${styles.infoWrapper}`}>
          <div className={styles.label}>Net APY</div>
          <div className={`bold ${styles.value}`}>
            {netAPY !== 0
              ? `${
                  netAPY.toString() === 'Infinity'
                    ? '< 0.01'
                    : toShow(netAPY, 2)
                } %`
              : '...'}
          </div>
        </div>
        <div className={`flex-center justify-between ${styles.infoWrapper}`}>
          <div className={styles.label}>Borrow limit</div>
          <div className={`bold ${styles.value}`}>
            ${abbreviateNumberSI(totalCash, 2, 2)}
          </div>
        </div>
        <div className={`flex-center justify-between ${styles.infoWrapper}`}>
          <div className={styles.label}>Borrow limit used</div>
          <div className={`bold ${styles.value}`}>
            {borrowPercent.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  )
}
