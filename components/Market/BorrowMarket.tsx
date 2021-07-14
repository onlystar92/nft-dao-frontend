import BigNumber from 'bignumber.js'
import { abbreviateNumberSI, toShow } from 'utils/number'
import styles from './Market.module.css'

interface IBorrowMarket {
  isMyMarkets?: boolean
  market: any
  balance: string
  totalCash?: number
  borrowRatePerBlock: number
  onBorrow: Function
  distributeApy: number
}

export default function BorrowMarket({
  isMyMarkets,
  market,
  balance,
  totalCash,
  borrowRatePerBlock,
  onBorrow,
  distributeApy,
}: IBorrowMarket) {
  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365

  return (
    <tr
      className={`${styles.market} ${styles.supply}`}
      onClick={() => onBorrow()}
    >
      <td>
        <div className="flex-center">
          <img
            src={`/assets/cryptologos/${market.underlyingSymbol
              .split(' ')[0]
              .toLowerCase()}.${
              market.underlyingSymbol === 'DOP' ? 'png' : 'svg'
            }`}
            className={styles.logo}
          />
          {market.underlyingSymbol}
        </div>
      </td>
      <td>
        <p>
          {toShow(
            new BigNumber(borrowRatePerBlock * blocksPerDay + 1)
              .pow(daysPerYear)
              .minus(1)
              .times(100).times(-1).plus(distributeApy)
              .dp(2, 1)
              .toString(10),
            2
          )}
          %
        </p>
      </td>
      <td>
        <p>
          {abbreviateNumberSI(Number(balance), 0, 2)} {market.underlyingSymbol}
        </p>
        <p className={styles.balanceUsd}>
          $
          {abbreviateNumberSI(
            Number(balance) * market.underlyingPriceUSD,
            0,
            2,
            market.underlyingDecimals
          )}
        </p>
      </td>
      <td>
        {isMyMarkets && (
          <div className="flex-center justify-end">
            <div className={styles.progress}>
              <div
                style={{
                  width:
                    30 *
                    ((Number(balance) * market.underlyingPriceUSD) / totalCash),
                }}
                className={styles.percent}
              />
            </div>
            {(totalCash > 0
              ? (Number(balance) * market.underlyingPriceUSD * 100) / totalCash
              : 0
            ).toFixed(2)}
            %
          </div>
        )}
        {!isMyMarkets && (
          <p>
            $
            {abbreviateNumberSI(
              Number(market.cash) * market.underlyingPriceUSD,
              0,
              2,
              market.underlyingDecimals
            )}
          </p>
        )}
      </td>
    </tr>
  )
}
