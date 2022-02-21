import { abbreviateNumberSI, toShow } from 'utils/number'
import BigNumber from 'bignumber.js'
import styles from './Balance.module.css'

interface IBalance {
  TVL: BigNumber
  MarketBorrowed: BigNumber
  totalCash: number
  totalBorrow: number
  netAPY: number
  theme?: string
}

export default function Balance({
  TVL,
  MarketBorrowed,
  totalCash,
  totalBorrow,
  netAPY,
  theme,
}: IBalance) {
  const borrowPercent = totalCash > 0 ? (totalBorrow / totalCash) * 100 : 0
  let barBg = ''

  if (borrowPercent >= 80) {
    barBg = 'red'
  } else if (borrowPercent >= 60) {
    barBg = 'blue'
  } else {
    barBg = 'blue'
  }

  return (
    <div className={styles.balance}>
      <div className={`bold ${styles.loansTitle} ${(!theme || theme === 'dark') ? styles.darkLoansTitle : ''}`}>
        Total Supply:{' '}
        {TVL ? `$${abbreviateNumberSI(TVL.toString(10), 2, 2)}` : ''}
      </div>
      <div className={`bold ${styles.loansTitle} ${(!theme || theme === 'dark') ? styles.darkLoansTitle : ''}`}>
        Total Borrowed:{' '}
        {MarketBorrowed
          ? `$${abbreviateNumberSI(MarketBorrowed.toString(10), 2, 2)}`
          : ''}
      </div>
      <div className={`flex-center ${styles.info} ${(!theme || theme === 'dark') ? styles.darkInfo : ''}`}>
        <div className={`${styles.netApyWrapper} ${(!theme || theme === 'dark') ? styles.darkNetApyWrapper : ''}`}>
          <div className={styles.infoWrapper}>
            <div className={styles.label}>Net APY</div>
            <div className={`bold ${styles.value} ${(!theme || theme === 'dark') ? styles.darkValue : ''}`}>
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
            <div className={`bold ${styles.value} ${(!theme || theme === 'dark') ? styles.darkValue : ''}`}>
              ${abbreviateNumberSI(totalCash, 2, 2)}
            </div>
          </div>
          <div className={styles.status}>
            <div className={`flex-center ${styles.progress}`}>
              <span
                className={`${styles.bar} ${(!theme || theme === 'dark') ? styles.darkBar : ''}`}
                style={{ width: `${100 - Math.min(borrowPercent, 100)}%` }}
              />
              <div
                className={`bold ${styles.percent} ${
                  styles[`percent_${barBg}`]
                } ${styles[`bar_${barBg}`]}`}
                style={{
                  left: `calc(${Math.min(borrowPercent, 100)}% - 50px)`,
                }}
              >
                {borrowPercent.toFixed(2)}%
              </div>
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
