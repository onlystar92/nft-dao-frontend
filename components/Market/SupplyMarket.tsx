import BigNumber from 'bignumber.js'
import Slider from 'components/Slider/Slider'
import { abbreviateNumberSI, toShow } from 'utils/number'
import styles from './Market.module.css'

interface ISupplyMarket {
  market: any
  balance: string
  assetsIn: string[]
  supplyRatePerBlock: number
  onSupply: Function
  onEnterMarket: Function
  distributeApy: number
  theme: string
}

export default function SupplyMarket({
  market,
  balance,
  assetsIn,
  supplyRatePerBlock,
  onSupply,
  onEnterMarket,
  distributeApy,
  theme
}: ISupplyMarket) {
  const assetIn = assetsIn.some((item) => item.toLowerCase() === market.id)
  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365
  return (
    <tr
      className={`${styles.market} ${styles.supply} ${theme === 'dark' ? styles.darkMarket : ''}`}
      onClick={() => onSupply()}
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
          <div>
            <div>{market.underlyingSymbol}</div>
            <div className={styles.ltv}>{+(market.collateralFactor || 0) * 100}%</div>
          </div>
        </div>
      </td>
      <td>
        <span className={styles.mobileLabel}>APY</span>
        <p>
          {toShow(
            new BigNumber(supplyRatePerBlock * blocksPerDay + 1)
              .pow(daysPerYear)
              .minus(1)
              .times(100)
              // .plus(distributeApy)
              .dp(2, 1)
              .toString(10),
            2
          )}
          %
        </p>
        <p className={`${styles.balanceUsd}`}>
          <img src="/assets/token.png" />
          &nbsp;{toShow(new BigNumber(distributeApy), 2)}%
        </p>
      </td>
      <td>
        <span className={styles.mobileLabel}>Wallet</span>
        <div>
          <p>
            {abbreviateNumberSI(Number(balance), 2, 2)}{' '}
            {market.underlyingSymbol}
          </p>
          <p className={`${styles.balanceUsd}`}>
            $
            {abbreviateNumberSI(
              Number(balance) * market.underlyingPriceUSD,
              2,
              2,
              market.underlyingDecimals
            )}
          </p>
        </div>
      </td>
      <td>
        <span className={styles.mobileLabel}>Collateral</span>
        {market.collateralFactor !== '0' && (
          <Slider value={assetIn} theme={theme} onChange={() => onEnterMarket(assetIn)} />
        )}
      </td>
    </tr>
  )
}
