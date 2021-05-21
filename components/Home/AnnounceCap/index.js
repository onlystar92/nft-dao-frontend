import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getWalletAddressEllipsis } from 'utils/common'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { dopAddress } from 'utils/constants'

const AnnounceCap = () => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      let timer1 = setTimeout(() => setCopied(false), 5000)
      return () => {
        clearTimeout(timer1)
      }
    }
  }, [copied])

  return (
    <AnnounceCapWrapper>
      <div className="dop">
        <span>DOP: {getWalletAddressEllipsis(dopAddress)}</span>
        <CopyToClipboard text={dopAddress} onCopy={() => setCopied(true)}>
          <img src="/static/images/icons/copy.png" alt="" />
        </CopyToClipboard>
        {copied ? <span className="copied">Copied!</span> : null}
      </div>
      <div className="join-us">
        <span>Join Us:</span>
        <a
          className="social"
          href="https://twitter.com/dropsnft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="26"
            height="26"
            src="/static/images/social/twitter.png"
            alt=""
          />
        </a>
        <a
          className="social"
          href="https://t.me/drops_nft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="26"
            height="26"
            src="/static/images/social/telegram.png"
            alt=""
          />
        </a>
        <a
          className="social"
          href="https://discord.gg/FqZKAs6pmD"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="26"
            height="26"
            src="/static/images/social/discord.png"
            alt=""
          />
        </a>
      </div>
    </AnnounceCapWrapper>
  )
}

const AnnounceCapWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 54px;
  background: #051ca6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 0 60px;
  @media only screen and (max-width: 450px) {
    display: block;
    padding: 0.25rem 20px;
  }
  @media only screen and (min-width: 451px) and (max-width: 767px) {
    padding: 0 20px;
  }
  .join-us,
  .dop {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
  }

  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  .copied {
    margin-left: 10px;
  }
`

export default AnnounceCap
