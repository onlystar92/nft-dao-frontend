import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance/Balance'
import Table from 'components/Table/Table'
import SupplyMarket from 'components/Market/SupplyMarket'
import BorrowMarket from 'components/Market/BorrowMarket'
import CollateralModal from 'components/Modal/CollateralModal'
import SupplyModal from 'components/Modal/SupplyModal'
import BorrowModal from 'components/Modal/BorrowModal'
import { ZERO } from 'utils/constants'
import { accountBalance } from 'layout'
import styles from 'styles/Loans.module.css'

let gasInterval = null

export default function Loans(props) {
  const {
    state: {
      account,
      transactions,
      requests,
      assetsIn,
      marketBalances,
      marketAllowances,
      marketSupplyRates,
      marketBorrowRates,
      marketDistributeApys,
      supplyBalances,
      borrowBalances,
      totalSupply,
      totalCash,
      totalBorrow,
      TVL,
      netAPY,
    },
    dispatch,
    library,
    markets,
  } = props
  const from = { from: account.address }
  const network = account.network
  const toChecksumAddress = library && library.web3.utils.toChecksumAddress
  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : library.web3.utils.toWei(value)
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)
  const transactionMap = transactions.reduce(
    ([supplies, borrows], [hash, type, ...args]) => {
      const transaction = {
        enters: {},
        exits: {},
        supplies: {},
        borrows: {},
      }
      switch (type) {
        case 'supply':
          transaction.supplies[args[0]] = hash
          break
        case 'borrow':
          transaction.borrows[args[0]] = hash
          break
        default:
          break
      }
      return [
        { ...supplies, ...transaction.supplies },
        { ...borrows, ...transaction.borrows },
      ]
    },
    new Array(4).fill({})
  )

  const [gas, setGas] = useState(null)
  const [enterMarket, setEnterMarket] = useState(null)
  const [supply, setSupply] = useState(null)
  const [borrow, setBorrow] = useState(null)
  const [disclaimer, setDisclaimer] = useState(
    !window.localStorage.getItem('disclaimer') ? true : false
  )

  function getGas() {
    if (library) {
      Promise.all([
        library.web3.eth.getBlock('latest'),
        library.web3.eth.getGasPrice(),
      ]).then(([block, gasPrice]) => {
        setGas((fromWei(gasPrice) * block.gasLimit) / block.transactions.length)
      })
    }
  }
  useEffect(() => {
    if (library) {
      gasInterval = setInterval(() => {
        getGas()
      }, 60 * 1000)
      getGas()
    }
    return () => gasInterval && clearInterval(gasInterval)
  }, [library])

  useEffect(() => {
    if (account.address) {
      accountBalance(library, dispatch)
      getAssetsIn()
    }
  }, [account.address, account.network])

  useEffect(() => {
    if (library && supply && supply.supplyBalance < 0) {
      const methods = library.methods.DToken(library.DToken(supply))
      Promise.all([
        methods.getBalance(account.address),
        methods.balanceOfUnderlying(account.address),
      ]).then(([balance, supplyBalance]) => {
        setSupply({
          ...supply,
          bBalance: balance,
          supplyBalance: Number(
            fromWei(supplyBalance, supply.underlyingDecimals)
          ),
        })
      })
    }
  }, [supply, library])

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

  const getAssetsIn = () => {
    const methods = library.methods.Comptroller
    methods.getAssetsIn(account.address).then((assetsIn) => {
      dispatch({
        type: 'assetsIn',
        payload: assetsIn,
      })
    })
  }

  const handleEnterMarket = () => {
    const market = enterMarket
    if (library && account.address) {
      const isAssetsIn = assetsIn.includes(toChecksumAddress(market.id))
      const methods = library.methods.Comptroller
      const transaction = isAssetsIn
        ? methods.exitMarket(toChecksumAddress(market.id), from)
        : methods.enterMarkets([toChecksumAddress(market.id)], from)
      handleTransaction('supply', market.id)(transaction.send(), () => {
        getAssetsIn()
        setEnterMarket(null)
      })
    }
  }

  const handleSupplyMarket = (form) => {
    if (marketAllowances[supply.underlyingAddress] <= 0) {
      // Approve
      const amount = 10 ** Math.min(supply.underlyingDecimals, 10)
      const methods = library.methods.Market(library.Market(supply))
      handleTransaction('supply', supply.id)(
        methods
          .approve(toChecksumAddress(supply.id), toWei(amount.toString()), from)
          .send(),
        () =>
          dispatch({
            type: 'allowance',
            payload: { [supply.underlyingAddress]: amount },
          })
      )
    } else {
      const { amount, type } = form
      const methods = library.methods.DToken(library.DToken(supply))
      if (type === 'supply') {
        // Supply
        const transaction =
          supply.underlyingAddress === ZERO
            ? methods.mint({
                ...from,
                value: toWei(amount.toString()),
              })
            : methods.mint(
                toWei(amount.toString(), supply.underlyingDecimals),
                from
              )
        handleTransaction('supply', supply.id)(transaction.send(), () =>
          setSupply(null)
        )
      } else {
        const transaction =
          supply.supplyBalance <= amount
            ? methods.redeem(supply.bBalance, from)
            : methods.redeemUnderlying(
                toWei(amount.toString(), supply.underlyingDecimals),
                from
              )
        handleTransaction('supply', supply.id)(transaction.send(), () =>
          setSupply(null)
        )
      }
    }
  }

  const handleBorrowMarket = (form: any = {}) => {
    const { amount, type } = form

    const methods = library.methods.DToken(library.DToken(borrow))
    if (type === 'borrow') {
      // Borrow
      const transaction = methods.borrow(
        toWei(amount.toString(), borrow.underlyingDecimals),
        from
      )
      handleTransaction('borrow', borrow.id)(transaction.send(), () =>
        setBorrow(null)
      )
    } else {
      if (marketAllowances[borrow.underlyingAddress] <= 0) {
        // Approve
        const amount = 10 ** Math.min(borrow.underlyingDecimals - 2, 12)
        const methods = library.methods.Market(library.Market(borrow))
        handleTransaction('borrow', borrow.id)(
          methods
            .approve(
              toChecksumAddress(borrow.id),
              toWei(amount.toString(), borrow.underlyingDecimals),
              from
            )
            .send(),
          () =>
            dispatch({
              type: 'allowance',
              payload: { [borrow.underlyingAddress]: amount },
            })
        )
      } else {
        const repayAmount =
          amount === -1
            ? new BigNumber(2).pow(256).minus(1).toString(10)
            : toWei(amount.toString(), borrow.underlyingDecimals)
        const transaction =
          borrow.underlyingAddress === ZERO
            ? methods.repayBorrow({
                ...from,
                value: repayAmount,
              })
            : methods.repayBorrow(repayAmount.toString(), from)
        handleTransaction('borrow', borrow.id)(transaction.send(), () =>
          setBorrow(null)
        )
      }
    }
  }

  const mySupplies = markets.filter(
    (m) => +supplyBalances[m.underlyingAddress] > 0
  )
  const myBorrows = markets.filter(
    (m) => +borrowBalances[m.underlyingAddress] > 0
  )

  if (process.env.ENABLE_LOANS === 'false') {
    return (
      <>
        <section className={styles.header}></section>
        <section className={`${styles.content} flex flex-start justify-center`}>
          <div className={`${styles.container} limited flex`}>
            <div className="full">
              {process.env.ENABLE_DROPS === 'false' ? 'Coming soon' : ''}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className={styles.header}>
        <div className={`limited`}>
          {disclaimer && (
            <div className={styles.disclaimer}>
              This is Beta of Drops Loans v1. It is provided "as is" and we
              don't make any warranties, including that Drops is error-free or
              secure. Use it at your own risk.
              <img
                className="cursor"
                src="/assets/close.svg"
                alt="close"
                onClick={() => {
                  window.localStorage.setItem('disclaimer', 'true')
                  setDisclaimer(false)
                }}
              />
            </div>
          )}
          <Balance {...{ TVL, totalCash, totalBorrow, netAPY }} />
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex`}>
          <div className="full">
            <div className={`bold ${styles.supplyTitle}`}>
              Supply
              {totalSupply ? (
                <span>${new BigNumber(totalSupply).dp(2).toString(10)}</span>
              ) : (
                ''
              )}
            </div>
            {mySupplies.length > 0 && (
              <Table classes={{ title: 'first' }} labels={{}}>
                <table cellPadding={0} cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>APY</th>
                      <th>Wallet</th>
                      <th>Collateral</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets
                      .filter((m) => +supplyBalances[m.underlyingAddress] > 0)
                      .map((market) => (
                        <SupplyMarket
                          key={market.id}
                          market={market}
                          assetsIn={assetsIn}
                          balance={
                            supplyBalances[market.underlyingAddress] || '0'
                          }
                          supplyRatePerBlock={fromWei(
                            marketSupplyRates[market.underlyingAddress],
                            18
                          )}
                          onSupply={() =>
                            setSupply({ ...market, supplyBalance: -1 })
                          }
                          onEnterMarket={(assetIn) =>
                            setEnterMarket({ ...market, assetIn })
                          }
                        />
                      ))}
                  </tbody>
                </table>
              </Table>
            )}
            <Table
              classes={{ title: 'first' }}
              labels={{
                title: mySupplies.length > 0 ? 'Available to supply' : '',
              }}
            >
              <table cellPadding={0} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>APY</th>
                    <th>Wallet</th>
                    <th>Collateral</th>
                  </tr>
                </thead>
                <tbody>
                  {markets
                    .filter((m) => +supplyBalances[m.underlyingAddress] === 0)
                    .map((market) => (
                      <SupplyMarket
                        key={market.id}
                        market={market}
                        assetsIn={assetsIn}
                        balance={
                          marketBalances[market.underlyingAddress] || '0'
                        }
                        supplyRatePerBlock={fromWei(
                          marketSupplyRates[market.underlyingAddress],
                          18
                        )}
                        onSupply={() =>
                          setSupply({ ...market, supplyBalance: -1 })
                        }
                        onEnterMarket={(assetIn) =>
                          setEnterMarket({ ...market, assetIn })
                        }
                      />
                    ))}
                </tbody>
              </table>
              {markets.filter((m) => +supplyBalances[m.underlyingAddress] === 0)
                .length === 0 && (
                <p className={`${styles.noMarkets} center`}>No Markets</p>
              )}
              <CollateralModal
                network={network}
                pending={enterMarket && requests.supply === enterMarket.id}
                market={enterMarket}
                disabled={
                  (enterMarket && transactionMap[0][enterMarket.id]) ||
                  (enterMarket &&
                    +borrowBalances[enterMarket.underlyingAddress] !== 0) ||
                  (enterMarket &&
                    enterMarket.assetIn &&
                    new BigNumber(totalBorrow).isGreaterThan(
                      new BigNumber(totalCash)
                        .minus(
                          new BigNumber(
                            supplyBalances[enterMarket.underlyingAddress]
                          )
                            .times(enterMarket.collateralFactor)
                            .times(enterMarket.underlyingPriceUSD)
                        )
                        .times(0.8)
                    ))
                }
                onSubmit={handleEnterMarket}
                onClose={() => setEnterMarket(null)}
              />
              <SupplyModal
                network={network}
                pending={supply && requests.supply === supply.id}
                market={supply}
                assetsIn={assetsIn}
                balance={
                  (supply && marketBalances[supply.underlyingAddress]) || '0'
                }
                supplyRatePerBlock={
                  supply &&
                  fromWei(marketSupplyRates[supply.underlyingAddress], 18)
                }
                current={
                  (supply && supplyBalances[supply.underlyingAddress]) || '0'
                }
                borrowLimit={totalCash}
                borrowLimitUsed={
                  totalCash > 0 ? (totalBorrow / totalCash) * 100 : 0
                }
                totalSupply={totalSupply}
                totalBorrow={totalBorrow}
                distributeApy={
                  (supply &&
                    marketDistributeApys[supply.underlyingAddress] &&
                    marketDistributeApys[supply.underlyingAddress][0]) ||
                  '-'
                }
                gas={Number(gas)}
                disabled={supply && transactionMap[0][supply.id]}
                allowed={
                  supply && marketAllowances[supply.underlyingAddress] > 0
                }
                onSubmit={handleSupplyMarket}
                onClose={() => setSupply(null)}
              />
            </Table>
          </div>
          <div className="full">
            <div className={`bold ${styles.borrowTitle}`}>
              Borrow
              {totalBorrow ? (
                <span>${new BigNumber(totalBorrow).dp(2).toString(10)}</span>
              ) : (
                ''
              )}
            </div>
            {myBorrows.length > 0 && (
              <Table classes={{ title: 'second' }} labels={{}}>
                <table cellPadding={0} cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>APY/Accrued</th>
                      <th>Wallet</th>
                      <th>% Of Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets
                      .filter((m) => +borrowBalances[m.underlyingAddress] > 0)
                      .map((market) => (
                        <BorrowMarket
                          isMyMarkets={true}
                          key={market.id}
                          market={market}
                          totalCash={totalCash}
                          borrowRatePerBlock={fromWei(
                            marketBorrowRates[market.underlyingAddress],
                            18
                          )}
                          balance={
                            borrowBalances[market.underlyingAddress] || '0'
                          }
                          onBorrow={() =>
                            setBorrow({ ...market, borrowBalance: -1 })
                          }
                        />
                      ))}
                  </tbody>
                </table>
              </Table>
            )}
            <Table
              classes={{ title: 'second' }}
              labels={{
                title: myBorrows.length > 0 ? 'Available to borrow' : '',
              }}
            >
              <table cellPadding={0} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>APY</th>
                    <th>Wallet</th>
                    <th>Liquidity</th>
                  </tr>
                </thead>
                <tbody>
                  {markets
                    .filter((m) => +borrowBalances[m.underlyingAddress] === 0)
                    .map((market) => (
                      <BorrowMarket
                        key={market.id}
                        market={market}
                        borrowRatePerBlock={fromWei(
                          marketBorrowRates[market.underlyingAddress],
                          18
                        )}
                        balance={
                          marketBalances[market.underlyingAddress] || '0'
                        }
                        onBorrow={() =>
                          setBorrow({ ...market, borrowBalance: -1 })
                        }
                      />
                    ))}
                </tbody>
              </table>
              {markets.filter((m) => +borrowBalances[m.underlyingAddress] === 0)
                .length === 0 && (
                <p className={`${styles.noMarkets} center`}>No Markets</p>
              )}
              <BorrowModal
                network={network}
                pending={borrow && requests.borrow === borrow.id}
                market={borrow}
                balance={
                  (borrow && borrowBalances[borrow.underlyingAddress]) || '0'
                }
                walletBalance={
                  (borrow && marketBalances[borrow.underlyingAddress]) || '0'
                }
                totalBorrow={totalBorrow}
                borrowLimit={
                  borrow &&
                  (Number(borrow.underlyingPriceUSD) > 0
                    ? totalCash / borrow.underlyingPriceUSD
                    : 0)
                }
                borrowRatePerBlock={
                  borrow &&
                  fromWei(marketBorrowRates[borrow.underlyingAddress], 18)
                }
                borrowLimitUsed={
                  totalCash > 0 ? (totalBorrow / totalCash) * 100 : 0
                }
                distributeApy={
                  (borrow &&
                    marketDistributeApys[borrow.underlyingAddress] &&
                    marketDistributeApys[borrow.underlyingAddress][1]) ||
                  '-'
                }
                disabled={borrow && transactionMap[1][borrow.id]}
                allowed={
                  borrow && marketAllowances[borrow.underlyingAddress] > 0
                }
                onSubmit={handleBorrowMarket}
                onClose={() => setBorrow(null)}
              />
            </Table>
          </div>
        </div>
      </section>
    </>
  )
}
