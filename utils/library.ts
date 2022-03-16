import BigNumber from 'bignumber.js'
import Multicall from '@dopex-io/web3-multicall'
import { getTokenPriceUSD } from 'utils/uniswap'

export async function getPools(library, dispatch, dopPrice) {
  const { LpToken, Market } = library.methods
  const account = library.wallet.address
  const blocksPerDay = 4 * 60 * 24
  const daysPerYear = 365

  const multicall = new Multicall({
    chainId: library.wallet.network,
    provider: library.web3.currentProvider,
  })
  const fromWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).div(10 ** decimals).toFixed(decimals, 0)
      : library.web3.utils.fromWei(value)

  const multicallData1: any = await multicall.aggregate([
    library.contracts.MasterChef.methods.poolLength(),
    library.contracts.MasterChef.methods.dopPerBlock(),
    library.contracts.MasterChef.methods.totalAllocPoint(),
  ])
  Promise.all([...multicallData1])
    .then(([length, dops, totalAllocPt]) => {
      if (Number(length) === 0) {
        dispatch({
          type: 'pools',
          payload: [],
        })
        return
      }
      Promise.all(
        new Array(Number(length)).fill(0).map(async (_, id) => {
          const multicallData2: any = await multicall.aggregate([
            library.contracts.MasterChef.methods.poolInfo(id),
            library.contracts.MasterChef.methods.userInfo(id, account),
            library.contracts.MasterChef.methods.pendingDop(id, account),
          ])
          return Promise.all([
            ...multicallData2,
            id,
          ])
        })
      )
        .then((poolInfos) => {
          Promise.all(
            poolInfos.map(
              (info) =>
                new Promise(async (resolve, reject) => {
                  const pool = library.addresses.Pools.find(
                    (pool) =>
                      pool.lpToken.toLowerCase() ===
                      info[0][0].toLowerCase()
                  )
                  if (!pool) return resolve(null)
                  const poolType = pool.type
                  let multicallData: any

                  if (poolType === 'LP') {
                    multicallData = await multicall.aggregate([
                      library.LPTokenContract(info[0][0]).methods.balanceOf(account),
                      library.LPTokenContract(info[0][0]).methods.totalSupply(),
                      library.LPTokenContract(info[0][0]).methods.getReserves(),
                      library.LPTokenContract(info[0][0]).methods.token0(),
                      library.LPTokenContract(info[0][0]).methods.token1(),
                      library.LPTokenContract(info[0][0]).methods.balanceOf(library.addresses.MasterChef),
                      library.LPTokenContract(info[0][0]).methods.allowance(account,
                        library.addresses.MasterChef),
                    ])
                  } else {
                    const multicallData3 = await multicall.aggregate([
                      library.ERC20TokenContract(info[0][0]).methods.balanceOf(account),
                      library.ERC20TokenContract(info[0][0]).methods.totalSupply(),
                      library.ERC20TokenContract(info[0][0]).methods.decimals(),
                      library.ERC20TokenContract(info[0][0]).methods.balanceOf(library.addresses.MasterChef),
                      library.ERC20TokenContract(info[0][0]).methods.allowance(account,
                        library.addresses.MasterChef),
                    ])
                    const tokenPriceUSD = await getTokenPriceUSD(info[0][0])
                    multicallData = [
                      multicallData3[0],
                      multicallData3[1],
                      '0',
                      tokenPriceUSD,
                      multicallData3[2],
                      multicallData3[3],
                      multicallData3[4]
                    ]
                  }
                  Promise.all([...multicallData])
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
                            totalLocked = new BigNumber(_reserves[0])
                              .div(1e18)
                              .times(2)
                              .times(dopPrice)
                          } else {
                            totalLocked = new BigNumber(_reserves[1])
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
                                  new BigNumber(info[0][1]).div(
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
                          lpToken: info[0][0],
                          allocPoint: info[0][1],
                          lastRewardBlock: info[0][2],
                          accDopPerShare: info[0][3],
                          amount: info[1][0],
                          rewardDebt: info[1][2],
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
                payload: pools.filter((item) => item),
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

export function getVeDOPInfo(library, dispatch) {
  const { balanceOf, supply, locked } = library.methods.VeDOP
  const account = library.wallet.address
  Promise.all([balanceOf(account), locked(account), supply()]).then((infos) => {
    dispatch({
      type: 'veDOPInfo',
      payload: {
        veDOPBalance: infos[0],
        lockedDOP: infos[1][0],
        lockTime: infos[1][1],
        totalLockedDOP: infos[2],
      },
    })
  })
}
