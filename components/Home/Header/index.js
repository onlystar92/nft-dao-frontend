import React, { useState, useEffect } from 'react'
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
  const router = useRouter()
  const [isCollapse, setIsCollapse] = useState(false)

  useEffect(() => {
    setIsCollapse(false)
  }, [router])

  return (
    <HeaderWrapper>
      <div className="logo-wrapper">
        <img className="logo" src="/static/images/logo/logo.png" alt="logo" />
      </div>
      <div className="flex-center">
        <div className={`flex ${styles.menu}`}>
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
        </div>
        <div className={styles.mobileMenu}>
          <div className={styles.collapseContent} id="collapse-content">
            <Collapse isOpened={isCollapse}>
              <div className={`${styles.menuContent} flex-all`}>
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
