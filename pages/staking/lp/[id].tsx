import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js'
import Button from 'components/Button/Button'
import StakingForm from 'components/Staking/StakingForm'
import styles from './LpStaking.module.css'
import { getPools } from 'utils/library'

const FETCH_TIME = 15
let poolTimer = null

export default function LpStaking(props) {
  const { state, dispatch, library } = props

  const { transactions, requests, pools } = state

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const blocksPerDay = 4 * 60 * 24

  const account = library ? library.wallet.address : ''
  const network = library ? library.wallet.network : ''

  const loadPools = () => {
    getPools(library, dispatch)
  }

  useEffect(() => {
    if (library && state.account.address) {
      if (poolTimer) clearInterval(poolTimer)
      poolTimer = setInterval(loadPools, FETCH_TIME * 1000)
      loadPools()
    }
    return () => poolTimer && clearInterval(poolTimer)
  }, [library, state.account.address])

  const transactionMap = transactions.reduce(
    ([stakes], [hash, type, ...args]) => {
      const transaction = {
        stakes: {},
      }
      switch (type) {
        case 'stake':
          transaction.stakes[args[0]] = hash
          break
        default:
          break
      }
      return [{ ...stakes, ...transaction.stakes }]
    },
    new Array(4).fill({})
  )

  const assetInfo = pools.find((p) => p.id == router.query.id)
  if (!assetInfo) return null

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
          getPools(library, dispatch)
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

  const handleStaking = (form) => {
    if (!library) return null
    const { LpToken } = library.methods
    if (Number(assetInfo.allowance) <= 0) {
      // Approve
      const methods = LpToken(library.LPTokenContract(assetInfo.lpToken))
      const amount = 10 ** 18
      handleTransaction('stake', assetInfo.symbol)(
        methods
          .approve(
            library.addresses.MasterChef,
            library.web3.utils.toWei(amount.toString()),
            { from: account }
          )
          .send(),
        () =>
          dispatch({
            type: 'poolAllowance',
            payload: { id: assetInfo.id, allowance: amount },
          })
      )
    } else {
      const { amount, type } = form
      const { deposit, withdraw } = library.methods.MasterChef

      if (type === 'stake') {
        const transaction = deposit(
          assetInfo.id,
          library.web3.utils.toWei(amount),
          { from: account }
        )
        handleTransaction('stake', assetInfo.symbol)(transaction.send(), () => {
          // setIsOpen(false)
        })
      } else if (type === 'claim') {
        const transaction = deposit(assetInfo.id, '0', { from: account })
        handleTransaction('stake', assetInfo.symbol)(transaction.send(), () => {
          // setIsOpen(false)
        })
      } else {
        const transaction = withdraw(
          assetInfo.id,
          library.web3.utils.toWei(amount),
          { from: account }
        )
        handleTransaction('stake', assetInfo.symbol)(transaction.send(), () => {
          // setIsOpen(false)
        })
      }
    }
  }

  return (
    <>
      <section className={styles.header}>
        <div className={`limited flex-center justify-between`}>
          <Link href="/staking">
            <img className="cursor" src="/left-arrow.svg" alt="arrow" />
          </Link>
          <a
            href={`https://app.uniswap.org/#/add/v2/${library.addresses.Comp}/ETH`}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={`flex-center bold ${styles.lpLinkBtn} ${styles.mobileLpLinkBtn}`}
            >
              Get Lp <img src="/link.svg" />
            </Button>
          </a>
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex`}>
          <div className={styles.assetInfo}>
            <div className={`flex-center ${styles.assetTitle}`}>
              <div className={`flex-center ${styles.assetIcon}`}>
                {assetInfo.firstAsset && (
                  <img
                    src={assetInfo.firstAsset}
                    className={`${styles.logo} ${styles.firstAsset}`}
                  />
                )}
                {assetInfo.secondAsset && (
                  <img
                    src={assetInfo.secondAsset}
                    className={`${styles.logo} ${styles.secondAsset}`}
                  />
                )}
              </div>
              <div className={styles.assetName}>{assetInfo.label}</div>
              <a
                href={`https://app.uniswap.org/#/add/v2/${library.addresses.Comp}/ETH`}
                target="_blank"
                rel="noreferrer"
              >
                <Button className={`flex-center bold ${styles.lpLinkBtn}`}>
                  Get Lp <img src="/link.svg" />
                </Button>
              </a>
            </div>
            <div className={styles.infoDetail}>
              <div className="flex-center">
                <div className={styles.infoWrapper}>
                  <div className={styles.label}>DOP/DAY</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.dopPerBlock)
                      .times(blocksPerDay)
                      .toFixed(2)}
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <div className={styles.label}>Total staked</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.totalLpSupply).toString(10)}
                  </div>
                </div>
              </div>
              <div className={styles.divider} />
              <div className="flex-center">
                <div className={styles.infoWrapper}>
                  <div className={styles.label}>My Stake</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.amount)
                      .div(1e18)
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <div className={styles.label}>My DOP/DAY</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.totalLpSupply).isZero()
                      ? '0'
                      : new BigNumber(assetInfo.amount)
                          .div(1e18)
                          .div(assetInfo.totalLpSupply)
                          .times(
                            new BigNumber(assetInfo.dopPerBlock).times(
                              blocksPerDay
                            )
                          )
                          .toFixed(2)}
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <div className={styles.label}>Claimable DOP</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.pendingDop)
                      .div(1e18)
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.stakingForm} ${
              isOpen ? styles.stakingModal : ''
            }`}
            onMouseDown={() => setIsOpen(false)}
          >
            <StakingForm
              market={assetInfo}
              network={network}
              allowed={Number(assetInfo.allowance) > 0}
              pending={assetInfo && requests.stake === assetInfo.symbol}
              disabled={assetInfo && transactionMap[0][assetInfo.symbol]}
              onSubmit={handleStaking}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      </section>
      <section
        className={`flex-center justify-between ${styles.stakingManage}`}
      >
        <div>Staking</div>
        <Button
          className="flex-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          Manage
        </Button>
      </section>
    </>
  )
}
