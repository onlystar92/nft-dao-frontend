import React, { useState, useEffect } from 'react'
// import { useLocation } from "react-router";
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Collapse } from 'react-collapse'
import styles from './Header.module.css'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 96px;
  align-items: center;
  background: #fff;
  justify-content: space-between;

  .logo-wrapper {
    display: flex;
    padding-left: 60px;

    .logo {
      height: 40px;
    }

    .icon-btn {
      display: none;
    }

    @media screen and (max-width: 767px) {
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      width: 100%;

      .icon-btn {
        display: block;
      }
    }
  }

  .wallet-wrapper {
    display: flex;
    align-items: center;
    padding-right: 60px;
    border-left: 1px solid #b7b7d6;
    height: 68px;
    padding-left: 30px;

    @media screen and (max-width: 767px) {
      display: none;
    }

    .wallet-balance {
      font-size: 14px;
      font-weight: 600;
      opacity: 0.4;
    }

    .wallet-info {
      font-size: 1rem;
      font-weight: 400;
      margin-left: 30px;
      cursor: pointer;
      width: 100px;

      &:hover {
        font-weight: 600;
      }
    }
  }

  .menu-wrapper {
    flex: 1;

    @media screen and (max-width: 767px) {
      display: none;
    }

    .menu-nav {
      display: flex;
      justify-content: center;

      &-item {
        list-style-type: none;
        width: 150px;
        text-align: center;
      }

      &-link {
        text-decoration: none;
        font-size: 1rem;
        color: #282b49;

        &:hover {
          font-weight: 700;
        }
      }
    }
  }
`

const Header = () => {
  // const location = useLocation();
  // const getCurrentUrl = (location) => {
  //   return location.pathname.split(/[?#]/)[0];
  // };

  // const checkIsActive = (location, url) => {
  //   const current = getCurrentUrl(location);

  //   if (!current || !url) {
  //     return false;
  //   }

  //   if (current === url || (current === "/" && url === "home")) {
  //     return true;
  //   }

  //   return current.indexOf(url) > -1;
  // };

  // const getMenuItemActive = (url) => {
  //   return checkIsActive(location, url) ? "active" : "";
  // };

  // const getMenuName = () => {
  //   if (getMenuItemActive("home")) {
  //     return "Home";
  //   }

  //   if (getMenuItemActive("stake")) {
  //     return "Stake";
  //   }

  //   if (getMenuItemActive("get-heroes")) {
  //     return "Get Cards";
  //   }

  //   if (getMenuItemActive("farm")) {
  //     return "Farm";
  //   }

  //   if (getMenuItemActive("fight-villains")) {
  //     return "Fight Villains";
  //   }

  //   return "";
  // };

  const router = useRouter()
  const [isCollapse, setIsCollapse] = useState(false)

  useEffect(() => {
    setIsCollapse(false)
  }, [router])

  return (
    <HeaderWrapper>
      <div className="logo-wrapper">
        {/* <img className="icon-btn" src="/static/images/icons/burger.png" alt="burger" /> */}
        <img className="logo" src="/static/images/logo/logo.png" alt="logo" />
        {/* <img className="icon-btn" src="/static/images/icons/wallet.png" alt="wallet" /> */}
      </div>
      {/* <div className="menu-wrapper">
        <ul className="menu-nav">
          <li className="menu-nav-item">
            <NavLink to="" className="menu-nav-link">HOME</NavLink>
          </li>
          <li className="menu-nav-item">
            <NavLink to="" className="menu-nav-link">STAKE & EARN</NavLink>
          </li>
          <li className="menu-nav-item">
            <NavLink to="" className="menu-nav-link">DROPS</NavLink>
          </li>
        </ul>
      </div>
      <div className="wallet-wrapper">
        <div className="wallet-balance">
          <div>ETH: 20</div>
          <div>dPoints: 1000</div>
        </div>
        <div className="wallet-info">MY WALLET</div>
      </div> */}
      <div className="flex-center">
        <div className={`flex ${styles.menu}`}>
          {/* <Link href="/">
            <div
              className={
                router.pathname === '/' ? styles.activeMenu : ''
              }
            >
              Home
            </div>
          </Link> */}
          <Link href="/staking">
            <div
              className={
                router.pathname === '/staking' ? styles.activeMenu : ''
              }
            >
              Staking
            </div>
          </Link>
          <Link href="/loans">
            <div
              className={router.pathname === '/loans' ? styles.activeMenu : ''}
            >
              Loans
            </div>
          </Link>
          <Link href="/vesting">
            <div
              className={
                router.pathname === '/vesting' ? styles.activeMenu : ''
              }
            >
              Vesting
            </div>
          </Link>
          {/* <Link href="/swaps">
            <div
              className={
                router.pathname === '/swaps' ? styles.activeMenu : ''
              }
            >
              Swap NFT
          </div>
          </Link>
          <Link href="/drops">
            <div
              className={
                router.pathname === '/drops' ? styles.activeMenu : ''
              }
            >
              Drops
          </div>
          </Link> */}
        </div>
        <div className={styles.mobileMenu}>
          <div className={styles.collapseContent} id="collapse-content">
            <Collapse isOpened={isCollapse}>
              <div className={`${styles.menuContent} flex-all`}>
                {/* <Link href="/">
                  <div
                    className={
                      router.pathname === '/' ? styles.activeMenu : ''
                    }
                  >
                    Home
                  </div>
                </Link> */}
                <Link href="/staking">
                  <div
                    className={
                      router.pathname === '/staking' ? styles.activeMenu : ''
                    }
                  >
                    Staking
                  </div>
                </Link>
                <Link href="/loans">
                  <div
                    className={
                      router.pathname === '/loans' ? styles.activeMenu : ''
                    }
                  >
                    Loans
                  </div>
                </Link>
                <Link href="/vesting">
                  <div
                    className={
                      router.pathname === '/vesting' ? styles.activeMenu : ''
                    }
                  >
                    Vesting
                  </div>
                </Link>
                {/* <Link href="/app">
                  <div
                    className={
                      router.pathname === '/swaps'
                        ? styles.activeMenu
                        : ''
                    }
                  >
                    Swap NFT
                </div>
                </Link>
                <Link href="/drops">
                  <div
                    className={
                      router.pathname === '/drops'
                        ? styles.activeMenu
                        : ''
                    }
                  >
                    Drops
                </div>
                </Link> */}
              </div>
            </Collapse>
          </div>
        </div>
        <img
          src="/assets/menu.svg"
          className={`${styles.hamburger} cursor`}
          alt="menu"
          onClick={() => setIsCollapse(!isCollapse)}
        />
      </div>
    </HeaderWrapper>
  )
}

export default Header
