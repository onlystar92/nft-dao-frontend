import { useState, useEffect } from 'react'
import Button from 'components/Button/Button'
import { scanLabels } from 'components/TxLoader/TxLoader'
import { getVestingInfo } from 'utils/library'
import { getEtherscan } from 'utils/links'
import styles from 'styles/Vesting.module.css'
import BigNumber from 'bignumber.js'
import useTicker, { getDuration } from 'hooks/useTicker'

const FETCH_TIME = 15
let poolTimer = null

export default function Vesting({ library, state, dispatch }) {
  const [now] = useTicker()

  const loadInfo = () => {
    getVestingInfo(library, dispatch)
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
  const handleClaim = () => {
    const { release } = library.methods.Vesting
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

  return state.vesting ? (
    <section className={`${styles.content} flex-all`}>
      <h1>DOP Token Vesting</h1>
      <table>
        <tbody>
          <tr>
            <td>Total Allocated:</td>
            <td>{new BigNumber(state.vesting[0]).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Released:</td>
            <td>{new BigNumber(state.vesting[1]).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Available to claim:</td>
            <td>{new BigNumber(state.vesting[2]).toFixed(2)}</td>
          </tr>
          <tr>
            <td>
              {state.vesting[3] > now ? 'Vesting starts in' : 'Vesting ends in'}
              :
            </td>
            <td>
              {getDuration(
                state.vesting[3] > now ? state.vesting[3] : now,
                state.vesting[3] > now ? now : state.vesting[4]
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="center">
              <Button
                disabled={claimTx || state.vesting[3] > now}
                onClick={handleClaim}
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
    </section>
  ) : (
    <div />
  )
}
