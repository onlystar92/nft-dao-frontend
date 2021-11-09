import { useState, useEffect } from 'react'
import Table from 'components/Table/Table'
import LPFarm from 'components/Farm/LPFarm'
import Button from 'components/Button/Button'
import styles from 'styles/Staking.module.css'
import { getPools } from 'utils/library'
import Modal from '../../components/Mailchimp/ui/Modal/Modal';
import MailchimpForm from "../../components/Mailchimp/MailchimpForm/MailchimpForm";

const FETCH_TIME = 15
let poolTimer = null

export default function Staking({ library, state, dispatch }) {
  const [tab, setTab] = useState('stake_lp')
  const myStaked = state.pools.filter((farm) => Number(farm.amount) !== 0)
  const availalbeFarms = state.pools.filter((farm) => Number(farm.amount) === 0)

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

  return (
    <>
      <section className={styles.header}>
        <div className={`limited`}>
          <div className={`bold ${styles.stakingTitle}`}>Staking</div>
        </div>
      </section>
      <section className={`${styles.content} flex flex-start justify-center`}>
        <div className={`${styles.container} limited flex flex-column`}>
          <div className="full">
            <div className={styles.tabs}>
              <Button
                className={tab === 'stake_lp' ? styles.active : ''}
                onClick={() => tab !== 'stake_lp' && setTab('stake_lp')}
              >
                Stake LP
              </Button>
              <Button
                className={tab === 'stake_nft' ? styles.active : ''}
                onClick={() => tab !== 'stake_nft' && setTab('stake_nft')}
              >
                Stake NFT
              </Button>
            </div>
          </div>
          {tab === 'stake_lp' && (
            <div className="full">
              {myStaked.length > 0 && (
                <Table
                  labels={{
                    title: myStaked.length > 0 ? 'My staked positions' : '',
                  }}
                  noBorder
                >
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Asset name</th>
                        <th>APY%</th>
                        <th>Total staked</th>
                        <th>My Stake</th>
                        <th>My earnings</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {myStaked.map((farm) => (
                        <LPFarm
                          key={farm.symbol}
                          farm={farm}
                          dopPrice={state.dopPrice}
                          library={library}
                          isStaked={true}
                        />
                      ))}
                    </tbody>
                  </table>
                </Table>
              )}

              <Table
                labels={{
                  title:
                    myStaked.length > 0 && availalbeFarms.length > 0
                      ? 'Available to stake'
                      : '',
                }}
                noBorder
              >
                {availalbeFarms.length > 0 && (
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Asset name</th>
                        <th>APY%</th>
                        <th>Total staked</th>
                        <th>My Stake</th>
                        <th>My earnings</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {availalbeFarms.map((farm) => (
                        <LPFarm
                          key={farm.symbol}
                          farm={farm}
                          dopPrice={state.dopPrice}
                          library={library}
                          isStaked={false}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
                {myStaked.length === 0 && availalbeFarms.length === 0 && (
                  <p className={`${styles.noFarms} center`}>
                    No Available Farming
                  </p>
                )}
              </Table>
            </div>
          )}
          {tab === 'stake_nft' && (
            <div className="full">
              {process.env.ENABLE_STAKING_NFT === 'false' ? 'Coming soon' : ''}
            </div>
          )}
        </div>
      </section>
      <Modal><MailchimpForm /></Modal>
    </>
  )
}
