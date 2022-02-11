import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js'
import Button from 'components/Button/Button'
import StakingForm from 'components/Staking/StakingForm'
import styles from './LpStaking.module.css'
import { getPools } from 'utils/library'
import { abbreviateNumberSI } from 'utils/number'
import Modal from '../../../components/Mailchimp/ui/Modal/Modal';
import MailchimpForm from "../../../components/Mailchimp/MailchimpForm/MailchimpForm";

const FETCH_TIME = 15
let poolTimer = null

export default function LpStaking(props) {
  const { state, dispatch, theme, library } = props

  const { transactions, requests, pools } = state

  const [isOpen, setIsOpen] = useState(false)

  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : library.web3.utils.toWei(value)
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)

  const router = useRouter()
  const blocksPerDay = 4 * 60 * 24

  const account = library ? library.wallet.address : ''
  const network = library ? library.wallet.network : ''

  const loadPools = () => {
    getPools(library, dispatch, state.dopPrice)
  }

  useEffect(() => {
    if (library && state.account.address && state.dopPrice) {
      if (poolTimer) clearInterval(poolTimer)
      poolTimer = setInterval(loadPools, FETCH_TIME * 1000)
      loadPools()
    }
    return () => poolTimer && clearInterval(poolTimer)
  }, [library, state.account.address, state.dopPrice])

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
  if (!assetInfo) return <div />

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
        getPools(library, dispatch, state.dopPrice)
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
          toWei(amount, Number(assetInfo.decimals)),
          { from: account }
        )
        handleTransaction('stake', assetInfo.symbol)(
          transaction.send(),
          () => {}
        )
      } else if (type === 'claim') {
        const transaction = deposit(assetInfo.id, '0', { from: account })
        handleTransaction('stake', assetInfo.symbol)(
          transaction.send(),
          () => {}
        )
      } else {
        const transaction = withdraw(
          assetInfo.id,
          toWei(amount, Number(assetInfo.decimals)),
          { from: account }
        )
        handleTransaction('stake', assetInfo.symbol)(
          transaction.send(),
          () => {}
        )
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
            href={
              assetInfo.type === 'LP'
                ? `https://app.uniswap.org/#/add/v2/${library.addresses.Comp}/ETH`
                : `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${assetInfo.lpToken}&use=V2&exactAmount=1`
            }
            target="_blank"
            rel="noreferrer"
          >
            <Button
              className={`flex-center bold ${styles.lpLinkBtn} ${styles.mobileLpLinkBtn}`}
            >
              Get {assetInfo.type === 'LP' ? 'LP' : assetInfo.symbol}{' '}
              <img src="/link.svg" />
            </Button>
          </a>
        </div>
      </section>
      <section className={`${styles.content} ${theme === 'dark' ? styles.darkContent : ''} flex flex-start justify-center`}>
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
                href={
                  assetInfo.type === 'LP'
                    ? `https://app.uniswap.org/#/add/v2/${library.addresses.Comp}/ETH`
                    : `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${assetInfo.lpToken}&use=V2&exactAmount=1`
                }
                target="_blank"
                rel="noreferrer"
              >
                <Button className={`flex-center bold ${styles.lpLinkBtn}`}>
                  Get {assetInfo.type === 'LP' ? 'LP' : assetInfo.symbol}{' '}
                  <img src="/link.svg" />
                </Button>
              </a>
            </div>
            <div className={styles.infoDetail}>
              <div className="flex">
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>DOP/DAY</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.dopPerBlock)
                      .times(blocksPerDay)
                      .times(
                        new BigNumber(assetInfo.allocPoint).div(
                          assetInfo.totalAllocPt
                        )
                      )
                      .toFixed(2)}
                  </div>
                  <span className={styles.usdPrice}>
                    $
                    {abbreviateNumberSI(
                      new BigNumber(assetInfo.dopPerBlock)
                        .times(blocksPerDay)
                        .times(
                          new BigNumber(assetInfo.allocPoint).div(
                            assetInfo.totalAllocPt
                          )
                        )
                        .times(state.dopPrice || 0)
                        .toString(10),
                      2,
                      2
                    )}
                  </span>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>APY</div>
                  <div className={styles.value}>{assetInfo.apy || 0}%</div>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>Total staked</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.totalLpSupply)
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                  <span className={styles.usdPrice}>
                    $
                    {abbreviateNumberSI(
                      new BigNumber(assetInfo.totalLpSupply)
                        .times(assetInfo.lpPrice || 0)
                        .toString(10),
                      2,
                      2
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.divider} />
              <div className="flex">
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>My Stake</div>
                  <div className={styles.value}>
                    {new BigNumber(
                      fromWei(assetInfo.amount, assetInfo.decimals)
                    )
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                  <span className={styles.usdPrice}>
                    $
                    {abbreviateNumberSI(
                      new BigNumber(
                        fromWei(assetInfo.amount, assetInfo.decimals)
                      )
                        .times(assetInfo.lpPrice || 0)
                        .toString(10),
                      2,
                      2
                    )}
                  </span>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
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
                          .times(
                            new BigNumber(assetInfo.allocPoint).div(
                              assetInfo.totalAllocPt
                            )
                          )
                          .toFixed(2)}
                  </div>
                  <span className={styles.usdPrice}>
                    $
                    {new BigNumber(assetInfo.totalLpSupply).isZero()
                      ? '0'
                      : abbreviateNumberSI(
                          new BigNumber(assetInfo.amount)
                            .div(1e18)
                            .div(assetInfo.totalLpSupply)
                            .times(
                              new BigNumber(assetInfo.dopPerBlock).times(
                                blocksPerDay
                              )
                            )
                            .times(
                              new BigNumber(assetInfo.allocPoint).div(
                                assetInfo.totalAllocPt
                              )
                            )
                            .times(state.dopPrice || 0)
                            .toString(10),
                          2,
                          2
                        )}
                  </span>
                </div>
                <div className={`flex-column ${styles.infoWrapper}`}>
                  <div className={styles.label}>Claimable DOP</div>
                  <div className={styles.value}>
                    {new BigNumber(assetInfo.pendingDop)
                      .div(1e18)
                      .dp(2, 1)
                      .toString(10)}
                  </div>
                  <span className={styles.usdPrice}>
                    $
                    {abbreviateNumberSI(
                      new BigNumber(assetInfo.pendingDop)
                        .div(1e18)
                        .times(state.dopPrice || 0)
                        .toString(10),
                      2,
                      2
                    )}
                  </span>
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
              theme={theme}
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
      <Modal><MailchimpForm /></Modal>
    </>
  )
}
