import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/Home/Button/Button'

const HowWorksWrapper = styled.div`
  width: 100%;
  background-color: #030921 !important;
  height: auto;
  font-family: 'Montserrat';
  position: relative;
  margin-bottom: 100px;
  .content_area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 999;
    justify-content: space-around;
    margin: 30px 0 50px 0;
  }
  .item {
    width: 38%;
    height: auto;
    margin: 40px 0;
    position: relative;
    img {
      width: 100%;
      height: auto;
      z-index: 999;
    }
  }
  .content {
    width: 80%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: white;
  }
  .btn_div {
    width: 100%;
    display: flex;
  }
  .btn {
    margin: auto !important;
  }
  .card_img {
    position: relative;
    z-index: 999;
  }
  .subtitle {
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: white;
    margin: 15px 0 25px 0;
  }
  .title_img {
    width: 100%;
    display: flex;
    margin: 60px 0;
    & > img {
      width: 36%;
      align-self: center;
      margin: auto;
    }
  }
  .title {
    width: 40%;
    font-family: 'lilgrotesk';
    font-weight: 700;
    font-size: 56px;
    line-height: 64px;
    color: white;
    text-align: center;
    margin: 50px auto;
  }
  .e1, .e2, .e3, .e4 {
    position: absolute;
    z-index: 0 !important;
  }
  .e1-mobile, .e2-mobile, .e3-mobile, .e4-mobile {
    position: absolute;
    width: 100px !important;
    display: none;
    z-index: 0 !important;
  }
  .e1 {
    top: 180px;
    left: 0;
  }
  .e2 {
    top: 180px;
    right: 0;
  }
  .e3 {
    bottom: 220px;
    left: 0;
  }
  .e4 {
    bottom: 160px;
    right: 0;
  }
  .e1-mobile {
    top: -20px;
    right: 0;
  }
  .e2-mobile {
    top: -20px;
    left: 0;
  }
  .e3-mobile {
    top: -20px;
    right: 0;
  }
  .e4-mobile {
    top: -20px;
    left: 0;
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .subtitle {
      font-size: 30px;
    }
    .title {
      font-size: 48px;
    }
    .content {
      width: 100%;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .title_img {
      & > img {
        width: 48%;
      }
    }
    .title {
      font-size: 40px;
      line-height: 45px;
    }
    .item {
      width: 80%;
      padding: 50px 50px 0 50px;
      height: auto;
      margin: 0 0 40px 0;
    }
    .content {
      width: 90%;
    }
    .e1, .e2, .e3, .e4 {
      display: none;
    }
    .e1-mobile, .e2-mobile, .e3-mobile, .e4-mobile {
      display: block;
      width: 160px !important;
    }
    .e1-mobile {
      top: -40px;
      right: -30px;
    }
    .e2-mobile {
      top: -40px;
      left: -30px;
    }
    .e3-mobile {
      top: -40px;
      right: -30px;
    }
    .e4-mobile {
      top: -40px;
      left: -30px;
    }
  }
  @media (min-width: 486px) and (max-width: 768px) {
    .title_img {
      margin-top: 50px !important; 
      & > img {
        width: 60% !important;
      }
    }
  }
  @media all and (max-width: 768px) {
    .title_img {
      margin: 0;
      & > img {
        width: 75%;
      }
    }
    .subtitle {
      font-size: 25px;
    }
    .title {
      width: 80%;
      font-size: 30px;
      line-height: 32px;
    }
    .item {
      width: 100%;
      padding: 10% 10% 0 10%;
      height: auto;
      margin: 0 0 40px 0;
    }
    .content {
      font-size: 16px;
      width: 100%;
    }
    .e1, .e2, .e3, .e4 {
      display: none;
    }
    .e1-mobile, .e2-mobile, .e3-mobile, .e4-mobile {
      display: block;
    }
  }
  
`

const HowItWorks = () => {
  return (
    <HowWorksWrapper className="wraped">
      {/* <p className="title">HOW DO NFT LOANS WORK?</p> */}
      <div className="title_img">
        <img src="assets/home/text/howWorks_title.png" />
      </div>
      <div className="content_area">
        <div className="item">
          <div className="card_img">
            <img src="assets/home/NFT1.png" />
          </div>
          <p className="subtitle">Select lending pool</p>
          <p className="content">Choose an existing lending pool that accepts your NFT.</p>
          <img className="e1-mobile" src="assets/home/e1.png" />
        </div>
        <div className="item">
          <div className="card_img">
            <img src="assets/home/NFT2.png" />
          </div>
          <p className="subtitle">Supply NFT as collateral</p>
          <p className="content">Collateral value is determined by the NFT Floor TWAP oracle.</p>
          <img className="e2-mobile" src="assets/home/e2.png" />
        </div>
        <div className="item">
          <div className="card_img">
            <img src="assets/home/NFT3.png" />
          </div>
          <p className="subtitle">Borrow against NFT</p>
          <p className="content">Instantly borrow up to 30% of the NFT collateral value.</p>
          <img className="e3-mobile" src="assets/home/e3.png" />
        </div>
        <div className="item">
          <div className="card_img">
            <img src="assets/home/NFT4.png" />
          </div>
          <p className="subtitle">Manage your credit</p>
          <p className="content">Don’t exceed your borrow limit to avoid NFT liquidation.</p>
          <img className="e4-mobile" src="assets/home/e4.png" />
        </div>
      </div>
      <div className="btn_div">
        <a className="btn" href="/loans">
          <Button>Launch App</Button>
        </a>
      </div>
      <img className="e1" src="assets/home/e1.png" />
      <img className="e2" src="assets/home/e2.png" />
      <img className="e3" src="assets/home/e3.png" />
      <img className="e4" src="assets/home/e4.png" />
    </HowWorksWrapper>
  )
}

export default HowItWorks
