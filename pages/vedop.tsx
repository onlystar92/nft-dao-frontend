import { useState, useEffect } from 'react'
import { TMap } from 'types'
import Button from 'components/Button/Button'
import { scanLabels } from 'components/TxLoader/TxLoader'
import { getVestings } from 'utils/library'
import { getEtherscan } from 'utils/links'
import styles from 'styles/VeDop.module.css'
import BigNumber from 'bignumber.js'
import { toFixed } from 'utils/number'

const FETCH_TIME = 15
let poolTimer = null

const defaults = {
  dopBalance: 0,
  dopUsdAmount: 0,
  poolUsdAmount: 0,
  veDopBalance: 0,
}

const lockPeriod = [
  { duration: 1, unit: 'month' },
  { duration: 1, unit: 'year' },
  { duration: 2, unit: 'years' },
  { duration: 4, unit: 'years' },
]

export default function VeDop({ library, state, dispatch }) {
  const [form, setForm] = useState<TMap>(defaults)
  const [duration, setDuration] = useState(0)
  const { dopBalance, dopUsdAmount, poolUsdAmount, veDopBalance } = form
  const maxDopBalance = 50

  const loadInfo = () => {
    getVestings(library, dispatch)
  }

  useEffect(() => {
    if (library && state.account.address) {
      if (poolTimer) clearInterval(poolTimer)
      poolTimer = setInterval(loadInfo, FETCH_TIME * 1000)
      loadInfo()
    }
    return () => poolTimer && clearInterval(poolTimer)
  }, [library, state.account.address])

  const [lockTx, setLockTx] = useState('')

  const handleLock = (id) => {
    const { release } = library.methods.Vesting[id]
    release({ from: state.account.address })
      .send()
      .on('transactionHash', function (hash) {
        setLockTx(hash)
      })
      .on('receipt', function () {
        loadInfo()
      })
      .on('error', (err) => {
        console.log('claim', err)
        setLockTx('')
      })
  }

  const handleCalculation = () => {}

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
  }

  if (process.env.ENABLE_STAKING_GOVERNANCE === 'false') {
    return (
      <>
        <section className={styles.header}></section>
        <section className={`${styles.content} flex flex-start justify-center`}>
          <div className={`${styles.container} flex`}>
            <div className="full center">
              {process.env.ENABLE_STAKING_GOVERNANCE === 'false' ? 'Coming soon' : ''}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <section className={`flex-wrap justify-center ${styles.content}`}>
      <div className={`${styles.veDopContent}`}>
        <h3>Lock Dops for veDop </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <div className={`${styles.inputWrapper} flex-center`}>
              <input
                id="dopBalance"
                name="dopBalance"
                type="text"
                value={dopBalance}
                onChange={handleInput}
              />
              <div
                className={styles.maxBtn}
                onClick={() =>
                  setForm({
                    ...form,
                    dopBalance: maxDopBalance,
                  })
                }
              >
                MAX
              </div>
            </div>
            <label className="flex-center" htmlFor="dopBalance">
              <span>Balance: 0</span>
            </label>
          </div>
          <div
            className={`flex-center justify-between ${styles.lockPeriodOptions}`}
          >
            {lockPeriod.map((l, index) => (
              <div
                className={`flex ${styles.period} ${
                  duration === index ? styles.currentLockPeriod : ''
                }`}
                key={index}
              >
                <div
                  className={styles.circle}
                  onClick={() => setDuration(index)}
                />
                <div className={styles.duration}>
                  <p>{`${l.duration} ${l.unit}`}</p>
                  <p>1 Dop =</p>
                  <p>0.1 veDop</p>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => handleLock(0)}>Aprove and Create Lock</Button>
        </form>
        {lockTx && (
          <tr>
            <td colSpan={2} className="center">
              <a
                href={getEtherscan(lockTx, state.account.network)}
                target="_blank"
              >
                View on {scanLabels[state.account.network] || 'Etherscan'}
              </a>
            </td>
          </tr>
        )}
      </div>
      <div className={`${styles.veDopContent}`}>
        <h3>Dop Boost Calculator</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className="flex-center" htmlFor="dopUsdAmount">
              <span>Your balance ($):</span>
            </label>
            <div className={`${styles.inputWrapper} flex-center`}>
              <input
                id="dopUsdAmount"
                name="dopUsdAmount"
                type="text"
                value={dopUsdAmount}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className="flex-center" htmlFor="poolUsdAmount">
              <span>Pool balance ($):</span>
            </label>
            <div className={`${styles.inputWrapper} flex-center`}>
              <input
                id="poolUsdAmount"
                name="poolUsdAmount"
                type="text"
                value={poolUsdAmount}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className="flex-center" htmlFor="veDopBalance">
              <span>Your veDop:</span>
            </label>
            <div className={`${styles.inputWrapper} flex-center`}>
              <input
                id="veDopBalance"
                name="veDopBalance"
                type="text"
                value={veDopBalance}
                onChange={handleInput}
              />
            </div>
          </div>
          <Button onClick={() => handleCalculation()}>Calculate</Button>
        </form>
      </div>
    </section>
  )
}
