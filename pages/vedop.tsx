import { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import Button from 'components/Button/Button'
import VeDOPForm from 'components/VeDOP/VeDOPForm'
import styles from 'styles/VeDop.module.css'

export default function vedop(props) {
  const { state, dispatch, library } = props
  const { transactions, requests } = state
  const account = library ? library.wallet.address : ''

  const [isOpen, setIsOpen] = useState(false)
  const network = library ? library.wallet.network : ''
  const assetInfo = { symbol: 'veDOP' }

  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : library.web3.utils.toWei(value)

  const transactionMap = transactions.reduce(
    ([locks], [hash, type, ...args]) => {
      const transaction = {
        locks: {},
      }
      switch (type) {
        case 'lock':
          transaction.locks[args[0]] = hash
          break
        default:
          break
      }
      return [{ ...locks, ...transaction.locks }]
    },
    new Array(4).fill({})
  )

  const handleTransaction =
    (type, ...args) =>
    (transaction, callback = () => {}) => {
      dispatch({
        type: 'txRequest',
        payload: [type, true, ...args],
      })
      transaction
        .on('transactionHash', function (hash) {
          dispatch({
            type: 'txHash',
            payload: [hash, false, type, ...args],
          })
        })
        .on('receipt', function (receipt) {
          dispatch({
            type: 'txHash',
            payload: [receipt.transactionHash, true, type, callback()],
          })
        })
        .on('error', (err, receipt) => {
          if (err && err.message) {
            console.log(err.message)
          }
          if (receipt) {
            dispatch({
              type: 'txHash',
              payload: [receipt.transactionHash, true, type],
            })
          } else {
            dispatch({
              type: 'txRequest',
              payload: [type, false, ...args],
            })
          }
        })
    }

  const handleVeDOP = (form) => {
    console.log('form', form)
    if (!library) return null

    if (form.type === 'lock') {
      if (Number(state.dopAllowance) <= 0) {
        // Approve
        const methods = library.methods.Comp
        const amount = 10 ** 10
        handleTransaction('lock', assetInfo.symbol)(
          methods
            .approve(
              library.addresses.VeDOP,
              library.web3.utils.toWei(amount.toString()),
              { from: account }
            )
            .send(),
          () => {}
        )
      } else {
        const methods = library.methods.VeDOP
        const endDate = moment().add(form.lockDate, 'weeks')
        const transaction = methods.create_lock(
          toWei(`${form.amount}`),
          endDate.unix(),
          {
            from: account,
          }
        )
        handleTransaction('lock', assetInfo.symbol)(
          transaction.send(),
          () => {}
        )
      }
    }
  }

  if (process.env.ENABLE_STAKING_GOVERNANCE === 'false') {
    return (
      <>
        <section className={styles.header}></section>
        <section className={`${styles.content} flex flex-start justify-center`}>
          <div className={`${styles.container} limited flex`}>
            <div className="full">Coming soon</div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className={styles.header}>
        <div className={`limited flex-center justify-between`}>
          <Link href="/staking">
            <img className="cursor" src="/left-arrow.svg" alt="arrow" />
          </Link>
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex`}>
          <div className={styles.assetInfo}>
            <div className={`flex-center ${styles.assetTitle}`}>
              <div className={styles.assetName}>veDOP info</div>
            </div>
            <div className={styles.infoDetail}>
              <div className="flex">
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>DOP balance</div>
                  <div className={styles.value}>
                    {new BigNumber(state.dopBalance || 0).dp(2, 1).toString(10)}
                  </div>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>Locked</div>
                  <div className={styles.value}>0</div>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>Total DOP locked balance</div>
                  <div className={styles.value}>0</div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.veDOPForm} ${isOpen ? styles.veDOPModal : ''}`}
            onMouseDown={() => setIsOpen(false)}
          >
            <VeDOPForm
              market={assetInfo}
              vaults={library ? library.addresses.Pools : []}
              network={network}
              dopBalance={state.dopBalance}
              allowed={Number(state.dopAllowance) > 0}
              pending={assetInfo && requests.lock === assetInfo.symbol}
              disabled={assetInfo && transactionMap[0][assetInfo.symbol]}
              onSubmit={handleVeDOP}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      </section>
      <section className={`flex-center justify-between ${styles.veDOPManage}`}>
        <div>Approve & Lock DOP</div>
        <Button
          className="flex-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          Approve & Lock DOP
        </Button>
      </section>
    </>
  )
}
