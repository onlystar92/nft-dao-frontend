import * as EvmChains from 'evm-chains'
import Web3 from 'web3'
import ERC20 from './ABIs/ERC20.json'
import Comptroller from './ABIs/Comptroller.json'
import CompoundLens from './ABIs/CompoundLens.json'
import Comp from './ABIs/Comp.json'
import bETH from './ABIs/dETH.json'
import dToken from './ABIs/dToken.json'
import lpToken from './ABIs/lpToken.json'
import MasterChef from './ABIs/MasterChef.json'
import Vesting from './ABIs/Vesting.json'
import { ZERO } from 'utils/constants'

const DEFAULT_REFRESH = 5 * 1000

export const call =
  (method: (...args: any) => any) =>
  (...args: any) =>
    method(...args).call() as Promise<any>
export const send =
  (method: (...args: any) => any) =>
  (...args: any) => {
    const option = args.pop()
    const transaction = method(...args)
    return {
      estimate: (): Promise<any> =>
        transaction.estimateGas(option) as Promise<any>,
      send: (): Promise<any> => transaction.send(option) as Promise<any>,
      transaction,
    }
  }

interface Options {
  readonly onEvent?: (type: string, payload: any, error: any) => void
  readonly addresses: any
  readonly markets: any
}

interface Wallet {
  address?: string
  network?: number
}

class DropsLoanLibrary {
  public initiated: boolean
  public web3: Web3
  public contracts: any
  public methods: any
  public addresses: any
  public markets: any
  public Markets: any
  public DTokens: any
  private wallet: Wallet = {}
  private options: any
  private subscriptions: any[] = []
  private timers: NodeJS.Timeout[] = []

  constructor(provider: any, options: Options) {
    this.web3 = new Web3(provider)
    this.options = options
    this.init(provider)
  }

  get onEvent() {
    return this.options.onEvent
  }

  public setProvider(provider: any) {
    this.init(provider)
  }

  public onDisconnect() {
    this.disconnect()
  }

  private reset() {
    this.subscriptions.forEach((subscription) => {
      if (subscription.unsubscribe) {
        subscription.unsubscribe()
      } else if (subscription.deleteProperty) {
        subscription.deleteProperty()
      }
    })
    this.timers.forEach((timer) => clearInterval(timer))
  }

  private async setupWallet() {
    let status = 0 // No updates
    const chainId = await this.web3.eth.getChainId()
    const { networkId: network } = await EvmChains.getChain(chainId)
    const [address] = await this.web3.eth.getAccounts()
    if (this.wallet.address && !address) {
      return this.disconnect()
    } else if (this.wallet.network && this.wallet.network !== network) {
      status = 1
    } else if (this.wallet.address !== address) {
      status = 2
    }
    this.wallet.network = network
    this.wallet.address = address
    if (status === 1 || !this.markets) {
      this.addresses = this.options.addresses[this.wallet.network]
      this.markets = this.options.markets[this.wallet.network] || []
    }
    return status
  }

  private async initWallet(refresh: boolean = false) {
    const status = await this.setupWallet()
    if (refresh || status > 0) {
      this.onEvent({
        data: [this.wallet, this.markets],
        event: 'WALLET',
        status,
      })
    }
  }

  private connect() {
    this.initWallet(true)
  }

  private disconnect() {
    if (this.web3.givenProvider.disconnect) {
      this.web3.givenProvider.disconnect()
    }
    delete this.wallet.address
    this.reset()
    this.onEvent({
      event: 'WALLET',
      status: 3,
    })
  }

