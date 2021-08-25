import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/Button/Button'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 72px;
  align-items: center;
  background: #fff;
  justify-content: space-between;

  .logo-wrapper {
    display: flex;

    .logo {
      height: 40px;
    }

    @media screen and (max-width: 767px) {
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  button {
    width: 156px;
    height: 56px;
    background: var(--color-black1);
    border-radius: 8px;
    font-weight: 500;
    font-size: 20px;
    color: var(--color-white);
    letter-spacing: -0.02em;

    @media screen and (max-width: 576px) {
      display: none;
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
    <HeaderWrapper className="limited">
      <div className="logo-wrapper">
        <img className="logo" src="/static/images/logo/logo.png" alt="logo" />
      </div>
      <div className="flex-center">
        <Link href="/loans">
          <Button>Launch app</Button>
        </Link>
      </div>
    </HeaderWrapper>
  )
}

export default Header
