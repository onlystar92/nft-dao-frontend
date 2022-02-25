import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/Button/Button'

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1000;
  color: white !important;
  .logo {
    cursor: pointer;
  }
  .navbar {  
    width: 100%;
    height: auto;
    display: flex;
    background: rgba(0, 0, 0, 0);
    padding: 52px 10vw 22px 10vw;
    justify-content: space-between;
  }
  .nav_item {
    display: inline-block;
    padding: 0 40px 8px 40px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    transition: 0.3s;
  }
  .hamburger {
    position: absolute;
    z-index: 1001;
    top: 65px;
    right: 10vw;
    display: none;
  }
  .hamburgo_menu {
    display: none;
    width: 300px;
    padding: 20px;
    text-align: center;
    background-color: white;
    color: #F933E3;
    border-radius: 10px;
    position: absolute;
    z-index: 999;
    right: 10vw;
    top: 80px;
    & > ul {
      list-style-type: none;
      padding-left: 0 !important;
      padding-right: 20px !important;
    }
    & > ul > li {
      padding: 5px !important;
      font-size: 18px;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .logo {
      width: 200px;
    }
    .nav_item {
      display: none;
    }
    .hamburger {
      display: block;
    }
    .hamburgo_menu {
      display: block;
    }
  }
  @media all and (max-width: 768px) {
    .logo {
      width: 120px;
    }
    .nav_item {
      display: none;
    }
    .hamburger {
      display: block;
      top: 50px;
    }
    .hamburgo_menu {
      display: block;
      width: 250px;
    }
  }
`
const Header = () => {
  const [status, setStatus] = useState(false);
 
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      if (document.querySelector(".navbar")) {
        document.querySelector(".navbar").style.background = "rgba(0, 0, 0, 0.7)";
        document.querySelector(".navbar").style.padding = "22px 10vw";
      }
      if (document.querySelector(".hamburger")) {
        document.querySelector(".hamburger").style.top = "40px";
      }
    } else {
      if (document.querySelector(".navbar")) {
        document.querySelector(".navbar").style.background = "rgba(0, 0, 0, 0)";
        document.querySelector(".navbar").style.padding = "42px 10vw 22px 10vw";
      }
      if (document.querySelector(".hamburger")) {
        document.querySelector(".hamburger").style.top = "50px";
      }
    }
  }

  useEffect(() => {
  }, [])
  
  return (
    <HeaderWrapper>
      <div className="navbar">
        <Link href="/">
          <img className="logo" src="/assets/home/logo.png" alt="logo" />
        </Link>
        <ul>
          <li className="nav_item">
            <Link href="/staking">
              Staking
            </Link>
          </li>
          <li className="nav_item">
            <Link href="/lending">
              Lending Pools
            </Link>
          </li>
        </ul>
        {status == true &&
        <div className="hamburgo_menu"> 
          <ul>
            <li>
              <Link href="/staking">
              Staking
              </Link>
            </li>
            <li>
              <Link href="/lending">
              Lending Pools
              </Link>
            </li>
          </ul>
        </div>
        }
      </div>
      <a 
         onClick={() => {
          status == false ?
          setStatus(true) : setStatus(false)
        }}
      ><img src="/assets/home/hamburgo.png" className="hamburger" /></a>
    </HeaderWrapper>
  )
}

export default Header