  private async init(givenProvider?: any) {
    this.initiated = false
    if (givenProvider) this.web3 = new Web3(givenProvider)
    const provider = givenProvider || this.web3.givenProvider
    this.reset()
    const status = await this.setupWallet()
    const { addresses, markets = [], onEvent } = this

    this.subscriptions = [
      provider.on && provider.on('accountsChanged', () => this.initWallet()),
      provider.on && provider.on('chainChanged', () => this.init()),
      provider.on && provider.on('connect', () => this.connect()),
      provider.on && provider.on('disconnect', () => this.disconnect()),
    ].filter((item) => !!item)

    if (addresses) {
      this.Markets = markets.map((market) => [
        market,
        new this.web3.eth.Contract(ERC20 as any, market.underlyingAddress),
      ])

      this.DTokens = markets.map((market) => [
        market,
        new this.web3.eth.Contract(
          (market.underlyingAddress === ZERO ? bETH : dToken) as any,
          this.web3.utils.toChecksumAddress(market.id)
        ),
      ])

      this.contracts = {
        Comptroller: new this.web3.eth.Contract(
          Comptroller as any,
          addresses.Unitroller
        ),
        CompoundLens: new this.web3.eth.Contract(
          CompoundLens as any,
          addresses.CompoundLens
        ),
        Comp: new this.web3.eth.Contract(Comp as any, addresses.Comp),
        MasterChef: new this.web3.eth.Contract(
          MasterChef as any,
          addresses.MasterChef
        ),
        Vesting: new this.web3.eth.Contract(Vesting as any, addresses.Vesting),
      }
      this.subscriptions.push(
        this.contracts.Comptroller.events.allEvents({}).on('data', onEvent)
      )

      this.timers = [
        setInterval(
          () => this.initWallet(),
          this.options.interval || DEFAULT_REFRESH
        ),
      ]

      const getERC20Methods = (contract: any) =>
        contract && {
          approve: send(contract.methods.approve),
          getAllowance: call(contract.methods.allowance),
          getBalance: call(contract.methods.balanceOf),
          totalSupply: call(contract.methods.totalSupply),
        }

      const getDTokenMethods = (contract: any) =>
        contract && {
          mint: send(contract.methods.mint),
          redeem: send(contract.methods.redeem),
          redeemUnderlying: send(contract.methods.redeemUnderlying),
          borrow: send(contract.methods.borrow),
          repayBorrow: send(contract.methods.repayBorrow),
          getBalance: call(contract.methods.balanceOf),
          getCash: call(contract.methods.getCash),
          balanceOfUnderlying: call(contract.methods.balanceOfUnderlying),
          borrowBalanceCurrent: call(contract.methods.borrowBalanceCurrent),
          supplyRatePerBlock: call(contract.methods.supplyRatePerBlock),
          borrowRatePerBlock: call(contract.methods.borrowRatePerBlock),
        }
      const getLpTokenMethods = (contract: any) =>
        contract && {
          getBalance: call(contract.methods.balanceOf),
          getAllowance: call(contract.methods.allowance),
          totalSupply: call(contract.methods.totalSupply),
          getReserves: call(contract.methods.getReserves),
          getToken0: call(contract.methods.token0),
          getToken1: call(contract.methods.token1),
          approve: send(contract.methods.approve),
        }
      this.methods = {
        Comptroller: {
          allMarkets: call(this.contracts.Comptroller.methods.allMarkets),
          getAllMarkets: call(this.contracts.Comptroller.methods.getAllMarkets),
          markets: call(this.contracts.Comptroller.methods.markets),
          getAssetsIn: call(this.contracts.Comptroller.methods.getAssetsIn),
          compRate: call(this.contracts.Comptroller.methods.compRate),
          compSpeeds: call(this.contracts.Comptroller.methods.compSpeeds),
          compAccrued: call(this.contracts.Comptroller.methods.compAccrued),
          enterMarkets: send(this.contracts.Comptroller.methods.enterMarkets),
          exitMarket: send(this.contracts.Comptroller.methods.exitMarket),
          claimComp: send(this.contracts.Comptroller.methods.claimComp),
        },
        CompoundLens: {
          getCompBalanceMetadataExt: (account) =>
            call(this.contracts.CompoundLens.methods.getCompBalanceMetadataExt)(
              addresses.Comp,
              addresses.Unitroller,
              account
            ),
        },
        Comp: {
          balanceOf: call(this.contracts.Comp.methods.balanceOf),
        },
        Market: getERC20Methods,
        DToken: getDTokenMethods,
        LpToken: getLpTokenMethods,
        MasterChef: {
          dopPerBlock: call(this.contracts.MasterChef.methods.dopPerBlock),
          poolLength: call(this.contracts.MasterChef.methods.poolLength),
          poolInfo: call(this.contracts.MasterChef.methods.poolInfo),
          userInfo: call(this.contracts.MasterChef.methods.userInfo),
          pendingDop: call(this.contracts.MasterChef.methods.pendingDop),
          deposit: send(this.contracts.MasterChef.methods.deposit),
          withdraw: send(this.contracts.MasterChef.methods.withdraw),
        },
        Vesting: {
          allocation: call(this.contracts.Vesting.methods.allocation),
          cliff: call(this.contracts.Vesting.methods.cliff),
          start: call(this.contracts.Vesting.methods.start),
          duration: call(this.contracts.Vesting.methods.duration),
          releasable: call(this.contracts.Vesting.methods.releasable),
          released: call(this.contracts.Vesting.methods.released),
          release: send(this.contracts.Vesting.methods.release),
        },
        web3: {
          getBlock: (field: string = 'timestamp') =>
            new Promise((resolve, reject) =>
              this.web3.eth
                .getBlock('latest')
                .then((block: any) => {
                  if (field) {
                    resolve(block[field])
                  } else {
                    resolve(block)
                  }
                })
                .catch(reject)
            ),
        },
      }
    }

    this.onEvent({
      data: [this.wallet, markets],
      event: 'WALLET',
      status,
    })
    this.initiated = true
  }

  public Market(market) {
    const match = this.Markets.find(
      (item) => item[0].underlyingAddress === market.underlyingAddress
    )
    return match ? match[1] : null
  }

  public DToken(market) {
    const match = this.DTokens.find(
      (item) => item[0].underlyingAddress === market.underlyingAddress
    )
    return match ? match[1] : null
  }

  public LPTokenContract(address) {
    return new this.web3.eth.Contract(lpToken as any, address)
  }

  public updateMarkets(markets) {
    this.options.markets[this.wallet.network] = markets
    this.markets = this.options.markets[this.wallet.network] || []
    this.onEvent({
      data: this.markets,
      event: 'MARKETS',
      status,
    })
  }
}

export default DropsLoanLibrary
