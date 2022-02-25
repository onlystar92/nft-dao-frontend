import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/Home/Button/Button'

const UsWrapper = styled.div`
  width: 100%;
  margin-bottom: 125px;
  padding-top: 200px;
  background-color: #030921 !important;
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat';
  img {
    width: 50%;
  }
  .content_area {
    width: 48%;
    padding: 3vw 3vw 0 3vw;
  }
  .pink {
    color: #F80077 !important;
  }
  .title_img {
    width: 80%;
    margin-top: 50px;
    & > img {
      width: 100%;
    }
  }
  .subtitle {
    font-weight: 700;
    font-size: 23px;
    line-height: 32px;
    color: white;
    margin-top: 20px;
  }
  .title {
    font-weight: 700;
    font-family: 'lilgrotesk';
    font-size: 72px;
    line-height: 64px;
    color: white;
    margin-top: 20px;
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .subtitle {
      font-size: 20px;
    }
    .title {
      font-size: 60px;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: column;
    padding-top: 130px;
    .title_img {
      & > img {
        width: 100%;
      }
    }
    img, .content_area {
      width: 70%;
      margin: auto;
    }
    .subtitle {
      text-align: center;
    }
    .title {
      font-size: 56px;
      line-height: 45px;
      text-align: center;
    }
  }
  @media all and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 50px;
    padding-top: 100px;
    .title_img {
      margin: auto;
    }
    img {
      width: 90%;
      margin: auto;
    }
    .content_area {
      width: 90%;
      margin: auto;
    }
    .subtitle {
      font-size: 18px;
      line-height: 25px;
      margin-top: 30px;
      text-align: center;
    }
    .title {
      font-size: 48px;
      line-height: 32px;
      text-align: center;
    }
  }
  
`

const Us = () => {
  return (
    <UsWrapper className="wraped">
      <img src="/assets/about/about.png"></img>
      <div className="content_area">
        <h2 className="title">ABOUT US</h2>
        <p className="subtitle">Drops DAO is a DeFi lending platform allowing users to leverage their NFTs and digital assets as collateral to seamlessly borrow crypto via lending pools. We’re building permissionless, trustless, and multi-chain infrastructure needed to help drive metaverse financet forward, taking NFTs to the next level beyond artwork. We aspire to empower users across the metaverse to easily and conveniently access on-chain liquidity, paving the way forward in the NFT x DeFi field.</p>
      </div>
    </UsWrapper>
  )
}

export default Us
