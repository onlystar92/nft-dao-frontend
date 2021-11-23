import React, { useReducer, useState } from 'react'
import BigNumber from 'bignumber.js'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Collapse } from 'react-collapse'
import useWallet from 'hooks/useWallet'
import Account from 'components/Account/Account'
import { toNumber } from 'utils/common'
import { addresses, ZERO } from 'utils/constants'
import { reducer, initState } from './store'
import styles from './Layout.module.css'
import { getMarkets } from 'pages/_app'
import { getTokenPriceUSD } from 'utils/uniswap'
import SubscribeButton from 'components/Mailchimp/ui/SubscribeButton/SubscribeButton'

const FETCH_TIME = 15
let balanceTimer = null

const networkLabels = {
  1: 'Ethereum Network',
  4: 'Rinkeby Testnet',
  3: 'Ropsten Testnet',
  5: 'Goreli Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Network',
  97: 'Binance Testnet',
}

export function accountBalance(library, dispatch) {
  if (!library || !library.initiated) return
  const account = library.wallet.address
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)
  if (!addresses[library.wallet.network]) {
    return
  }
  Promise.all([
    getTokenPriceUSD(addresses[1].Comp),
    library.methods.Comptroller.getAssetsIn(account),
    library.web3.eth.getBalance(account),
    library.methods.Comp.balanceOf(account),
    library.methods.Comp.getAllowance(account, library.addresses.VeDOP),
    library.contracts.CompoundLens.methods
      .getCompBalanceMetadataExt(
        library.addresses.Comp,
        library.addresses.Unitroller,
        account
      )
      .call(),
    Promise.all(
      library.markets.map((market) => {
        const { underlyingAddress: address } = market
        const marketMethods = library.methods.Market(library.Market(market))
        const dTokenMethods = library.methods.DToken(library.DToken(market))

        return marketMethods && dTokenMethods
          ? Promise.all([
              address !== ZERO
                ? marketMethods.getBalance(account)
                : Promise.resolve('0'),
              address !== ZERO
                ? marketMethods.getAllowance(
                    account,
                    library.web3.utils.toChecksumAddress(market.id)
                  )
                : Promise.resolve(0),
              dTokenMethods.balanceOfUnderlying(account),
              dTokenMethods.borrowBalanceCurrent(account),
              dTokenMethods.supplyRatePerBlock(),
              dTokenMethods.borrowRatePerBlock(),
              library.methods.Comptroller.compSpeeds(
                library.web3.utils.toChecksumAddress(market.id)
              ),
              Number(market.exchangeRate),
              Number(market.totalSupply),
              dTokenMethods.totalBorrows(),
            ])
          : Promise.resolve([
              ...new Array(7).fill(['0']),
              Number(market.exchangeRate),
              Number(market.totalSupply),
              Number(market.totalBorrows),
            ])
      })
    ),
  ])
    .then(
      ([
        dopPrice,
        assetsIn,
        _balance,
        _dopBalance,
        _dopAllowance,
        metadata,
        _markets,
      ]) => {
        const balance = toNumber(fromWei(_balance))
        const rewardBalance = toNumber(fromWei(metadata.allocated))
        const dopBalance = fromWei(_dopBalance)
        const dopAllowance = toNumber(fromWei(_dopAllowance))
        const marketBalances = {}
        const marketAllowances = {}
        const supplyBalances = {}
        const borrowBalances = {}
        const marketSupplyRates = {}
        const marketBorrowRates = {}
        const marketDistributeApys = {}

        let totalSupply = new BigNumber(0)
        let totalCash = new BigNumber(0)
        let supplyEarning = new BigNumber(0)
        let totalBorrow = new BigNumber(0)
        let borrowEarning = new BigNumber(0)
        let totalDopSupplyEarning = new BigNumber(0)
        let totalDopBorrowEarning = new BigNumber(0)
        let TVL = new BigNumber(0)
        let MarketBorrowed = new BigNumber(0)
        let netApy = new BigNumber(0)
        const blocksPerDay = 60 / 13.4 * 60 * 24
        const daysPerYear = 365

        const toChecksumAddress =
          library && library.web3.utils.toChecksumAddress

        library.markets.forEach((market, idx) => {
          const { underlyingAddress: address, underlyingPriceUSD: price } =
            market
          marketBalances[address] =
            address !== ZERO
              ? fromWei(_markets[idx][0], market.underlyingDecimals)
              : balance
          marketAllowances[address] =
            address !== ZERO
              ? Number(fromWei(_markets[idx][1], market.underlyingDecimals))
              : Number.POSITIVE_INFINITY
          supplyBalances[address] = fromWei(
            _markets[idx][2],
            market.underlyingDecimals
          )
          totalSupply = totalSupply.plus(
            new BigNumber(supplyBalances[address]).times(price)
          )
          if (assetsIn.includes(toChecksumAddress(market.id))) {
            totalCash = totalCash.plus(
              new BigNumber(supplyBalances[address])
                .times(price)
                .times(market.collateralFactor)
            )
          }

          marketSupplyRates[address] = _markets[idx][4]
          marketBorrowRates[address] = _markets[idx][5]
          const supplyRatePerBlock = Number(
            new BigNumber(_markets[idx][4]).div(10 ** 18).toString(10)
          )
          const supplyApy = new BigNumber(supplyRatePerBlock * blocksPerDay + 1)
            .pow(daysPerYear)
            .minus(1)
            .times(100)
            .dp(2, 1)
            .toString(10)
          const borrowRatePerBlock = Number(
            new BigNumber(_markets[idx][5]).div(10 ** 18).toString(10)
          )
          const borrowApy = new BigNumber(borrowRatePerBlock * blocksPerDay + 1)
            .pow(daysPerYear)
            .minus(1)
            .times(100)
            .dp(2, 1)
            .toString(10)

          supplyEarning = supplyEarning.plus(
            new BigNumber(supplyBalances[address])
              .times(price)
              .times(supplyApy)
              .div(100)
          )
          borrowBalances[address] = fromWei(
            _markets[idx][3],
            market.underlyingDecimals
          )
          totalBorrow = totalBorrow.plus(
            new BigNumber(borrowBalances[address]).times(price)
          )
          borrowEarning = borrowEarning.plus(
            new BigNumber(borrowBalances[address])
              .times(price)
              .times(borrowApy)
              .div(100)
          )
          // Distribution APY Calculation
          const compSpeed = Number(
            new BigNumber(_markets[idx][6])
              .div(10 ** 18)
              .times(0.5)
              .toString(10)
          )

          const marketSupply = new BigNumber(_markets[idx][7]).times(
            _markets[idx][8]
          )
          const supplyDopApy =
            !compSpeed || marketSupply.isZero()
              ? '0'
              : new BigNumber(100)
                  .times(
                    new BigNumber(1)
                      .plus(
                        new BigNumber(dopPrice)
                          .times(compSpeed)
                          .times(blocksPerDay)
                          .div(marketSupply.times(price))
                      )
                      .pow(365)
                      .minus(1)
                  )
                  .toString(10)
          const marketBorrows = new BigNumber(_markets[idx][9]).div(
            10 ** market.underlyingDecimals
          )
          const borrowDopApy =
            !compSpeed || marketBorrows.isZero()
              ? '0'
              : new BigNumber(100)
                  .times(
                    new BigNumber(
                      new BigNumber(1).plus(
                        new BigNumber(dopPrice)
                          .times(compSpeed)
                          .times(blocksPerDay)
                          .div(new BigNumber(marketBorrows).times(price))
                      )
                    )
                      .pow(365)
                      .minus(1)
                  )
                  .toString(10)
          TVL = TVL.plus(
            marketSupply.times(price)
          )
          MarketBorrowed = MarketBorrowed.plus(
            marketBorrows.times(price)
          )
          // TVL = TVL.plus(
          //   new BigNumber(market.origin || market.cash).times(price)
          // )
          totalDopSupplyEarning = totalDopSupplyEarning.plus(
            new BigNumber(supplyDopApy)
              .times(supplyBalances[address])
              .times(price)
              .div(100)
          )
          totalDopBorrowEarning = totalDopBorrowEarning.plus(
            new BigNumber(borrowDopApy)
              .times(borrowBalances[address])
              .times(price)
              .div(100)
          )
          marketDistributeApys[address] = [supplyDopApy, borrowDopApy]
        })

        const totalEarning = new BigNumber(supplyEarning)
          .plus(totalDopSupplyEarning)
          .plus(totalDopBorrowEarning)
          .minus(borrowEarning)
        if (totalEarning.isGreaterThan(0)) {
          if (totalSupply.isGreaterThan(0))
            netApy = totalEarning.div(totalSupply).times(100)
        } else {
          if (totalBorrow.isGreaterThan(0))
            netApy = totalEarning.div(totalBorrow).times(100)
        }

        dispatch({
          type: 'balance',
          payload: {
            dopPrice: Number(dopPrice),
            assetsIn,
            balance,
            rewardBalance,
            dopBalance,
            dopAllowance,
            marketBalances,
            marketAllowances,
            marketSupplyRates,
            marketBorrowRates,
            marketDistributeApys,
            TVL,
            MarketBorrowed,
            supplyBalances,
            borrowBalances,
            totalSupply: totalSupply.toNumber(),
            totalCash: totalCash.toNumber(),
            totalBorrow: totalBorrow.toNumber(),
            netAPY: netApy.toNumber(),
          },
        })
        updateMarketCash(library, (markets) => library.updateMarkets(markets))
      }
    )
    .catch(console.log)
}

