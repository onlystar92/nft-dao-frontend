import Button from 'components/Button/Button'
import { getEtherscan } from 'utils/links'
import styles from './TxLoader.module.css'

interface ITxLoader {
  hash?: string
  network?: number
  theme?: string
}

export const scanLabels = {
  1: 'Etherscan',
  4: 'Etherscan',
  56: 'Bscscan',
  97: 'Bscscan',
}

export default function TxLoader({ hash, network, theme }: ITxLoader) {
  const text = hash ? 'Transaction pending...' : 'Waiting confirmation...'
  return (
    <div className={`${styles.loader} ${(!theme || theme === 'dark') ? styles.darkLoader : ''}`}>
      <div className={`flex-all ${styles.loadingAnimation}`}>
        <img src="/assets/clock.svg" />
      </div>
      <p>{text}</p>
      {hash && <Button href={getEtherscan(hash, network)} className="padded">View on {scanLabels[network] || 'Etherscan'}</Button>}
    </div>
  )
}
