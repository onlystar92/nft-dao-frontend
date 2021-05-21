import { useState, useEffect } from 'react'
import Button from 'components/Button/Button'
import { scanLabels } from 'components/TxLoader/TxLoader'
import { getVestings } from 'utils/library'
import { getEtherscan } from 'utils/links'
import styles from 'styles/Vesting.module.css'
import BigNumber from 'bignumber.js'
import useTicker, { getDuration } from 'hooks/useTicker'

const FETCH_TIME = 15
let poolTimer = null

const VESTING_LABELS = {
  0: 'Private Sale',
  1: 'Advisory',
  2: 'Team/Foundation'
}

export default function Vesting({ library, state, dispatch }) {
  const [now] = useTicker()
  const myVestings = state.vesting ? state.vesting.filter((v) => v[0] > 0) : []

  const loadInfo = () => {
    getVestings(library, dispatch)
  }

  useEffect(() => {
    if (library && state.account.address) {
      if (poolTimer) clearInterval(poolTimer)
      poolTimer = setInterval(loadInfo, FETCH_TIME * 1000)
      loadInfo()
    }
    return () => poolTimer && clearInterval(poolTimer)
  }, [library, state.account.address])

  const [claimTx, setClaimTx] = useState('')
  const handleClaim = (id) => {
    const { release } = library.methods.Vesting[id]
    release({ from: state.account.address })
      .send()
      .on('transactionHash', function (hash) {
        setClaimTx(hash)
      })
      .on('receipt', function () {
        loadInfo()
      })
      .on('error', (err) => {
        console.log('claim', err)
        setClaimTx('')
      })
  }

  if (myVestings.length === 0) {
    return (
      <section className={`${styles.content} flex-all`}>No Vesting</section>
    )
  }

  return (
    <section className={`${styles.content}`}>
      {myVestings.map((vest, idx) => (
        <div className={`${styles.vestingContent}`} key={idx}>
          <h1>DOP Token Vesting</h1>
          {myVestings.length > 1 && (
            <h3>{VESTING_LABELS[vest[5]]}</h3>
          )}
          <table>
            <tbody>
              <tr>
                <td>Total Allocated:</td>
                <td>{new BigNumber(vest[0]).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Total Released:</td>
                <td>{new BigNumber(vest[1]).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Available to claim:</td>
                <td>{new BigNumber(vest[2]).toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  {vest[3] > now ? 'Vesting starts in' : 'Vesting ends in'}:
                </td>
                <td>
                  {getDuration(
                    now,
                    vest[3] > now ? vest[3] : vest[4]
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="center">
                  <Button
                    disabled={claimTx || vest[3] > now}
                    onClick={() => handleClaim(vest[5])}
                  >
                    Claim
                  </Button>
                </td>
              </tr>
              {claimTx && (
                <tr>
                  <td colSpan={2} className="center">
                    <a
                      href={getEtherscan(claimTx, state.account.network)}
                      target="_blank"
                    >
                      View on {scanLabels[state.account.network] || 'Etherscan'}
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  )
}