export function updateMarketCash(library, callback) {
  if (!library || !library.initiated) return
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)
  getMarkets(library.wallet.network)
    .then((markets) => {
      Promise.all(
        markets.map((market) => {
          const dTokenMethods = library.methods.DToken(library.DToken(market))
          return Promise.all([
            Promise.resolve(market),
            dTokenMethods ? dTokenMethods.getCash() : Promise.resolve(market.cash),
          ])
        })
      )
        .then((cashes) => {
          callback(
            cashes.map((data: any) => ({
              ...data[0],
              origin: data[0].cash,
              cash: fromWei(data[1], data[0].underlyingDecimals),
            }))
          )
        })
        .catch(console.log)
    })
    .catch(console.log)
}

export default function Layout({
  children,
  router: { route },
  markets,
  networks,
}) {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initState)
  const [loading, connectWallet, library] = useWallet(dispatch, markets)
  const [restored, setRestored] = useState(false)
  const [isCollapse, setIsCollapse] = useState(false)
  const netMarkets = (library && markets[library.wallet.network]) || []

  useEffect(() => {
    if (route !== '/' && !library) {
      connectWallet()
    }
    setIsCollapse(false)
  }, [route, library])

  const getBalance = () => {
    accountBalance(library, dispatch)
  }

  useEffect(() => {
    if (library && state.account.address) {
      if (balanceTimer) clearInterval(balanceTimer)
      balanceTimer = setInterval(getBalance, FETCH_TIME * 1000)
      getBalance()
    }
    return () => balanceTimer && clearInterval(balanceTimer)
  }, [library, state.account.address])

  const checkTransactions = () => {
    const { transactions } = state
    Promise.all(
      transactions.map(
        (transaction) =>
          new Promise((resolve) => {
            library.web3.eth
              .getTransactionReceipt(transaction[0])
              .then(() => resolve(transaction[0]))
              .catch(() => resolve(transaction[0]))
          })
      )
    ).then((receipts) => {
      dispatch({
        type: 'txHash',
        payload: [receipts.filter((hash) => hash), true],
      })
    })
  }

  useEffect(() => {
    if (!restored && library) {
      setRestored(true)
      checkTransactions()
    }
  }, [library, state.transactions, state.account.address])

  return (
    <>
      <Head>
        <title>Drops Loans</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link
          href="https://necolas.github.io/normalize.css/latest/normalize.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {route === '/' ? (
        children
      ) : (
        <main className={`${styles.main} flex-column justify-between`}>
          <header className={styles.header}>
            <div className="flex-center justify-between limited">
              <Link href="/">
                <img
                  className={`${styles.logo} cursor`}
                  src="/logo.png"
                  alt="Drops Loans"
                />
              </Link>
              <div className="flex-center">
                <div className={`flex ${styles.menu}`}>
                  <Link href="/staking">
                    <div
                      className={
                        router.pathname === '/staking' ? styles.activeMenu : ''
                      }
                    >
                      Staking
                    </div>
                  </Link>
                  <Link href="/loans">
                    <div
                      className={
                        router.pathname === '/loans' ? styles.activeMenu : ''
                      }
                    >
                      Loans
                    </div>
                  </Link>
                  {/* <Link href="/vedop">
                    <div
                      className={
                        router.pathname === '/vedop' ? styles.activeMenu : ''
                      }
                    >
                      veDOP
                    </div>
                  </Link> */}
                </div>
                <div className={styles.mobileMenu}>
                  <div className={styles.collapseContent} id="collapse-content">
                    <Collapse isOpened={isCollapse}>
                      <div className={`${styles.menuContent} flex-all`}>
                        <Link href="/">
                          <div
                            className={
                              router.pathname === '/' ? styles.activeMenu : ''
                            }
                          >
                            Home
                          </div>
                        </Link>
                        <Link href="/staking">
                          <div
                            className={
                              router.pathname === '/staking'
                                ? styles.activeMenu
                                : ''
                            }
                          >
                            Staking
                          </div>
                        </Link>
                        <Link href="/loans">
                          <div
                            className={
                              router.pathname === '/loans'
                                ? styles.activeMenu
                                : ''
                            }
                          >
                            Loans
                          </div>
                        </Link>
                        {/* <Link href="/vedop">
                          <div
                            className={
                              router.pathname === '/vedop'
                                ? styles.activeMenu
                                : ''
                            }
                          >
                            veDOP
                          </div>
                        </Link> */}
                      </div>
                    </Collapse>
                  </div>
                </div>
                <Account
                  library={library}
                  {...state}
                  loading={loading}
                  dispatch={dispatch}
                  connectWallet={connectWallet}
                />
                <img
                  src="/assets/menu.svg"
                  className={`${styles.hamburger} cursor`}
                  alt="menu"
                  onClick={() => setIsCollapse(!isCollapse)}
                />
              </div>
            </div>
          </header>
          {library && networks.includes(state.account.network) ? (
            React.cloneElement(children, {
              state,
              dispatch,
              library,
              markets: netMarkets,
              networks,
            })
          ) : (
            <div className={styles.invalidNetwork}>
              <div className="center flex-column flex-center">
                Please connect to following networks
                <br />
                <ul>
                  {networks.map((network, idx) => (
                    <li key={idx}>{networkLabels[network]}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <footer className={styles.footer}>
            <div className="flex-center justify-between limited">
              <Link href="/">
                <img
                  className={`${styles.logo} cursor`}
                  src="/logo_white.png"
                  alt="Drops Loans"
                />
              </Link>
              <div className={`flex-center ${styles.linkWrapper}`}>
                <Link href="/">
                  <div
                    className={router.pathname === '/' ? styles.activeMenu : ''}
                  >
                    Home
                  </div>
                </Link>
                <a 
                  href="https://blog.drops.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={router.pathname === 'https://blog.drops.co/' ? styles.activeMenu : ''}
                  >
                    Blog
                  </div>
                </a>
                <Link href="/staking">
                  <div
                    className={
                      router.pathname === '/staking' ? styles.activeMenu : ''
                    }
                  >
                    Staking
                  </div>
                </Link>
                <Link href="/loans">
                  <div
                    className={
                      router.pathname === '/loans' ? styles.activeMenu : ''
                    }
                  >
                    Loans
                  </div>
                </Link>
                {/* <Link href="/vedop">
                  <div
                    className={
                      router.pathname === '/vedop' ? styles.activeMenu : ''
                    }
                  >
                    veDOP
                  </div>
                </Link> */}
                <a
                    href="https://docs.drops.co"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>
              </div>
              <div className={styles.socials}>
                <div className={styles.socials_network}>
                  <a
                    href="https://twitter.com/dropsnft"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/assets/socials/twitter.svg" alt="twitter" />
                  </a>
                  <a
                    href="https://t.me/drops_nft"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/assets/socials/telegram.svg" alt="telegram" />
                  </a>
                  <a
                    href="https://discord.gg/FqZKAs6pmD"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/assets/socials/discord.svg" alt="discord" />
                  </a>
                  <a href="/" target="_blank">
                    <img src="/assets/socials/medium.svg" alt="medium" />
                  </a>
                </div>
                <SubscribeButton />
              </div>
            </div>
          </footer>
        </main>
      )}
    </>
  )
}
