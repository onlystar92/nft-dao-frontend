import { useState, useEffect } from 'react'
import Table from 'components/Table/Table'
import Pool from 'components/Pool'
import Button from 'components/Button/Button'
import styles from 'styles/Lending.module.css'

const FETCH_TIME = 15

const NFT_POOL = [
  {
    id: 1,
    poolName: 'Chubbies orange',
    totalSupply: 1300000,
    availableBoorow: 1300000,
    Tokens: [],
    Apy: {
      min: 0.5,
      max: 30.5
    }
  }
]

export default function Lending({ library, state, theme, dispatch }) {
  const [tab, setTab] = useState('All')
  const [tokenPools, setTokenPools] = useState([])

  const getStatus = async() => {
    const res = await fetch('https://drops.co/status')
    const data = await res.json()
    const _tokenPools = [{
      id: 1,
      name: 'Drops Loan',
      totalSupply: data.totalSupply,
      availableToBorrow: data.totalSupply - data.totalBorrow
    }]
    setTokenPools(_tokenPools)
  }
  useEffect(() => {
    getStatus()
  }, [])
  return (
    <>
      <section className={styles.header}>
        <div className={`limited`}>
          <div className={`bold ${styles.lendingTitle} ${theme === 'dark' ? styles.darkLendingTitle : ''}`}>Lending Pools</div>
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex flex-column`}>
          <div className="full">
            <div className={`${styles.tabs} ${theme === 'dark' ? styles.darkTabs : ''}`}>
              <Button
                className={tab === 'All' ? `${styles.active} ${theme === 'dark' ? styles.darkActive : ''}` : ''}
                onClick={() => tab !== 'All' && setTab('All')}
              >
                All
              </Button>
              <Button
                className={tab === 'NFT' ? `${styles.active} ${theme === 'dark' ? styles.darkActive : ''}` : ''}
                onClick={() => tab !== 'NFT' && setTab('NFT')}
              >
                NFT
              </Button>
              <Button
                className={tab === 'Tokens' ? `${styles.active} ${theme === 'dark' ? styles.darkActive : ''}` : ''}
                onClick={() => tab !== 'Tokens' && setTab('Tokens')}
              >
                Tokens
              </Button>
            </div>
          </div>
          {(tab === 'All' || tab === 'NFT') && (
            <div className="full">
              {NFT_POOL.length > 0 && (
                <Table
                  labels={{
                    title: NFT_POOL.length > 0 && tab === 'All' ? 'NFT' : '',
                  }}
                  theme={theme}
                  noBorder
                >
                  <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>Coming soon</div>
                  {/* <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Pool name</th>
                        <th>Total supply</th>
                        <th>Available to borrow</th>
                        <th>Tokens</th>
                        <th>APY</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {NFT_POOL.map((farm) => (
                        <Pool
                          key={farm.poolName}
                          farm={farm}
                          theme={theme}
                          lendingType="nft"
                          library={library}
                        />
                      ))}
                    </tbody>
                  </table> */}
                </Table>
              )}
            </div>
          )}
         {(tab === 'All' || tab === 'Tokens') && (
            <div className="full">
              {tokenPools.length > 0 && (
                <Table
                  labels={{
                    title: tokenPools.length > 0 && tab === 'All' ? 'Tokens' : '',
                  }}
                  theme={theme}
                  noBorder
                >
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Pool name</th>
                        <th>Total supply</th>
                        <th>Available to borrow</th>
                        <th>Tokens</th>
                        {/* <th>APY</th> */}
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenPools.map((farm) => (
                        <Pool
                          key={farm.name}
                          farm={farm}
                          theme={theme}
                          lendingType="token"
                          library={library}
                        />
                      ))}
                    </tbody>
                  </table>
                </Table>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
