import Link from 'next/link'
import styles from './Farm.module.css'
import Button from 'components/Button/Button'

interface ILPFarm {
  farm: any
  isStaked: boolean
  library?: any
}

export default function LPFarm({
  farm,
  isStaked,
  library
}: ILPFarm) {
  const fromWei = (value, decimals = 18) =>
    decimals < 18 ? value / 10 ** decimals : library.web3.utils.fromWei(value)

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
        <span>{farm.apy || 0}% year</span>
      </td>
      <td>
        <span className={styles.mobileLabel}>Total staked</span>
        <p>
          {fromWei(farm.amount || 0)}
        </p>
      </td>
      <td>
        <span className={styles.mobileLabel}>My staked weight</span>
        <p>
          {farm.allocPoint}
        </p>
      </td>
      <td>
        <span className={styles.mobileLabel}>Availiable</span>
        <p>
          {Number(farm.balance || 0).toFixed(2)}
        </p>
      </td>
      <td>
        <span className={styles.mobileLabel}>My earnings</span>
        <p>
          {Number(fromWei(farm.pendingDop || 0)).toFixed(2)} Drops
        </p>
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
