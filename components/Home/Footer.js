import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SubscribeButton from 'components/Mailchimp/ui/SubscribeButton/SubscribeButton'

const FooterWrapper = styled.div`
  padding: 64px var(--padding-normal);
  background-color: var(--color-black);
  .logo {
    height: 24px;
  }
  .linkWrapper a {
    outline: none;
  }
  .linkWrapper div {
    cursor: pointer;
    color: var(--color-white);
    margin-right: var(--padding-normal);
  }
  .linkWrapper div:hover,
  .linkWrapper a:hover,
  .activeMenu {
    text-shadow: 0px 0px 1px;
  }
  .socials {
    display: flex;
    width: 280px;
    flex-direction: column;
  }
  
  .socials_network {
    display: flex;
    align-items: center;
    flex-direction: row !important;
  }
  
  .socials_network a {
    cursor: pointer;
    margin: 16px 10px;
  }
  @media screen and (max-width: 1267px) {
    & > .limited {
      flex-direction: column;
      align-items: flex-start;
    }
    padding: 28px var(--padding-normal);
    .linkWrapper {
      margin: 38px 0px;
    }
  }
  @media all and (max-width: 992px) {
    .menu div {
      cursor: pointer;
      margin-right: var(--padding-narrow);
    }
    .linkWrapper {
      flex-direction: column;
      align-items: flex-start !important;
    }
    .linkWrapper div:not(:last-child) {
      margin-bottom: var(--padding-normal);
    }
  }
`

const Footer = () => {
  const router = useRouter()
  return (
    <FooterWrapper>
      <div className="flex-center justify-between limited">
        <Link href="/">
          <img
            className={`logo cursor`}
            src="/logo_white.png"
            alt="Drops Loans"
          />
        </Link>
        <div className={`flex-center linkWrapper`}>
          <Link href="/staking">
            <div
              className={
                router.pathname === '/staking' ? styles.activeMenu : ''
              }
            >
              Staking
            </div>
          </Link>
          <Link href="/lending">
            <div
              className={
                router.pathname === '/lending' ? styles.activeMenu : ''
              }
            >
              Lending Pools
            </div>
          </Link>
          <a
            href="https://docs.drops.co"
            target="_blank"
          >
            <div
              className={router.pathname === 'https://docs.drops.co' ? styles.activeMenu : ''}
            >
              Docs
            </div>          
          </a>
        </div>
        <div className={`socials`}>
          <div className={`socials_network`}>
            <a
              href="https://twitter.com/dropsnft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/socials/twitter.svg" alt="twitter" />
            </a>
            <a
              href="https://t.me/drops_nft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/socials/telegram.svg" alt="telegram" />
            </a>
            <a
              href="https://discord.gg/FqZKAs6pmD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/socials/discord.svg" alt="discord" />
            </a>
            <a href="/" target="_blank">
              <img src="/assets/socials/medium.svg" alt="medium" />
            </a>
          </div>
          {/* <SubscribeButton /> */}
        </div>
      </div>
    </FooterWrapper>
  )
}

export default Footer