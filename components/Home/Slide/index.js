import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/Home/Button/Button'

const SlideWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  padding-top: 180px;
  background-color: #030921 !important;
  display: flex;
  flex-direction: row;
  height: auto;
  background: #fff;
  justify-content: space-between;
  font-family: 'Montserrat';
  .subtitle {
    width: 70%;
    font-weight: 700;
    font-size: 25px;
    line-height: 32px;
    color: white;
    margin-top: 20px;
  }
  .title_img {
    width: 100%;
    & > img {
      width: 100%;
    }
  }
  .title {
    font-weight: 700;
    font-family: 'lilgrotesk';
    font-size: 56px;
    line-height: 64px;
    color: white;
    margin-top: 20px;
  }
  .market {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #F80077;
    margin: 40px 0;
  }
  .content_area {
    width: 60%;
    padding: 2vw;
  }
  .main_img {
    width: 60%;
    margin-left: -10%;
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
    flex-direction: column-reverse;
    padding-top: 100px;
    .main_img, .content_area {
      width: 70%;
      margin: auto;
    }
    .title {
      font-size: 40px;
      line-height: 45px;
    }
    .subtitle {
      width: 100%;
    }
  }
  @media all and (max-width: 768px) {
    flex-direction: column-reverse;
    padding-top: 70px;
    .market {
      margin: 20px 0;
      text-align: center;
      font-size: 28px;
      line-height: 32px;
    }
    .main_img {
      width: 67%;
      margin: auto;
    }
    .content_area {
      width: 90%;
      margin: auto;
    }
    .subtitle {
      width: 90%;
      font-size: 18px;
      line-height: 25px;
    }
    .title {
      font-size: 30px;
      line-height: 32px;
    }
    .launch_btn {
      margin: auto;
    } 
  }
  
`

const Slide = () => {
  const [status, setStatus] = useState({ totalSupply : 0 });

  const getStatus = async() => {
    const res = await fetch('https://drops.co/status');
    const data = await res.json();
    setStatus(data);
  }
  
  useEffect(() => {
    getStatus();
  }, [])
  
  return (
    <SlideWrapper className="limited">
      <div className="content_area">
        {/* <p className="title">INSTANT LOANS FOR JPEG, NFT AND METAVERSE ASSETS</p> */}
        <div className="title_img">
          <img src="assets/home/text/slide_title.png" />
        </div>
        <p className="subtitle">Use NFTs as collateral to obtain loans through lending pools.</p>
        {/* <p className="market">Market size:<br /> $5,000,000</p> */}
        <p className="market">Loans market:<br /> ${new BigNumber(status.totalSupply || 0).toFormat(0)}</p>
        <div className="btn_div">
          <a className="launch_btn" href="/loans">
            <Button>Launch App</Button>
          </a>
        </div>
      </div>
      <img className="main_img" src="assets/home/slide.png"></img>
    </SlideWrapper>
  )
}

export default Slide
