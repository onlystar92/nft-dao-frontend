import { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from 'layout'
import 'styles/globals.css'
import { useEffect, useState } from 'react'

import 'vendor/index.scss'
import 'vendor/home.scss'

function App({ Component, router }: AppProps) {
  const [markets, setMarkets] = useState(null)
  console.log(markets)
  const cleanCash = (market) => ({ ...market, cash: 0 })
  useEffect(() => {
    getMarkets()
      .then(([markets, rinkebyMarkets]) =>
        setMarkets({
          1: markets.map(cleanCash),
          4: rinkebyMarkets.map(cleanCash),
        })
      )
      .catch(console.log)
  }, [])
  return markets ? (
    <Layout router={router} networks={[1, 4]} markets={markets}>
      <Component />
    </Layout>
  ) : (
    <>
      <Head>
        <title>Drops Loans</title>
      </Head>
      <div className="fill flex-center justify-center">
        <img src="/assets/loading.gif" style={{ width: 50 }} />
      </div>
    </>
  )
}

export function getMarkets(network?: number): Promise<any[]> {
  return network
    ? getSubGraph(network)
    : Promise.all([getSubGraph(1), getSubGraph(4)])
}

const links = {
  1: 'https://api.thegraph.com/subgraphs/name/defi-cloud/drops-nft-loans',
  4: 'https://api.thegraph.com/subgraphs/name/defi-cloud/drops-nft-loans-rinkeby',
}
function getSubGraph(network): Promise<any[]> {
  if (!links[network]) return Promise.resolve([])
  return new Promise((resolve) =>
    fetch(links[network], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query marketsQuery {
          markets(first: 20) {
            id
            borrowRate
            cash
            collateralFactor
            exchangeRate
            interestRateModelAddress
            name
            reserves
            supplyRate
            symbol
            totalBorrows
            totalSupply
            underlyingName
            underlyingAddress
            underlyingPrice
            underlyingSymbol
            underlyingPriceUSD
            underlyingDecimals
            accrualBlockNumber
            blockTimestamp
            borrowIndex
            reserveFactor
          }
        }
      `,
      }),
    })
      .then((response) => response.json())
      .then(({ data: { markets } }) =>
        markets
          .map(({ name, underlyingSymbol, ...item }) => ({
            ...item,
            name: name.replace('Drops NFT Loans', '').trim(),
            underlyingSymbol: underlyingSymbol.replace('(rinkeby)', '').trim(),
          }))
          .map(({ id, name, ...item }) => ({
            ...item,
            name,
            id,
          }))
      )
      .then(resolve)
      .catch(() => resolve([]))
  )
}

export default App
