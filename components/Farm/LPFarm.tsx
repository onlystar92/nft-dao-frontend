import BigNumber from 'bignumber.js'
import Link from 'next/link'
import styles from './Farm.module.css'
import Button from 'components/Button/Button'
import { abbreviateNumberSI } from "utils/number"

interface ILPFarm {
  farm: any
  dopPrice: number
  isStaked: boolean
  library?: any
}

export default function LPFarm({
  farm,
  dopPrice,
  isStaked,
  library
}: ILPFarm) {
  const fromWei = (value, decimals = 18) =>
    decimals < 18 ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0) : library.web3.utils.fromWei(value)

  return (
    <tr
      className={styles.farm}
    >
      <td>
        <div className="flex-center">
          <div className={`flex-center ${styles.assetIcon}`}>
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
          </div>
          {farm.label}
        </div>
      </td>
      <td>
        <span className={styles.mobileLabel}>APY%</span>
        <span>{farm.apy || 0}%</span>
      </td>
      <td>
        <span className={styles.mobileLabel}>Total staked</span>
        <p>
          {new BigNumber(farm.totalLpSupply).dp(2, 1).toString()}
        </p>
        <span className={styles.usdPrice}>
          ${abbreviateNumberSI(new BigNumber(farm.totalLpSupply).times(farm.lpPrice || 0).toString(10), 2, 2)}
        </span>
      </td>
      <td>
        <span className={styles.mobileLabel}>My Stake</span>
        <p>
          {Number(fromWei(farm.amount || 0, farm.decimals)).toFixed(2)}
        </p>
        <span className={styles.usdPrice}>
          ${abbreviateNumberSI(new BigNumber(fromWei(farm.amount || 0, farm.decimals)).times(farm.lpPrice || 0).toString(10), 2, 2)}
        </span>
      </td>
      <td>
        <span className={styles.mobileLabel}>My earnings</span>
        <p>
          {Number(fromWei(farm.pendingDop || 0)).toFixed(2)} DOP
        </p>
        <span className={styles.usdPrice}>
          ${abbreviateNumberSI(new BigNumber(fromWei(farm.pendingDop || 0)).times(dopPrice || 0).toString(10), 2, 2)}
        </span>
      </td>
      <td>
        <Link href={`/staking/lp/${farm.id}`}>
          <Button className={styles.btn}>
            {!isStaked ? 'Select' :  'Manage'}
          </Button>
        </Link>
      </td>
    </tr>
  )
}
