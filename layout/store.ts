export const initState = {
  account: {},
  balance: 0,
  markets: [],
  pools: [],
  transactions: [],
  requests: {},
  assetsIn: [],
  marketBalances: {},
  marketAllowances: {},
  supplyBalances: {},
  borrowBalances: {},
  totalSupply: 0,
  totalCash: 0,
  totalBorrow: 0,
  netAPY: 0,
  veDOPInfo: {},
}

const LOCAL_KEY = 'drops-loans'
export function storage(type, ...args) {
  const [key, value] = args
  const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}')
  switch (type) {
    case 1: {
      local[key] = value
      return localStorage.setItem(LOCAL_KEY, JSON.stringify(local))
    }
    case 2: {
      return local[key]
    }
    case 3: {
      delete local[key]
      return localStorage.setItem(LOCAL_KEY, JSON.stringify(local))
    }
    default: {
      console.log('Out of tune!')
      break
    }
  }
}

export const setStorage = (...args) => storage(1, ...args)
export const getStorage = (...args) => storage(2, ...args)
export const delStorage = (...args) => storage(3, ...args)

export function reducer(state, action) {
  switch (action.type) {
    case 'account': {
      const [wallet, markets] = action.payload
      const transactions =
        wallet.address && wallet.address === getStorage('account')
          ? getStorage('transactions')
          : []
      return {
        ...state,
        account: wallet,
        markets: markets.map((market) => ({
          ...market,
          origin: market.cash,
          cash: 0,
        })),
        transactions,
        balance: 0,
        requests: {},
        assetsIn: [],
        marketBalances: {},
        marketAllowances: {},
        supplyBalances: {},
        borrowBalances: {},
        totalSupply: 0,
        totalCash: 0,
        totalBorrow: 0,
        netAPY: 0,
      }
    }
    case 'markets':
      return { ...state, markets: action.payload }
    case 'balance':
      return { ...state, ...action.payload }
    case 'pools':
      return { ...state, pools: action.payload }
    case 'vesting':
      return { ...state, vesting: action.payload }
    case 'veDOPInfo':
      return { ...state, veDOPInfo: action.payload }
    case 'allowance':
      return {
        ...state,
        marketAllowances: { ...state.marketAllowances, ...action.payload },
      }
    case 'poolAllowance':
      state.pools.map((pool) => {
        if (pool.id === action.payload.id) {
          pool.allowance = action.payload.allowance
        }
      })
      return {
        ...state,
      }
    case 'disconnect':
      return { ...state, account: '' }
    case 'assetsIn': {
      return { ...state, assetsIn: action.payload }
    }
    case 'txHash': {
      const [hash, success, ...args] = action.payload
      const hashes = typeof hash === 'string' ? [hash] : hash
      const transactions = success
        ? state.transactions.filter(([item]) => !hashes.includes(item))
        : [...state.transactions, [hash, ...args]]
      setStorage('transactions', transactions)
      if (success) {
        const [type, callback] = args
        delete state.requests[type]
        callback && callback()
      }
      return { ...state, transactions }
    }
    case 'txRequest': {
      const [type, request, id] = action.payload
      if (request) {
        return { ...state, requests: { ...state.requests, [type]: id } }
      } else {
        delete state.requests[type]
        return { ...state }
      }
    }
    default:
      console.log(`Unknown action - ${action.type}`)
      return state
  }
}
