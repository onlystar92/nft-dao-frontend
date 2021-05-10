import React, { useState } from 'react'
import Gravatar from 'react-gravatar'
import { TMap } from 'types'
import styles from './Account.module.css'
import DopModal from 'components/Modal/DopModal'
import { accountBalance } from 'layout'

interface IAccount {
  library: any
  transactions: any
  requests: any
  loading: boolean
  account: TMap
  balance: string
  rewardBalance: string
  dopBalance: string
  dispatch: Function
  connectWallet: Function
}

export default function Account({
  dispatch,
  library,
  transactions,
  requests,
  loading = false,
  account,
  balance,
  rewardBalance,
  dopBalance,
  connectWallet,
}: IAccount) {
  const [isClicked, setIsClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dopMarket =
    library &&
    library.markets &&
    library.markets.find((m) => m.underlyingSymbol === 'DOP')

  const transactionMap = transactions.reduce(
    ([claim], [hash, type, ...args]) => {
      const transaction = {
        claim: {},
      }
      switch (type) {
        case 'claim':
          transaction.claim[args[0]] = hash
          break
        default:
          break
      }
      return [{ ...claim, ...transaction.claim }]
    },
    new Array(1).fill({})
  )

  const handleTransaction = (type, ...args) => (
    transaction,
    callback = () => {}
  ) => {
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
        accountBalance(library, dispatch)
      })
      .on('error', (err, receipt) => {
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

  const handleClaimDop = () => {
    const from = { from: account.address }
    const transaction = library.methods.Comptroller.claimComp(
      account.address,
      from
    )
    handleTransaction('claim', 'claim')(transaction.send())
  }

  return (
    <div className={styles.account}>
      {!account.address ? (
        <div
          className="cursor"
          onClick={() => {
            setIsClicked(true)
            connectWallet(true)
          }}
        >
          {isClicked ? 'No account' : 'Connect wallet'}
        </div>
      ) : (
        <div className={styles.info}>
          {!loading && (
            <div className="flex-center cursor" onClick={() => setIsOpen(true)}>
              <Gravatar
                email={`user.${account.address.substr(
                  0,
                  4
                )}.${account.address.substr(-4, 4)}@crypto.com`}
                onClick={(e) => {
                  e.stopPropagation()
                  connectWallet(true)
                }}
              />
              <p className="border-right">
                <span>ETH</span>
                <br />
                {Number(balance).toFixed(4)}
              </p>
              <p>
                <span>DOP</span>
                <br />
                {Number(dopBalance || 0).toFixed(0)}
              </p>
            </div>
          )}
        </div>
      )}
      <DopModal
        isOpen={isOpen}
        pending={isOpen && !!requests.claim}
        balance={Number(dopBalance)}
        rewardBalance={Number(rewardBalance)}
        price={dopMarket ? dopMarket.underlyingPriceUSD : 0}
        disabled={isOpen && transactionMap[0].claim}
        onSubmit={handleClaimDop}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}
