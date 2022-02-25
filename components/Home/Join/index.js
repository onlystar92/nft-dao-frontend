import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

const JoinWrapper = styled.div`
  width: 100%;
  padding: 300px 0 280px 0;
  margin-bottom: 50px;
  background-image: url('/assets/home/join_bg.png');
  background-size: cover;
  background-position: center;
  font-family: 'Montserrat';
  .title_img {
    width: 100%;
    display: flex;
    & > img {
      width: 640px;
      align-self: center;
      margin: auto;
    }
  }
  .title {
    font-weight: 700;
    font-family: 'lilgrotesk';
    font-size: 56px;
    line-height: 64px;
    color: white;
    margin-top: 20px;
    text-align: center;
  }
  .social {
    display: flex;
    flex-direction: row;
    width: 220px;
    justify-content: space-between;
    margin: 50px auto;
    & > a > div {
      width: 80px;
      height: 80px;
      border: 4px white solid;
      border-radius: 50px;
      display: flex;
      cursor: pointer;
      &:hover {
        background-color: grey;
      }
    }
  }
  img {
    align-self: center;
    margin: auto;
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .title_img {
      & > img {
        width: 540px;
      }
    }
    .title {
      font-size: 48px;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .title_img {
      & > img {
        width: 520px;
      }
    }
    .title {
      font-size: 40px;
      line-height: 45px;
    }
  }
  @media all and (max-width: 768px) {
    background-image: url('/assets/home/join_bg_mobile.png');
    padding: 60px 0 360px 0;
    .title_img {
      & > img {
        width: 65%;
      }
    }
    .title {
      font-size: 30px;
      line-height: 32px;
    }
    .social {
      display: flex;
      flex-direction: row;
      width: 120px;
      justify-content: space-between;
      margin: 50px auto;
      & > a > div {
        width: 50px;
        height: 50px;
        border: 3px white solid;
        border-radius: 50px;
        display: flex;
      }
      img {
        width: 24px;
      }
    }
  }
  
`

const Join = () => {
  return (
    <JoinWrapper>
      <h2 className="title">JOIN DROPS FAM</h2>
      {/* <div className="title_img">
        <img src="assets/home/text/join_title.png" />
      </div> */}
      <div className="social">
        <a
          href="https://twitter.com/dropsnft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="twitter">
            <img src="assets/home/twitter.png" />
          </div>
        </a>
        <a
          href="https://discord.gg/FqZKAs6pmD"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="discord">
            <img src="assets/home/discord.png" />
          </div>
        </a>
      </div>
    </JoinWrapper>
  )
}

export default Join
