import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/Home/Button/Button'

const MoneyWrapper = styled.div`
  width: 100%;
  margin-bottom: 150px;
  background-color: #030921 !important;
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat';
  img {
    width: 45%;
  }
  .content_area {
    width: 50%;
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
    font-size: 25px;
    line-height: 32px;
    color: white;
    margin-top: 20px;
  }
  .title {
    font-weight: 700;
    font-family: 'lilgrotesk';
    font-size: 56px;
    line-height: 64px;
    color: white;
    margin-top: 20px;
  }
  .organ {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      width: 26%;
      height: auto;
    }
    margin: 30px 0 60px 0;
  }
  .btn_div {
    width: 100%;
    display: flex;
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .subtitle {
      font-size: 22px;
    }
    .title {
      font-size: 48px;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: column;
    .title_img {
      & > img {
        width: 100%;
      }
    }
    img, .content_area {
      width: 70%;
      margin: auto;
    }
    .title {
      font-size: 40px;
      line-height: 45px;
    }
    .organ {
      width: 100%;
    }
    .btn {
      margin: auto;
    }
  }
  @media all and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 50px;
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
    }
    .title {
      font-size: 30px;
      line-height: 32px;
    }
    .organ {
      width: 100%;
    }
    .btn {
      margin: auto;
    }
  }
  
`

const Slide = () => {
  return (
    <MoneyWrapper className="wraped">
      <img src="assets/home/Money.png"></img>
      <div className="content_area">
        {/* <p className="title">EARN YIELD WITH NFTS</p> */}
        <div className="title_img">
          <img src="assets/home/text/earn_title.png" />
        </div>
        <p className="subtitle">Earn DOP by obtaining a loan and stake your stablecoins at yield farms to make your NFT go brrrr.</p>
        <p className="subtitle pink">Park your stables at:</p>
        <div className="organ">
          <img src="assets/home/FoDL.png"></img>
          <img src="assets/home/pickle.png"></img>
          <img src="assets/home/Convex.png"></img>
        </div>
        <div className="btn_div">
          <a className="btn" href="/lending">
            <Button>Launch App</Button>
          </a>
        </div>
      </div>
    </MoneyWrapper>
  )
}

export default Slide
