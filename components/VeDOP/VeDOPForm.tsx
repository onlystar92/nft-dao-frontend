import { useEffect, useState } from 'react'
import { TMap } from 'types'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import Multiselect from 'multiselect-react-dropdown'
import Button from 'components/Button/Button'
import RcSlider from 'components/RcSlider/RcSlider'
import TxLoader from 'components/TxLoader/TxLoader'
import styles from './VeDOPForm.module.css'
import { toFixed } from 'utils/number'

interface IVeDOPForm {
  network: number
  pending: boolean
  market: any
  vaults: any
  dopBalance: number
  veDOPBalance: number
  lockTime: number
  disabled: string
  allowed: boolean
  onSubmit: Function
  onClose?: Function
}

const defaults = {
  dopAmount: 0,
  lockDate: 4,
}

const lockPeriod = [
  { duration: 4, unit: 'month' },
  { duration: 52, unit: 'year' },
  { duration: 104, unit: 'years' },
  { duration: 208, unit: 'years' },
]

let actionType = ''

export default function VeDOPForm({
  network,
  pending,
  market,
  vaults,
  dopBalance,
  veDOPBalance,
  lockTime,
  disabled,
  allowed,
  onSubmit,
  onClose,
}: IVeDOPForm) {
  const [tab, setTab] = useState('lock')
  const [form, setForm] = useState<TMap>(defaults)
  const [duration, setDuration] = useState(lockPeriod[0].duration)
  const [selectedVaults, setSelectedVaults] = useState([])
  const [votesLeft, setVotesLeft] = useState(100)
  const { dopAmount, lockDate } = form
  const maxDopBalance = dopBalance

  useEffect(() => {
    setForm({
      ...form,
      lockDate: duration,
    })
  }, [duration])

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
    if (tab === 'lock') {
      onSubmit({ amount: dopAmount, lockDate, type: tab, actionType })
    } else if (tab === 'vote') {
      onSubmit({ selectedVaults, type: tab })
    } else if (tab === 'claim') {
      onSubmit({ amount: (market.pendingDop || 0).toString(10), type: tab })
    }
  }

  useEffect(() => {
    setForm(defaults)
  }, [tab])

  useEffect(() => {
    let totalVotes = 0
    selectedVaults.map((vault) => {
      totalVotes += vault.percent || 0
    })
    setVotesLeft(100 - totalVotes)
  }, [selectedVaults])

  const onSelectVaults = (selectedList) => {
    setSelectedVaults([...selectedList])
  }

  const onRemoveVault = (selectedList) => {
    setSelectedVaults([...selectedList])
  }

  const handleChangePercent = (idx, value) => {
    selectedVaults[idx].percent = value
    setSelectedVaults(JSON.parse(JSON.stringify(selectedVaults)))
  }

  return (
    <div className={styles.veDOPForm} onMouseDown={(e) => e.stopPropagation()}>
      {pending ? (
        <TxLoader hash={pending ? disabled : ''} network={network} />
      ) : (
        <>
          <img
            className={`cursor ${styles.closeBtn}`}
            src="/assets/close.svg"
            alt="close"
            onClick={() => onClose()}
          />
          <div className={styles.tabs}>
            <Button
              className={tab === 'lock' ? styles.active : ''}
              onClick={() => tab !== 'lock' && setTab('lock')}
            >
              Lock
            </Button>

            <Button
              className={tab === 'vote' ? styles.active : ''}
              onClick={() => tab !== 'vote' && setTab('vote')}
            >
              Vote
            </Button>
            <Button
              className={tab === 'claim' ? styles.active : ''}
              onClick={() => tab !== 'claim' && setTab('claim')}
            >
              Claim
            </Button>
          </div>
          {market && (
            <form onSubmit={handleSubmit} className={styles.form}>
              {tab === 'lock' && (
                <>
                  <div className={styles.field}>
                    <div className={`${styles.inputWrapper} flex-center`}>
                      <input
                        id="dopAmount"
                        name="dopAmount"
                        type="text"
                        value={dopAmount}
                        onChange={handleInput}
                      />
                      <div
                        className={styles.maxBtn}
                        onClick={() =>
                          setForm({
                            ...form,
                            dopAmount: maxDopBalance,
                          })
                        }
                      >
                        MAX
                      </div>
                    </div>
                    <label className="flex-center" htmlFor="dopBalance">
                      <span>
                        Balance:{' '}
                        {new BigNumber(dopBalance || 0).dp(2, 1).toString(10)}
                      </span>
                    </label>
                  </div>
                  {!new BigNumber(veDOPBalance || 0).isZero() && (
                    <Button
                      className={styles.increaseBtn}
                      onClick={() => {
                        actionType = 'INCREASE_LOCK_BALANCE'
                      }}
                      disabled={
                        allowed && (dopAmount <= 0 || dopAmount > maxDopBalance)
                      }
                    >
                      Increase Lock Balance
                    </Button>
                  )}
                  <div
                    className={`flex-center justify-between ${styles.lockDate}`}
                  >
                    <span>Lock until</span>
                    <input
                      type="date"
                      id="lockDate"
                      name="lockDate"
                      value={(lockTime ? moment(lockTime * 1000) : moment())
                        .add(lockDate, 'weeks')
                        .format('YYYY-MM-DD')}
                      onChange={(e) => {
                        const diff = Math.ceil(
                          moment(e.target.value).diff(
                            lockTime ? moment(lockTime * 1000) : moment(),
                            'seconds'
                          ) /
                            (7 * 24 * 60 * 60)
                        )
                        if (diff > 0) {
                          setForm({
                            ...form,
                            lockDate: diff,
                          })
                        }
                      }}
                    />
                  </div>
                  <div
                    className={`flex-center justify-between ${styles.lockPeriodOptions}`}
                  >
                    {lockPeriod.map((l, index) => (
                      <div
                        className={`flex-all center cursor ${styles.period} ${
                          duration === l.duration
                            ? styles.currentLockPeriod
                            : ''
                        }`}
                        key={index}
                        onClick={() => setDuration(l.duration)}
                      >
                        {`${l.duration / (l.unit === 'month' ? 4 : 52)} ${
                          l.unit
                        }`}
                      </div>
                    ))}
                  </div>
                  {/* <div
                    className={`flex-center justify-between ${styles.receiveVeDOP}`}
                  >
                    <span>You will receive</span>
                    <span>10 veDOP</span>
                  </div> */}
                  {new BigNumber(veDOPBalance || 0).isZero() ? (
                    <Button
                      onClick={() => {
                        actionType = 'LOCK_BALANCE'
                      }}
                      disabled={
                        allowed && (dopAmount <= 0 || dopAmount > maxDopBalance)
                      }
                    >
                      {allowed ? 'Create Lock' : 'Enable'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        actionType = 'INCREASE_LOCK_TIME'
                      }}
                      // disabled={}
                    >
                      Increase Lock Time
                    </Button>
                  )}
                </>
              )}
              {tab === 'claim' && (
                <>
                  <div className={`flex-column justify-center ${styles.field}`}>
                    <div className={`center ${styles.claimLabel}`}>
                      Claimable DOP
                    </div>
                    <div className={`center bold ${styles.claimValue}`}>
                      {new BigNumber(market.pendingDop || 0)
                        .div(1e18)
                        .dp(2, 1)
                        .toString(10)}
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      className="flex-center justify-center"
                      disabled={disabled}
                    >
                      Claim
                    </Button>
                  </div>
                </>
              )}
              {tab === 'vote' && (
                <>
                  <div className={styles.field}>
                    <div className={styles.vaultOptions}>
                      <Multiselect
                        placeholder="Select vault"
                        showArrow
                        onSelect={onSelectVaults}
                        onRemove={onRemoveVault}
                        options={vaults}
                        displayValue="label"
                      />
                    </div>
                    {selectedVaults.length !== 0 && (
                      <div className={styles.vaultList}>
                        {selectedVaults.map((vault, idx) => (
                          <div
                            className={`flex-center justify-between ${styles.vaultItem}`}
                            key={vault.symbol}
                          >
                            <span>{vault.label}</span>
                            <div className={styles.sliderWrapper}>
                              <RcSlider
                                value={vault.percent || 0}
                                onChange={(v) => handleChangePercent(idx, v)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div
                      className={`flex-center justify-between ${styles.votesLeft}`}
                    >
                      <span>Votes left</span>
                      <span>{votesLeft}%</span>
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      disabled={
                        disabled ||
                        votesLeft !== 0 ||
                        new BigNumber(veDOPBalance || 0).isZero()
                      }
                    >
                      Vote
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
