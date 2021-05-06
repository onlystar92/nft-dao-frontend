import BigNumber from 'bignumber.js'
import Slider from 'components/Slider/Slider'
import { abbreviateNumberSI } from 'utils/number'
import styles from './Market.module.css'

interface ISupplyMarket {
  isMyMarkets?: boolean
  market: any
  balance: string
  assetsIn: string[]
  supplyRatePerBlock: number
  onSupply: Function
  onEnterMarket: Function
}

export default function SupplyMarket({
  isMyMarkets,
  market,
  balance,
  assetsIn,
  supplyRatePerBlock,
  onSupply,
  onEnterMarket,
}: ISupplyMarket) {
  const assetIn = assetsIn.some((item) => item.toLowerCase() === market.id)
  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365
  return (
    <tr
      className={`${styles.market} ${styles.supply}`}
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
          {market.underlyingSymbol}
        </div>
      </td>
      <td>
        <span className={styles.mobileLabel}>Earnings</span>
        <span>Drops</span>
      </td>
      <td>
        <span className={styles.mobileLabel}>APY</span>
        <p>
          {new BigNumber(supplyRatePerBlock * blocksPerDay + 1)
            .pow(daysPerYear)
            .minus(1)
            .times(100)
            .dp(2, 1)
            .toString(10)}
          %
        </p>
        {/* {isMyMarkets && (
          <p className={styles.textOpacity}>{market.underlyingSymbol}</p>
        )} */}
      </td>
      <td>
        <span className={styles.mobileLabel}>Wallet</span>
        <div>
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
        </div>
      </td>
      <td>
        <span className={styles.mobileLabel}>Collateral</span>
        <Slider value={assetIn} onChange={() => onEnterMarket(assetIn)} />
      </td>
    </tr>
  )
}
