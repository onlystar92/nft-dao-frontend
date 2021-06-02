import BigNumber from 'bignumber.js'
import { getTokenPriceUSD } from 'utils/uniswap'

export function getPools(library, dispatch, dopPrice) {
  const {
    dopPerBlock,
    poolLength,
    totalAllocPoint,
    poolInfo,
    userInfo,
    pendingDop,
  } = library.methods.MasterChef
  const { LpToken, Market } = library.methods
  const account = library.wallet.address

  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365

  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toString(10)
      : library.web3.utils.fromWei(value)

  Promise.all([poolLength(), dopPerBlock(), totalAllocPoint()])
    .then(([length, dops, totalAllocPt]) => {
      if (Number(length) === 0) {
        dispatch({
          type: 'pools',
          payload: [],
        })
        return
      }
      Promise.all(
        new Array(Number(length))
          .fill(0)
          .map((_, id) =>
            Promise.all([
              poolInfo(id),
              userInfo(id, account),
              pendingDop(id, account),
              id,
            ])
          )
      )
        .then((poolInfos) => {
          Promise.all(
            poolInfos.map(
              (info) =>
                new Promise((resolve, reject) => {
                  const poolType = library.addresses.Pools.find(
                    (pool) =>
                      pool.lpToken.toLowerCase() ===
                      info[0].lpToken.toLowerCase()
                  ).type
                  let methods: any
                  let requestMethos

                  if (poolType === 'LP') {
                    methods = LpToken(library.LPTokenContract(info[0].lpToken))
                    requestMethos = [
                      methods.getBalance(account),
                      methods.totalSupply(),
                      methods.getReserves(),
                      methods.getToken0(),
                      methods.getToken1(),
                      methods.getBalance(library.addresses.MasterChef),
                      methods.getAllowance(
                        account,
                        library.addresses.MasterChef
                      ),
                    ]
                  } else {
                    methods = Market(
                      library.ERC20TokenContract(info[0].lpToken)
                    )
                    requestMethos = [
                      methods.getBalance(account),
                      methods.totalSupply(),
                      Promise.resolve('0'),
                      getTokenPriceUSD(info[0].lpToken),
                      methods.decimals(),
                      methods.getBalance(library.addresses.MasterChef),
                      methods.getAllowance(
                        account,
                        library.addresses.MasterChef
                      ),
                    ]
                  }

                  Promise.all([...requestMethos])
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
                        let totalLocked = new BigNumber(0)
                        let isLp = _reserves !== '0'
                        const tokenDecimal = isLp ? 18 : _token1
                        let tokenPrice = _token0 === '0' ? 1 : Number(_token0)

                        if (isLp) {
                          if (
                            _token0.toLowerCase() ===
                            library.addresses.Comp.toLowerCase()
                          ) {
                            totalLocked = new BigNumber(_reserves._reserve0)
                              .div(1e18)
                              .times(2)
                              .times(dopPrice)
                          } else {
                            totalLocked = new BigNumber(_reserves._reserve1)
                              .div(1e18)
                              .times(2)
                              .times(dopPrice)
                          }
                          tokenPrice = new BigNumber(totalLocked)
                            .div(new BigNumber(_totalLp).div(10 ** 18))
                            .toNumber()
                        } else {
                          totalLocked = new BigNumber(totalLpSupply)
                            .div(10 ** tokenDecimal)
                            .times(tokenPrice)
                        }
                        const lockAmount = isLp
                          ? new BigNumber(totalLpSupply)
                              .div(_totalLp)
                              .times(totalLocked)
                          : totalLocked
                        let apy =
                          totalLocked.isZero() ||
                          new BigNumber(totalLpSupply).isZero()
                            ? '0'
                            : new BigNumber(dops)
                                .div(1e18)
                                .times(blocksPerDay)
                                .times(daysPerYear)
                                .times(
                                  new BigNumber(info[0].allocPoint).div(
                                    totalAllocPt
                                  )
                                )
                                .times(dopPrice)
                                .div(lockAmount)
                                .times(100)
                                .dp(2, 1)
                                .toString(10)

                        resolve({
                          ...(library.addresses.Pools.find(
                            (pool) => pool.id === info[3]
                          ) || {}),
                          ...info[0],
                          ...info[1],
                          pendingDop: info[2],
                          balance: fromWei(_balance, tokenDecimal),
                          apy,
                          dopPerBlock: fromWei(dops),
                          totalLp: fromWei(_totalLp, tokenDecimal),
                          totalLpSupply: fromWei(totalLpSupply, tokenDecimal),
                          allowance: fromWei(_allowance, tokenDecimal),
                          decimals: tokenDecimal,
                          lpPrice: tokenPrice,
                          totalAllocPt,
                        })
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
    })
    .catch((err) => console.log('getPools', err))
}

export function getVestings(library, dispatch) {
  Promise.all([0, 1, 2].map((id) => getVestingInfo(id, library)))
    .then((vestings) => {
      dispatch({
        type: 'vesting',
        payload: (vestings || []).map(
          ([allocation, released, releasable, cliff, start, duration, id]) => [
            library.web3.utils.fromWei(allocation),
            library.web3.utils.fromWei(released),
            library.web3.utils.fromWei(releasable),
            Number(cliff) * 1000,
            (Number(start) + Number(duration)) * 1000,
            id,
          ]
        ),
      })
    })
    .catch((err) => console.log('getVestingInfo', err))
}

export function getVestingInfo(vIndex, library) {
  const { allocation, cliff, start, duration, releasable, released } =
    library.methods.Vesting[vIndex]
  const account = library.wallet.address
  return Promise.all([
    allocation(account),
    released(account),
    releasable(account),
    cliff(),
    start(),
    duration(),
    vIndex,
  ])
}
