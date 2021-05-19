import BigNumber from 'bignumber.js'

export function getPools(library, dispatch) {
  const { dopPerBlock, poolLength, poolInfo, userInfo, pendingDop } =
    library.methods.MasterChef
  const { LpToken } = library.methods
  const account = library.wallet.address

  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365

  const dopMarket =
    library &&
    library.markets &&
    library.markets.find((m) => m.underlyingSymbol === 'DOP')

  const fromWei = (value, decimals = 18) =>
    decimals < 18 ? value / 10 ** decimals : library.web3.utils.fromWei(value)

  poolLength()
    .then((length) =>
      Promise.all(
        new Array(length)
          .fill(0)
          .map((_, id) =>
            Promise.all([
              poolInfo(id),
              userInfo(id, account),
              pendingDop(id, account),
            ])
          )
      )
        .then((poolInfos) => {
          Promise.all(
            poolInfos.map(
              (info) =>
                new Promise((resolve, reject) => {
                  const methods = LpToken(
                    library.LPTokenContract(info[0].lpToken)
                  )
                  Promise.all([
                    methods.getBalance(account),
                    methods.totalSupply(),
                    methods.getReserves(),
                    methods.getToken0(),
                    methods.getToken1(),
                    methods.getBalance(library.addresses.MasterChef),
                    methods.getAllowance(account, library.addresses.MasterChef),
                  ])
                    .then(
                      ([
                        _balance,
                        _totalLp,
                        _reserves,
                        _token0,
                        _token1,
                        totalLpSupply,
                        _allowance,
                      ]) => {
                        dopPerBlock()
                          .then((dops) => {
                            let totalLocked = new BigNumber(0)
                            if (
                              _token0.toLowerCase() ===
                              library.addresses.Comp.toLowerCase()
                            ) {
                              totalLocked = new BigNumber(_reserves._reserve0)
                                .div(1e18)
                                .times(2)
                                .times(dopMarket.underlyingPriceUSD)
                            } else {
                              totalLocked = new BigNumber(_reserves._reserve1)
                                .div(1e18)
                                .times(2)
                                .times(dopMarket.underlyingPriceUSD)
                            }
                            let apy =
                              totalLocked.isZero() ||
                              new BigNumber(info[1].amount).isZero()
                                ? '0'
                                : new BigNumber(dops)
                                    .div(1e18)
                                    .times(blocksPerDay)
                                    .times(daysPerYear)
                                    .times(dopMarket.underlyingPriceUSD)
                                    .div(
                                      new BigNumber(info[1].amount)
                                        .div(_totalLp)
                                        .times(totalLocked)
                                    )
                                    .dp(2, 1)
                                    .toString(10)

                            resolve({
                              ...(library.addresses.Pools.find(
                                (pool) => pool.lpToken === info[0].lpToken
                              ) || {}),
                              ...info[0],
                              ...info[1],
                              pendingDop: info[2],
                              balance: fromWei(_balance),
                              apy,
                              dopPerBlock: new BigNumber(dops)
                                .div(1e18)
                                .dp(2, 1)
                                .toString(10),
                              totalLp: new BigNumber(_totalLp)
                                .div(1e18)
                                .dp(2, 1)
                                .toString(10),
                              totalLpSupply: new BigNumber(totalLpSupply)
                                .div(1e18)
                                .dp(2, 1)
                                .toString(10),
                              allowance: new BigNumber(_allowance)
                                .div(1e18)
                                .toString(10),
                              lpPrice: new BigNumber(totalLocked)
                                .div(new BigNumber(_totalLp).div(1e18))
                                .toString(10),
                            })
                          })
                          .catch((err) => console.log('dopPerBlock', err))
                      }
                    )
                    .catch(reject)
                })
            )
          )
            .then((pools) => {
              dispatch({
                type: 'pools',
                payload: pools,
              })
            })
            .catch((err) => console.log('getPoolDetails', err))
        })
        .catch((err) => console.log('getPoolInfos', err))
    )
    .catch((err) => console.log('getPools', err))
}

export function getVestingInfo(library, dispatch) {
  const { allocation, cliff, start, duration, releasable, released } =
    library.methods.Vesting
  const account = library.wallet.address
  Promise.all([
    allocation(account),
    released(account),
    releasable(account),
    cliff(),
    start(),
    duration(),
  ])
    .then(([allocation, released, releasable, cliff, start, duration]) => {
      dispatch({
        type: 'vesting',
        payload: [
          library.web3.utils.fromWei(allocation),
          library.web3.utils.fromWei(released),
          library.web3.utils.fromWei(releasable),
          Number(cliff) * 1000,
          (Number(start) + Number(duration)) * 1000,
        ],
      })
    })
    .catch((err) => console.log('getVestingInfo', err))
}
