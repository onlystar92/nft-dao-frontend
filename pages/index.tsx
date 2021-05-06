// import Link from 'next/link'
import styles from 'styles/Home.module.css'
import styled from 'styled-components'
import AnnounceCap from 'components/Home/AnnounceCap'
import Header from 'components/Home/Header'
import HowItWorks from 'components/Home/HowItWorks'
import MoreUtility from 'components/Home/MoreUtility'
import TeamMember from 'components/Home/TeamMember'
import Footer from 'components/Home/Footer'
import {
  dataHowItWorks,
  /*dataUpcomingDrops,*/
  dataMoreNFTs,
  dataTeam,
} from 'helpers/dummy'
import { useEffect } from 'react'

const Section = styled.div`
  padding: 60px 20%;
  width: 100vw;
  max-width: 100%;

  @media screen and (max-width: 1920px) {
    padding 60px 15%;
  }

  @media screen and (max-width: 1440px) {
    padding 60px;
  }

  @media screen and (max-width: 768px) {
    padding 60px 20px;
  }

  &.section-1 {
    background: url("/static/images/bg/bg-1.png") #FBF9F8;
    background-repeat: no-repeat;
    background-position: top right;
    height: calc(100vh - 246px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &.section-2 {
    background: url("/static/images/bg/bg-2.png") #FBF9F8;
    background-repeat: no-repeat;
    background-position: bottom left;
    height: 150px;
  }

  &.section-3 {
    background: #FFF;

    .section-3-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
    }

    .section-3-item {
      width: 30%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    .supported-projects {
      margin-top: 60px;

      @media screen and (max-width: 768px) {
        margin-top: 15px;
      }
    }
  }

  &.section-4 {
    background: #FBF9F8;
    padding-bottom: 60px;

    .section-4-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 60px;
      text-align: center;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 28px;

      padding: 0 160px;
      letter-spacing: 0.1em;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        font-size: 14px;
        padding: 0;
      }

      @media screen and (min-width: 769px) and (max-width: 1200px) {
        padding: 0 80px;
      }

      &--first {
        margin-bottom: 20px;
      }
    }

    .section-4-item {
      width: 30%;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    .supported-projects {
      margin-top: 60px;
    }
  }

  &.section-5 {
    background: url("/static/images/bg/bg-3.png") #FFF;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    padding-top: 60px;
    padding-bottom: 440px;

    @media screen and (max-width: 1920px) {
      padding-bottom: 240px;
    }

    @media screen and (max-width: 768px) {
      padding-bottom: 120px;
    }

    .section-5-content {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    .section-5-item {
      width: 45%;
      margin-bottom: 34px;

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }

  &.section-6 {
    background: #FBF9F8;
    padding-bottom: 60px;

    .section-6-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 60px;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }

    .section-6-item {
      width: 18%;
      @media screen and (max-width: 768px) {
        width: 80%;
        margin-bottom: 23px;
      }
    }
  }

  &.section-7 {
    background: url("/static/images/bg/bg-5.png") #FFF;
    background-repeat: no-repeat;
    background-position: top right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 140px;

    .investor-img {
      margin: 1rem;
    }
  }

  &.section-8 {
    background: url("/static/images/bg/bg-4.png") #FFF;
    background-repeat: no-repeat;
    background-position: bottom left;
    background-size: contain;
    height: 150px;
  }

   &.section-9 {
    background: #FBF9F8;
    display: flex;
    flex-direction: column;
    justify-content: center;  
    padding-top: 140px;

    .partner-img {
      margin: 1rem;
    }
  }

  &.section-10 {
    background: url("/static/images/bg/bg-6.png") #FFF;
    background-repeat: no-repeat;
    background-position: bottom left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 140px;
    padding-bottom: 140px;

    @media screen and (max-width: 768px) {
      padding-top: 130px;
      background: url("/static/images/bg/bg-5.png") #FFF;
      background-repeat: no-repeat;
      background-position: top right;
      background-size: 50%;
      padding-bottom: 0px;
    }

    .subscribe {
      margin-top: 26px;
      display: flex;
      justify-content: center;
    }
  }

  &.section-11 {
    display: none;
    
    @media screen and (max-width: 768px) {
      display: block;
      background: url("/static/images/bg/bg-4.png") #FFF;
      background-repeat: no-repeat;
      background-position: bottom left;
      background-size: contain;
      height: 150px;
    }
  }

  .section-images {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
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
        <Section className="section-1">
          <h1 className="font-color-dark font-size-lg text-center">
            DeFi for NFTs
          </h1>
          <p className="font-color-dark font-size-xd text-center">
            Staking, Trustless loans, Vaults
          </p>
          <div className="d-flex justify-content-center">
            <a
              href="https://docsend.com/view/nc56ckqmy7zvjv9n"
              target="_blank"
              className="link-button  dark m-10 font-button"
              rel="noopener noreferrer"
            >
              Pitch Deck
            </a>
            <a
              href="https://docsend.com/view/e9nq2waxia63hrq7"
              target="_blank"
              className="link-button  light m-10 font-button"
              rel="noopener noreferrer"
            >
              WHITEPAPER
            </a>
          </div>
        </Section>
        <Section className="section-2" />
        <Section className="section-3">
          <h2 className="font-color-dark font-size-lg">How It Works</h2>
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
          <div className="supported-projects text-center">
            <h3 className="text-bold-small">SUPPORTED PROJECTS</h3>
            <img
              className="m-10"
              src="/static/images/tokens/doki.png"
              alt=""
              height="24"
            />
            <img
              className="m-10"
              src="/static/images/tokens/meme.png"
              alt=""
              height="24"
            />
            <img
              className="m-10"
              src="/static/images/tokens/eth-men.png"
              alt=""
              height="24"
            />
            <img
              className="m-10"
              src="/static/images/tokens/ndr.png"
              alt=""
              height="24"
            />
            <img
              className="m-10"
              src="/static/images/tokens/marble.png"
              alt=""
              height="24"
            />
          </div>
        </Section>
        {/* <Section className="section-4">
          <h2 className="font-color-dark font-size-lg">UPCOMING DROPS</h2>
          <div className="section-4-content">
            {dataUpcomingDrops.map((d, index) => <UpcomingDrops className="section-4-item" key={`upcoming-drops-${index}`} data={d} />)}
          </div>
          <div className="text-center">
            <Button className="m-10" onClick={() => { }} type="light">VIEW ALL</Button>
          </div>
        </Section> */}
        <Section className="section-4">
          <h2 className="font-color-dark font-size-lg text-center">
            More Utility For Your NFTs
          </h2>
          <div className="section-4-content section-4-content--first">
            Drops brings DeFi-style infrastructure to NFTs, adding much-needed
            utility to idle NFT assets. Users can leverage their NFTs to obtain
            loans and earn real yield, reducing the opportunity cost of holding
            NFTs long-term.
          </div>
          <div className="section-4-content">
            The Drops infrastructure will become increasingly important as we
            witness the rise of “financial” NFTs - an expansion of the space
            beyond digital artwork into more tangible financial instruments.
          </div>
        </Section>
        <Section className="section-5">
          <h2 className="font-color-dark font-size-lg text-center">
            Also Featuring
          </h2>
          <div className="section-5-content">
            {dataMoreNFTs.map((d, index) => (
              <MoreUtility
                className="section-5-item"
                key={`upcoming-drops-${index}`}
                data={d}
              />
            ))}
          </div>
        </Section>
        <Section className="section-6">
          <h2 className="font-color-dark font-size-lg text-center">Our Team</h2>
          <div className="section-6-content">
            {dataTeam.map((d, index) => (
              <TeamMember
                className="section-6-item"
                bg={index % 5}
                key={`team-member-${index}`}
                data={d}
              />
            ))}
          </div>
        </Section>
        {/* <Section className="section-7">
          <h2 className="font-color-dark font-size-lg text-center">Apply as an artist</h2>
          // <p className="font-color-dark font-size-md text-center">Apply  Duis libero elit, pulvinar vitae turpis non,<br/>scelerisque tempus felis</p>
          <div className="d-flex justify-content-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeIu6-kRK_Owq4w5z8OfSz3YMXvlB1A_flAxDyxLJ6PMRaXww/viewform?usp=sf_link"
              target="_blank" className="link-button m-10 font-button" rel="noopener noreferrer">APPLY</a>
          </div>
        </Section> */}
        <Section className="section-7">
          <h2 className="font-color-dark font-size-lg text-center">
            Investors
          </h2>
          <div className="section-images">
            <img
              className="investor-img"
              src="/static/images/investors/investor-1.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-2.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-3.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-4.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-5.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-6.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-7.png"
              alt=""
            />
            <img
              className="investor-img"
              src="/static/images/investors/investor-8.png"
              alt=""
            />
          </div>
        </Section>
        <Section className="section-8" />
        <Section className="section-9">
          <h2 className="font-color-dark font-size-lg text-center">Partners</h2>
          <div className="section-images">
            <img
              className="partner-img"
              src="/static/images/partners/partner-1.png"
              alt=""
            />
            <img
              className="partner-img"
              src="/static/images/partners/partner-2.png"
              alt=""
            />
            <img
              className="partner-img"
              src="/static/images/partners/partner-3.png"
              alt=""
            />
            <img
              className="partner-img"
              src="/static/images/partners/partner-4.png"
              alt=""
            />
            <img
              className="partner-img"
              src="/static/images/partners/partner-5.png"
              alt=""
            />
            <img
              className="partner-img"
              src="/static/images/partners/partner-6.png"
              alt=""
            />
            <img
              className="partner-img"
              src="/static/images/partners/partner-7.png"
              alt=""
            />
          </div>
        </Section>
        {/* <Section className="section-10">
          <h2 className="font-color-dark font-size-lg text-center">Don't Miss a Drop</h2>
          <p className="font-color-dark font-size-md text-center">We are committed to processing the information in order to<br/>contact you and talk about your project. </p>
          <div className="subscribe">
            <SubscribeInput />
          </div>
        </Section>
        <Section className="section-11" /> */}
        <Footer />
      </div>
    </div>
  )
}
