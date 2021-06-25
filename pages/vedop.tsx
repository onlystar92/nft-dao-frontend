import { useState } from 'react'
import { TMap } from 'types'
import moment from 'moment'
import Button from 'components/Button/Button'
import { scanLabels } from 'components/TxLoader/TxLoader'
import { getEtherscan } from 'utils/links'
import styles from 'styles/VeDop.module.css'
import BigNumber from 'bignumber.js'
import { toFixed } from 'utils/number'

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
  const [lockTx, setLockTx] = useState('')
  const { dopBalance, dopUsdAmount, poolUsdAmount, veDopBalance } = form
  const maxDopBalance = state.dopBalance || 0
  const dopAllowance = state.dopAllowance || 0
  const account = library ? library.wallet.address : ''

  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : library.web3.utils.toWei(value)
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)

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
    if (!library) return null
    if (Number(dopAllowance) <= 0) {
      // Approve
      const methods = library.methods.Comp
      const amount = 10 ** 10
      methods
        .approve(
          library.addresses.VeDOP,
          library.web3.utils.toWei(amount.toString()),
          { from: account }
        )
        .send()
        .on('transactionHash', function (hash) {
          setLockTx(hash)
        })
        .on('receipt', function () {
          setLockTx('')
        })
        .on('error', (err) => {
          setLockTx('')
        })
    } else {
      const methods = library.methods.VeDOP
      let endDate
      if (duration === 0) {
        endDate = moment().add(4, 'weeks')
      } else if (duration === 1) {
        endDate = moment().add(52, 'weeks')
      } else if (duration === 2) {
        endDate = moment().add(104, 'weeks')
      } else {
        endDate = moment().add(208, 'weeks')
      }
      methods
        .create_lock(toWei(`${dopBalance}`), endDate.unix(), {
          from: account,
        })
        .send()
        .on('transactionHash', function (hash) {
          setLockTx(hash)
        })
        .on('receipt', function () {
          setLockTx('')
          setForm({
            ...form,
            dopBalance: 0,
          })
        })
        .on('error', (err) => {
          setLockTx('')
          setForm({
            ...form,
            dopBalance: 0,
          })
        })
    }
  }

  if (process.env.ENABLE_STAKING_GOVERNANCE === 'false') {
    return (
      <>
        <section className={styles.header}></section>
        <section className={`${styles.content} flex flex-start justify-center`}>
          <div className={`${styles.container} flex`}>
            <div className="full center">
              {process.env.ENABLE_STAKING_GOVERNANCE === 'false'
                ? 'Coming soon'
                : ''}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <section className={`flex-wrap justify-center ${styles.content}`}>
      <div className={`${styles.veDopContent}`}>
        <h3>Lock Dops for veDOP </h3>
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
              <span>Balance: {state.dopBalance || 0}</span>
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
                  <p>0.1 veDOP</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            disabled={
              lockTx ||
              (dopAllowance && (dopBalance <= 0 || dopBalance > maxDopBalance))
            }
          >
            {dopAllowance ? 'Create Lock' : 'Enable'}
          </Button>
        </form>
        {lockTx && (
          <a
            className={styles.txScan}
            href={getEtherscan(lockTx, state.account.network)}
            target="_blank"
          >
            View on {scanLabels[state.account.network] || 'Etherscan'}
          </a>
        )}
      </div>
      <div className={`${styles.veDopContent} ${styles.boostContent}`}>
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
              <span>Your veDOP:</span>
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
