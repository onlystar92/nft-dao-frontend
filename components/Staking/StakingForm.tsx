import { useEffect, useState } from 'react'
import { TMap } from 'types'
import BigNumber from 'bignumber.js'
import Button from 'components/Button/Button'
import TxLoader from 'components/TxLoader/TxLoader'
import styles from './StakingForm.module.css'
import { toFixed } from 'utils/number'

interface IStakingForm {
  network: number
  pending: boolean
  market: any
  disabled: string
  theme?: string
  allowed: boolean
  onSubmit: Function
  onClose?: Function
}

const defaults = {
  stakeAmount: 0,
  unstakeAmount: 0,
}

export default function StakingForm({
  network,
  pending,
  market,
  disabled,
  theme,
  allowed,
  onSubmit,
  onClose,
}: IStakingForm) {
  const [tab, setTab] = useState('stake')
  const [form, setForm] = useState<TMap>(defaults)
  const { stakeAmount, unstakeAmount } = form

  const maxStake = market.balance
  const available = new BigNumber(market.amount).div(10 ** market.decimals)
  const claimAmount = new BigNumber(market.pendingDop).div(1e18)

  const handleInput = (e) => {
    let value = (e.target.value || '').replace(/[^.\d]/g, '')
    if (value.endsWith('.')) {
      value = value.replace(/\./g, '') + '.'
    } else {
      if (value) {
        value = Number(value) !== 0 ? toFixed(value, 18, true) : value
      }
    }
    setForm({ ...form, [e.target.name]: value.toString() })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tab === 'stake') {
      onSubmit({ amount: stakeAmount, type: tab })
    } else if (tab === 'unstake') {
      onSubmit({ amount: unstakeAmount, type: tab })
    } else if (tab === 'claim') {
      onSubmit({ amount: claimAmount.toString(10), type: tab })
    }
  }

  useEffect(() => {
    setForm(defaults)
  }, [tab])

  return (
    <div className={`${styles.stakingForm} ${theme === 'dark' ? styles.darkStakingForm : ''}`} onMouseDown={e => e.stopPropagation()}>
      {pending ? (
        <TxLoader hash={pending ? disabled : ''} network={network} theme={theme} />
      ) : (
          <>
            <img className={`cursor ${styles.closeBtn}`} src={theme === 'dark' ? "/assets/dark-close.png" : "/assets/close.svg"} alt="close" onClick={() => onClose()} />
            <div className={styles.tabs}>
              <Button
                className={tab === 'stake' ? styles.active : ''}
                onClick={() => tab !== 'stake' && setTab('stake')}
              >
                Stake
              </Button>
              <Button
                className={tab === 'claim' ? styles.active : ''}
                onClick={() => tab !== 'claim' && setTab('claim')}
              >
                Claim
              </Button>
              <Button
                className={tab === 'unstake' ? styles.active : ''}
                onClick={() => tab !== 'unstake' && setTab('unstake')}
              >
                Unstake & Claim
            </Button>
            </div>
            {market && (
              <form onSubmit={handleSubmit} className={styles.form}>
                {tab === 'stake' && (
                  <>
                    {allowed && (
                      <div className={styles.field}>
                        <div className={`${styles.inputWrapper} flex-center`}>
                          <input
                            id="stakeAmount"
                            name="stakeAmount"
                            type="text"
                            value={stakeAmount}
                            onChange={handleInput}
                          />
                          <div
                            className={styles.maxBtn}
                            onClick={() =>
                              setForm({
                                ...form,
                                stakeAmount: maxStake,
                              })
                            }
                          >
                            MAX
                          </div>
                        </div>
                        <label className="flex-center justify-between" htmlFor="stakeAmount">
                          <span>${new BigNumber(market.lpPrice).times(stakeAmount || 0).dp(2, 1).toString(10)}</span>
                          <span>Max: {new BigNumber(maxStake).dp(2, 1).toString(10)} {market.type === 'LP' ? 'LP' : market.symbol}</span>
                        </label>
                      </div>
                    )}
                    {!allowed && (
                      <p className={styles.enableMsg}>
                        To Stake {market.type === 'LP' ? 'LP' : market.symbol} token to the drops, you need to enable it first.
                      </p>
                    )}
                    <div className="flex">
                      <Button
                        className="flex-center justify-center"
                        disabled={allowed && (disabled || stakeAmount <= 0 || stakeAmount > maxStake)}
                      >
                        {allowed ? 'Stake' : 'Enable'}
                      </Button>
                    </div>
                  </>
                )}
                {tab === 'claim' && (
                  <>
                    <div className={`flex-column justify-center ${styles.field}`}>
                      <div className={`center ${styles.claimLabel}`}>
                        Claimable DOP
                      </div>
                      <div className={`center bold ${styles.claimValue}`}>
                        {new BigNumber(market.pendingDop).div(1e18).dp(2, 1).toString(10)}
                      </div>
                    </div>
                    <div className="flex">
                      <Button
                        className="flex-center justify-center"
                        disabled={disabled || claimAmount.toNumber() <= 0}
                      >
                        Claim
                      </Button>
                    </div>
                  </>
                )}
                {tab === 'unstake' && (
                  <>
                    <div className={styles.field}>
                      <div className={`${styles.inputWrapper} flex-center`}>
                        <input
                          id="unstakeAmount"
                          name="unstakeAmount"
                          type="text"
                          value={unstakeAmount}
                          onChange={handleInput}
                        />
                        <div
                          className={styles.safeMaxBtn}
                          onClick={() =>
                            setForm({
                              ...form,
                              unstakeAmount: available.toString(10),
                            })
                          }
                        >
                          MAX
                        </div>
                      </div>
                      <label className="flex-center justify-between" htmlFor="unstakeAmount">
                        <span>${new BigNumber(market.lpPrice).times(unstakeAmount || 0).dp(2, 1).toString(10)}</span>
                        <span>Max: {available.dp(2, 1).toString(10)} {market.type === 'LP' ? 'LP' : market.symbol}</span>
                      </label>
                      <div className={`flex-center justify-between ${styles.claimPoint}`}>
                        <span>Claimable DOP</span>
                        <span>
                          {new BigNumber(market.pendingDop).div(1e18).dp(2, 1).toString(10)}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <Button
                        disabled={
                          disabled ||
                          unstakeAmount <= 0 ||
                          unstakeAmount > available.toNumber()
                        }
                      >
                        Unstake & Claim
                    </Button>
                    </div>
                  </>
                )}
              </form>
            )}
          </>
        )}
    </div>
  )
}
