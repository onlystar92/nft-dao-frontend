import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

const FooterWrapper = styled.div`
  width: 100%;
  background-color: #030921 !important;
  padding: 200px 0 80px 0;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  .sublink {
    width: 400px;
    margin: auto;
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: space-between;
    .link:hover {
      cursor: pointer;
      color: grey;
    }
  }
  .socials {
    width: 270px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 70px auto;
    & > a > div {
      width: 45px;
      height: 45px;
      border: 2px white solid;
      border-radius: 50px;
      display: flex;
      cursor: pointer;
      &:hover {
        background-color: grey;
      }
      & > img {
        height: 21px;
        align-self: center;
        margin: auto; 
      }
    }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
   
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    
  }
  @media all and (max-width: 768px) {
    font-size: 18px;
    padding: 150px 0 30px 0;
    .sublink {
      width: 300px;
      flex-direction: column;
      .link {
        text-align: center;
        margin: 17px 0;
      }
    }
  }
  
`

const Footer = () => {
  const router = useRouter()
  return (
    <FooterWrapper>
      <div className="sublink">
        {/* <a 
          href="https://blog.drops.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link">
            Blog
          </div>
        </a> */}
        <Link href="/vesting">
          <div className="link">Vesting</div>
        </Link>
        <Link href="/">
          <div className="link">Terms of Use</div>
        </Link>
        <Link href="/">
          <div className="link">Privacy policy</div>
        </Link>
      </div>
      <div className="socials">
        <a
          href="https://discord.gg/FqZKAs6pmD"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <img src="assets/home/socials/discord.png" />
          </div>
        </a>
        <a
          href="https://twitter.com/dropsnft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <img src="assets/home/socials/twitter.png" />
          </div>
        </a>
        <a
          href="https://t.me/drops_nft"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <img src="assets/home/socials/telegram.png" />
          </div>
        </a>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <img src="assets/home/socials/medium.png" />
          </div>
        </a>
      </div>
    </FooterWrapper>
  )
}

export default Footer
