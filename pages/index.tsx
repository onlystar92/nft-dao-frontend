import Link from 'next/link'
import styles from 'styles/Home.module.css'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import AnnounceCap from 'components/Home/AnnounceCap'
import Header from 'components/Home/Header'
import HowItWorks from 'components/Home/HowItWorks'
import MoreUtility from 'components/Home/MoreUtility'
import SupportNFTs from 'components/Home/SupportNFTs'
import TeamMember from 'components/Home/TeamMember'
import Footer from 'components/Home/Footer'
import {
  dataHowItWorks,
  dataMoreNFTs,
  dataSupportNFTS,
  dataTeam,
  dataInvestor,
  dataPartner,
} from 'helpers/dummy'
import { useEffect } from 'react'

const Section = styled.div`
  &.limited {
    max-width: 1440px;
  }

  &.section-1 {
    position: relative;
    min-height: 600px;
    background: url("/static/images/bg/bg-1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    padding: 64px 64px 0px;

    .title {
      max-width: 620px;
      font-weight: bold;
      font-size: 80px;
      color: var(--color-white);
      letter-spacing: -0.04em;
      margin: 0;
      z-index: 1;

      @media screen and (max-width: 1024px) {
        font-size: 64px;
      }
      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    p {
      font-weight: bold;
      font-size: 40px;
      letter-spacing: -0.04em;
      color: var(--color-gold);
      margin-top: 40px;
      margin-bottom; 64px;
      z-index: 1;

      @media screen and (max-width: 768px) {
        font-size: 32px;
      }
      @media screen and (max-width: 360px) {
        font-size: 24px;
      }
    }

    button {
      width: 208px;
      height: 80px;
      background: var(--color-white);
      border-radius: 8px;
      font-weight: bold;
      font-size: 24px;
      letter-spacing: -0.04em;
      color: var(--color-black);
      z-index: 1;
    }
  }

  &.section-2 {
    position: relative;
    @media screen and (max-width: 360px) {
      display: none;
    }
    &::before {
      content: ' ';
      position: absolute;
      background: url(/static/images/bg/bg-3.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 100%;
      height: 125px;
      top: -45px;
      left: 0;
    }

    .scroll-down {
      z-index: 1;
      margin-top: 0px;
      margin-right: 80px;

      @media screen and (max-width: 1280px) {
        margin-right: 40px;
      }
      @media screen and (max-width: 1024px) {
        margin-right: 10px;
      }
      @media screen and (max-width: 768px) {
        margin-top: -14px;
      }
      img {
        margin-right: 17px;
        @media screen and (max-width: 768px) {
          margin-right: 4px;
        }
      }
      span {
        font-weight: bold;
        font-size: 24px;
        letter-spacing: -0.04em;
        color: var(--color-white);

        @media screen and (max-width: 1024px) {
          font-size: 20px;
        }
        @media screen and (max-width: 568px) {
          font-size: 10px;
        }
      }
    }
  }

  &.section-3 {
    margin-top: 60px;

    .title {
      max-width: 633px;
      font-weight: bold;
      font-size: 80px;
      letter-spacing: -0.04em;
      color: var(--color-black);
      @media screen and (max-width: 1024px) {
        font-size: 64px;
      }
      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    .section-3-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
    }

    .section-3-item {
      width: 32%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }

  &.section-5 {
    padding-top: 60px;

    .title {
      font-weight: bold;
      font-size: 80px;
      letter-spacing: -0.04em;
      color: var(--color-black);
      @media screen and (max-width: 1024px) {
        font-size: 64px;
      }
      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    .section-5-content {
      display: flex;
      flex-direction: column;
    }

    .section-5-item {
      margin-bottom: 24px;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }

  &.section-6 {
    background: #FFF;

    .title {
      max-width: 730px;
      font-weight: bold;
      font-size: 80px;
      letter-spacing: -0.04em;
      color: var(--color-black);
      @media screen and (max-width: 1024px) {
        font-size: 64px;
      }
      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    .section-6-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
    }

    .section-6-item {
      width: 32%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }

  &.section-10 {
    position: relative;
    height: 423px;
    background: url("/static/images/bg/bg-8.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    padding: 64px 64px 0px;
    margin-top: 152px;

    @media screen and (max-width: 768px) {
      height: 264px;
      padding: 48px 48px 0px;
      margin-top: 60px;
    }

    @media screen and (max-width: 360px) {
      height: 460px;
    }

    .title {
      font-weight: bold;
      font-size: 80px;
      color: var(--color-white);
      letter-spacing: -0.04em;
      margin: 0;
      z-index: 1;
      margin-bottom: 64px;

      @media screen and (max-width: 1280px) {
        margin-bottom: 32px;
      }

      @media screen and (max-width: 1024px) {
        font-size: 64px;
      }
      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    button {
      width: 208px;
      height: 80px;
      background: var(--color-white);
      border-radius: 8px;
      font-weight: bold;
      font-size: 24px;
      letter-spacing: -0.04em;
      color: var(--color-black);
      z-index: 1;
    }
  }

  &.section-9,
  &.section-8,
  &.section-7 {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: bold;
      font-size: 80px;
      letter-spacing: -0.04em;
      color: var(--color-black);
      @media screen and (max-width: 1024px) {
        font-size: 64px;
      }
      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    .partner-img {
      width: 100%;
      cursor: pointer;
    }
  }

  .section-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .partner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 198px;
      height: 80px;
      border: 1px solid #EDEDED;
      box-sizing: border-box;
      border-radius: 16px;
      padding: 6px 21px;
      margin: 12px;

      @media screen and (max-width: 1024px) {
        width: 166px;
        height: 72px;
      }
      @media screen and (max-width: 768px) {
        width: 224px;
        height: 80px;
      }
      @media screen and (max-width: 576px) {
        width: calc(50% - 24px);
        height: 92px;
      }
    }
  }
`

