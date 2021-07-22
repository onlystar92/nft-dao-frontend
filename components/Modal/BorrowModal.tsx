import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { TMap } from 'types'
import Button from 'components/Button/Button'
import AssetInfo from 'components/AssetInfo/AssetInfo'
import TxLoader from 'components/TxLoader/TxLoader'
import { abbreviateNumberSI } from 'utils/number'
import Modal from './Modal'
import styles from './Modal.module.css'
import { toFixed } from 'utils/number'
import { ZERO } from 'utils/constants'

interface IBorrowModal {
  network?: number
  pending: boolean
  market: any
  balance: number
  walletBalance: string
  borrowLimit: number
  totalBorrow: number
  borrowLimitUsed: number
  borrowRatePerBlock: number
  allowed: boolean
  distributeApy: string
  disabled: string
  onSubmit: Function
  onClose: Function
  closeOnEscape?: boolean
}

const defaults = {
  borrowAmount: 0,
  repayAmount: 0,
}

const BORRW_MANTISSA = 1

export default function BorrowModal({
  pending,
  market,
  balance,
  walletBalance,
  borrowLimit,
  borrowLimitUsed,
  borrowRatePerBlock,
  totalBorrow,
  allowed,
  distributeApy,
  disabled,
  onSubmit,
  onClose,
  closeOnEscape,
}: IBorrowModal) {
  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365

  const [tab, setTab] = useState('borrow')
  const [form, setForm] = useState<TMap>(defaults)
  const { borrowAmount, repayAmount } = form
  const borrowed = (borrowLimit * (100 - borrowLimitUsed)) / 100
  const available = market
    ? new BigNumber(borrowed)
        .times(BORRW_MANTISSA)
        .isGreaterThan(new BigNumber(market.cash))
      ? new BigNumber(market.cash)
      : new BigNumber(borrowed)
          .times(BORRW_MANTISSA)
          .dp(market.underlyingDecimals, 1)
          .toString(10)
    : 0
  const handleInput = (e) => {
    let value = (e.target.value || '').replace(/[^.\d]/g, '')
    if (value.endsWith('.')) {
      value = value.replace(/\./g, '') + '.'
    } else {
      if (value) {
        value =
          Number(value) !== 0
            ? toFixed(value, market.underlyingDecimals, true)
            : value
      }
    }
    setForm({ ...form, [e.target.name]: value.toString() })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tab === 'borrow') {
      onSubmit({ amount: borrowAmount, type: tab })
    } else {
      onSubmit({
        amount:
          market.underlyingAddress === ZERO
            ? repayAmount
            : repayAmount === balance
            ? -1
            : repayAmount,
        type: tab,
      })
    }
  }

  useEffect(() => {
    if (tab !== 'borrow' || borrowAmount > 0) {
      setTab('borrow')
      setForm(defaults)
    }
  }, [market])

  return (
    <Modal
      show={!!market}
      onRequestClose={onClose}
      closeOnEscape={closeOnEscape}
      loading={pending}
    >
      {pending ? (
        <TxLoader hash={pending ? disabled : ''} />
      ) : (
        <>
          {market && (
            <div className={`flex-center ${styles.assetName}`}>
              <img
                src={`/assets/cryptologos/${market.underlyingSymbol
                  .split(' ')[0]
                  .toLowerCase()}.${
                  market.underlyingSymbol === 'DOP' ? 'png' : 'svg'
                }`}
                alt="asset"
              />
              <div className={`bold ${styles.name}`}>
                {market.underlyingName}
              </div>
            </div>
          )}
          <div className={styles.tabs}>
            <Button
              className={tab === 'borrow' ? styles.active : ''}
              onClick={() => tab !== 'borrow' && setTab('borrow')}
            >
              Borrow
            </Button>
            <Button
              className={tab === 'repay' ? styles.active : ''}
              onClick={() => tab !== 'repay' && setTab('repay')}
            >
              Repay
            </Button>
          </div>
          {market && (
            <form onSubmit={handleSubmit} className={styles.form}>
              {tab === 'borrow' && (
                <>
                  <div className={styles.field}>
                    <div className={`${styles.inputWrapper} flex-center`}>
                      <input
                        id="borrowAmount"
                        name="borrowAmount"
                        type="text"
                        value={borrowAmount}
                        onChange={handleInput}
                      />
                      <div
                        className={styles.safeMaxBtn}
                        onClick={() =>
                          setForm({
                            ...form,
                            borrowAmount: new BigNumber(available)
                              .times(0.8)
                              .toFixed(market.underlyingDecimals),
                          })
                        }
                      >
                        MAX SAFE
                      </div>
                    </div>
                    <label
                      className="flex-center justify-between"
                      htmlFor="supplyAmount"
                    >
                      <span>
                        $
                        {abbreviateNumberSI(
                          Number(available) * market.underlyingPriceUSD,
                          2,
                          2,
                          market.underlyingDecimals
                        )}
                      </span>
                      <span>
                        Available to borrow{' '}
                        <span
                          className="bold cursor"
                          onClick={() =>
                            setForm({
                              ...form,
                              borrowAmount: available,
                            })
                          }
                        >
                          {abbreviateNumberSI(
                            Number(available),
                            4,
                            4,
                            market.underlyingDecimals
                          )}
                        </span>{' '}
                        {market.underlyingSymbol}
                      </span>
                    </label>
                  </div>
                  <AssetInfo
                    infoType="borrow"
                    assetUrl={`/assets/cryptologos/${market.underlyingSymbol
                      .split(' ')[0]
                      .toLowerCase()}.${
                      market.underlyingSymbol === 'DOP' ? 'png' : 'svg'
                    }`}
                    apy={new BigNumber(borrowRatePerBlock * blocksPerDay + 1)
                      .pow(daysPerYear)
                      .minus(1)
                      .times(100)
                      .dp(2, 1)
                      .toString(10)}
                    borrowLimitUsed={borrowLimitUsed}
                    borrowBalance={totalBorrow}
                    distributeApy={distributeApy}
                  />
                  <div className="flex justify-end">
                    <Button
                      disabled={
                        disabled ||
                        +borrowAmount <= 0 ||
                        +borrowAmount > +available
                      }
                    >
                      Borrow
                    </Button>
                  </div>
                  {/* <div className={`${styles.balance} flex justify-between`}>
                    <span>Currently Borrowing</span>
                    <span>
                      {balance} {market.underlyingSymbol}
                    </span>
                  </div> */}
                </>
              )}
              {tab === 'repay' && (
                <>
                  {allowed ? (
                    <div className={styles.field}>
                      <div className={`${styles.inputWrapper} flex-center`}>
                        <input
                          id="repayAmount"
                          name="repayAmount"
                          type="text"
                          value={repayAmount}
                          onChange={handleInput}
                        />
                        <div
                          className={styles.maxBtn}
                          onClick={() =>
                            setForm({
                              ...form,
                              repayAmount: balance,
                            })
                          }
                        >
                          MAX
                        </div>
                      </div>
                      <label
                        className="flex-center justify-between"
                        htmlFor="repayAmount"
                      >
                        <span>
                          $
                          {abbreviateNumberSI(
                            Number(balance) * market.underlyingPriceUSD,
                            2,
                            2,
                            market.underlyingDecimals
                          )}
                        </span>
                        <span>
                          Available to repay{' '}
                          {abbreviateNumberSI(
                            Number(balance),
                            4,
                            4,
                            market.underlyingDecimals
                          )}{' '}
                          {market.underlyingSymbol}
                        </span>
                      </label>
                    </div>
                  ) : (
                    <p>
                      To Borrow or Repay {market.underlyingSymbol} to the Drops
                      Loans, you need to enable it first.
                    </p>
                  )}
                  <AssetInfo
                    infoType="borrow"
                    assetUrl={`/assets/cryptologos/${market.underlyingSymbol
                      .split(' ')[0]
                      .toLowerCase()}.${
                      market.underlyingSymbol === 'DOP' ? 'png' : 'svg'
                    }`}
                    isBorrowLimitInfo={allowed}
                    apy={new BigNumber(borrowRatePerBlock * blocksPerDay + 1)
                      .pow(daysPerYear)
                      .minus(1)
                      .times(100)
                      .dp(2, 1)
                      .toString(10)}
                    borrowLimitUsed={borrowLimitUsed}
                    borrowBalance={totalBorrow}
                    distributeApy={distributeApy}
                  />
                  <div className="flex justify-end">
                    <Button
                      disabled={
                        disabled ||
                        (allowed &&
                          (repayAmount <= 0 ||
                            +repayAmount > +balance ||
                            new BigNumber(repayAmount).isGreaterThan(
                              walletBalance
                            )))
                      }
                    >
                      {allowed ? 'Repay' : 'Enable'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        </>
      )}
    </Modal>
  )
}
