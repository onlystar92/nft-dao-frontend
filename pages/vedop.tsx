import { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import { getVeDOPInfo } from 'utils/library'
import Button from 'components/Button/Button'
import VeDOPForm from 'components/VeDOP/VeDOPForm'
import useTicker from 'hooks/useTicker'
import styles from 'styles/VeDop.module.css'
import Modal from '../components/Mailchimp/ui/Modal/Modal';
import MailchimpForm from "../components/Mailchimp/MailchimpForm/MailchimpForm";

const FETCH_TIME = 15
let timer = null

export default function vedop(props) {
  const { state, dispatch, library } = props
  const { transactions, requests, veDOPInfo } = state
  const account = library ? library.wallet.address : ''

  const [isOpen, setIsOpen] = useState(false)
  const network = library ? library.wallet.network : ''
  const assetInfo = { symbol: 'veDOP' }

  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : library.web3.utils.toWei(value)

  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)

  const loadInfo = () => {
    getVeDOPInfo(library, dispatch)
  }

  useEffect(() => {
    if (library && state.account.address) {
      if (timer) clearInterval(timer)
      timer = setInterval(loadInfo, FETCH_TIME * 1000)
      loadInfo()
    }
    return () => timer && clearInterval(timer)
  }, [library, state.account.address])

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
        const endDate = (
          +veDOPInfo.lockTime ? moment(+veDOPInfo.lockTime * 1000) : moment()
        ).add(form.lockDate, 'weeks')

        if (!veDOPInfo.veDOPBalance) {
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
        } else if (form.actionType === 'INCREASE_LOCK_BALANCE') {
          const transaction = methods.increase_amount(toWei(`${form.amount}`), {
            from: account,
          })
          handleTransaction('lock', assetInfo.symbol)(
            transaction.send(),
            () => {}
          )
        } else if (form.actionType === 'INCREASE_LOCK_TIME') {
          const transaction = methods.increase_unlock_time(endDate.unix(), {
            from: account,
          })
          handleTransaction('lock', assetInfo.symbol)(
            transaction.send(),
            () => {}
          )
        }
      }
    } else if (form.type === 'vote') {
      const methods = library.methods.Guage
      const voteAddresses = []
      const voteWeights = []
      form.selectedVaults.map((vault) => {
        voteAddresses.push(vault.lpToken)
        voteWeights.push(vault.percent)
      })
      const transaction = methods.vote(voteAddresses, voteWeights, {
        from: account,
      })
      handleTransaction('lock', assetInfo.symbol)(transaction.send(), () => {})
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
                  <div className={styles.label}>veDOP balance</div>
                  <div className={styles.value}>
                    {new BigNumber(fromWei(veDOPInfo.veDOPBalance || '0'))
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>Locked</div>
                  <div className={styles.value}>
                    {new BigNumber(fromWei(veDOPInfo.lockedDOP || '0'))
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>Total DOP locked balance</div>
                  <div className={styles.value}>
                    {new BigNumber(fromWei(veDOPInfo.totalLockedDOP || '0'))
                      .dp(2, 1)
                      .toString(10)}
                  </div>
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
              veDOPBalance={veDOPInfo.veDOPBalance || 0}
              lockTime={+veDOPInfo.lockTime}
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
      <Modal><MailchimpForm /></Modal>
    </>
  )
}