export default function Home() {
  useEffect(() => {
    document.body.classList.add('home')
    return () => document.body.classList.remove('home')
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AnnounceCap />
        <Header />
        <Section className="section-1 limited">
          <h1 className="title">Loans for NFT and DeFi assets</h1>
          <p>Market: $1,000,000</p>
          <Link href="/loans">
            <Button>Launch app</Button>
          </Link>
        </Section>
        <Section className="flex-center justify-end section-2 limited">
          <div className="flex-center cursor scroll-down" onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            })
          }}>
            <img src="/static/images/icons/scroll-down.png" alt="scrolldown" />
            <span>Scroll down</span>
          </div>
        </Section>
        <Section className="section-3 limited">
          <h2 className="title">What can you do at Drops?</h2>
          <div className="section-3-content">
            {dataHowItWorks.map((d, index) => (
              <HowItWorks
                className="section-3-item"
                key={`how-it-works-${index}`}
                bg={index % 3}
                data={d}
              />
            ))}
          </div>
        </Section>
        <Section className="section-5 limited">
          <h2 className="title">NFT Lending Pools</h2>
          <div className="section-5-content">
            {dataMoreNFTs.map((d, index) => (
              <MoreUtility
                className="section-5-item"
                key={`upcoming-drops-${index}`}
                data={d}
                idx={index}
              />
            ))}
          </div>
        </Section>
        <Section className="section-6 limited">
          <h2 className="title">Supporting a wide range of NFTs</h2>
          <div className="section-6-content">
            {dataSupportNFTS.map((d, index) => (
              <SupportNFTs
                className="section-6-item"
                key={`how-it-works-${index}`}
                bg={index % 3}
                data={d}
              />
            ))}
          </div>
        </Section>
        <Section className="section-10 limited">
          <h1 className="title">Put your assets to work</h1>
          <Link href="/loans">
            <Button>Launch app</Button>
          </Link>
        </Section>
        <Section className="section-7 limited">
          <h2 className="title">Our team</h2>
          <div className="section-images">
            {dataTeam.map((d, index) => (
              <TeamMember
                className="section-8-item"
                key={`how-it-works-${index}`}
                bg={index % 3}
                data={d}
              />
            ))}
          </div>
        </Section>
        <Section className="section-8 limited">
          <h2 className="title">Investors</h2>
          <div className="section-images">
            {dataInvestor.map((investor) => (
              <div className="partner" key={investor.image}>
                <a href={investor.url} target="_blank">
                  <img
                    className="partner-img"
                    src={investor.image}
                    alt=""
                  />
                </a>
              </div>
            ))}
          </div>
        </Section>
        <Section className="section-9 limited">
          <h2 className="title">Partners</h2>
          <div className="section-images">
            {dataPartner.map((partner) => (
              <div className="partner" key={partner.image}>
                <a href={partner.url} target="_blank">
                  <img
                    className="partner-img"
                    src={partner.image}
                    alt=""
                  />
                </a>
              </div>
            ))}
          </div>
        </Section>
        <Footer />
      </div>
    </div>
  )
}
