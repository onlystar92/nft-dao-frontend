import BigNumber from 'bignumber.js'
import Link from 'next/link'
import styles from './Pool.module.css'
import Button from 'components/Button/Button'
import { abbreviateNumberSI } from 'utils/number'

interface ILPFarm {
  lendingType?: string
  farm: any
  theme?: string
  library?: any
}

export default function Pool({ lendingType, farm, theme, library }: ILPFarm) {
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)

  return (
    <tr className={styles.farm}>
      <td>
        <div className="flex-center">
          {/* <div className={`flex-center ${styles.assetIcon}`}>
            {farm.firstAsset && (
              <img
                src={farm.firstAsset}
                className={`${styles.logo} ${styles.firstAsset}`}
              />
            )}
            {farm.secondAsset && (
              <img
                src={farm.secondAsset}
                className={`${styles.logo} ${styles.secondAsset}`}
              />
            )}
          </div> */}
          {farm.name}
        </div>
      </td>
      <td>
        <span className={styles.mobileLabel}>Total supply</span>
        <span>
          $
          {abbreviateNumberSI(
            new BigNumber(farm.totalSupply).toString(10),
            2,
            2
          )}
        </span>
      </td>
      <td>
        <span className={styles.mobileLabel}>Available to borrow</span>
        <span
          className={`${!theme || theme === 'dark' ? styles.darkUsdPrice : ''}`}
        >
          $
          {abbreviateNumberSI(
            new BigNumber(farm.availableToBorrow).toString(10),
            2,
            2
          )}
        </span>
      </td>
      <td>
        <span className={styles.mobileLabel}>Tokens</span>
        <div className={styles.tokenList}>
          {farm.tokens.map((t, idx) => {
            if (idx < 7) {
              return (
                <img
                  src={`/assets/cryptologos/${t.toLowerCase()}.${
                    t === 'DOP' ? 'png' : 'svg'
                  }`}
                  style={{ marginLeft: idx !== 0 ? -12 : 0, zIndex: 100 - idx }}
                />
              )
            }
          })}
          {farm.tokens.length > 7 && (
            <div className={styles.moreToken}>{farm.tokens.length - 7}+</div>
          )}
        </div>
      </td>
      {/* <td>
        <span className={styles.mobileLabel}>APY</span>
        <p>
          {farm.Apy.min} ~ {farm.Apy.max}
        </p>
      </td> */}
      <td>
        <Link
          href={
            lendingType === 'token'
              ? `/lending/pool/${farm.id}`
              : `/lending/nft-pool/${farm.id}`
          }
        >
          <Button
            className={`${styles.btn} ${
              !theme || theme === 'dark' ? styles.darkBtn : ''
            }`}
          >
            Select
          </Button>
        </Link>
      </td>
    </tr>
  )
}
