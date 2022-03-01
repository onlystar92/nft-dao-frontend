import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PartnersWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  background-color: #030921 !important;
  padding: 100px 0 250px 0;
  position: relative;
  .title_img {
    width: 100%;
    display: flex;
    margin: 80px 0;
    & > img {
      width: 28%;
      align-self: center;
      margin: auto;
    }
  }
  .title {
    font-weight: 700;
    color: white;
    font-family: 'Luxfont';
    font-size: 64px;
    text-align: center;
    margin: 70px 0;
  }
  .content_area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 999;
    justify-content: space-around;
    img {
      margin: 30px;
      height: 54px;
    }
  }
  .leftArm, .rightArm, .tv, .group, .leftArm-mobile, .rightArm-mobile, .tv-mobile {
    position: absolute;
    z-index: 0;
  }
  .leftArm-mobile, .rightArm-mobile, .tv-mobile {
    display: none;
  }
  .leftArm {
    width: 25vw;
    top: 60px;
    left: 0;
  }
  .leftArm-mobile {
    width: 40%;
    top: 0;
    left: 0;
  }
  .rightArm {
    width: 25vw;
    right: 0;
    bottom: 0;
  }
  .rightArm-mobile {
    width: 40%;
    right: 0;
    top: 0;
  }
  .group {
    width: 30vw;
    left: 0;
    bottom: 0;
  }
  .tv {
    width: 15vw;
    top: -50px;
    right: 8vw;
  }
  .tv-mobile {
    width: 36%;
    bottom: 0;
    transform: translate(90%, 0);
  }
  @media all and (max-width: 1500px) {
    .tv {
      top: 1vw;
    }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    padding: 100px 0 180px 0;
    .title_img {
      margin: 50px 0;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 100px 0 150px 0;
    .title_img {
      margin: 30px 0 40px 0;
      & > img {
        width: 35%;
      }
    }
    .title {
      font-size: 56px;
      margin: 50px 0 40px 0;
    }
  }
  @media (min-width: 564px) and (max-width: 768px) {
    .title_img {
      margin: 70px 0 20px 0 !important; 
    }
  }
  @media all and (max-width: 768px) {
    padding-bottom: 42vw;
    .title_img {
      margin: 30px 0 20px 0;
      & > img {
        width: 65%;
      }
    }
    .title {
      font-size: 48px;
      margin: 40px 0 30px 0;
    }
    .leftArm, .rightArm, .tv, .group {
      display: none;
    }
    .leftArm-mobile, .rightArm-mobile, .tv-mobile {
      display: block;
    }
  }
  
`

const Partners = () => {
  return (
    <PartnersWrapper>
      <h2 className="title">PARTNERS</h2>
      {/* <div className="title_img">
        <img src="assets/home/text/partner_title.png" />
      </div> */}
      <div className="content_area limited">
        <img src="assets/home/partners/fodl.png" />
        <img src="assets/home/partners/enjin.png" />
        <img src="assets/home/partners/polygon.png" />
        <img src="assets/home/partners/peckshield.png" />
        <img src="assets/home/partners/bga.png" />
        <img src="assets/home/partners/charged.png" />
        <img src="assets/home/partners/debridge.png" />
        <img src="assets/home/partners/parsiq.png" />
        <img src="assets/home/partners/solv.png" />
      </div>
      <img className="leftArm" src="assets/home/leftArm.png" />
      <img className="rightArm" src="assets/home/rightArm.png" />
      <img className="leftArm-mobile" src="assets/home/leftArm.png" />
      <img className="rightArm-mobile" src="assets/home/rightArm.png" />
      <img className="tv-mobile" src="assets/home/tv.png" />
      <img className="tv" src="assets/home/tv.png" />
      <img className="group" src="assets/home/group.png" />
    </PartnersWrapper>
  )
}

export default Partners
