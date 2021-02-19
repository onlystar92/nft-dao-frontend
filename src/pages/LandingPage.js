import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

import Header from "../component/Header";
import HowItWorks from "../component/HowItWorks";
// import UpcomingDrops from "../component/UpcomingDrops";
import MoreUtility from "../component/MoreUtility";
import TeamMember from "../component/TeamMember";
import SubscribeInput from "../component/SubscribeInput";
import Footer from "../component/Footer";
import AnnounceCap from "../component/AnnounceCap";

import Button from "../component/Button";

import { dataHowItWorks, /*dataUpcomingDrops,*/ dataMoreNFTs, dataTeam } from "../helper/dummy";

const LandingPage = ({ history }) => {
  return (
    <LandingPageWrapper>
      <AnnounceCap />
      <Header />
      <Section className="section-1">
        <h1 className="font-color-dark font-size-lg text-center">NFT Raffles, STAKING & LOANS</h1>
        <p className="font-color-dark font-size-md text-center">Do more with your NFT assets.<br />Zero gas fees. Built on Polygon and Biconomy.</p>
        <div className="text-center">
          <Button className="m-10" onClick={() => { }} type="dark">PRESENTATION</Button>
          <Button className="m-10" onClick={() => { }} type="light">WHITEPAPER</Button>
        </div>
      </Section>
      <Section className="section-2" />
      <Section className="section-3">
        <h2 className="font-color-dark font-size-lg">HOW IT WORKS</h2>
        <div className="section-3-content">
          {dataHowItWorks.map((d, index) => <HowItWorks className="section-3-item" key={`how-it-works-${index}`} bg={index % 3} data={d} />)}
        </div>
        <div className="supported-projects text-center">
          <h3 className="text-bold-small">SUPPORTED PROJECTS</h3>
          <img className="m-10" src="/static/images/tokens/doki.png" alt="" height="24" />
          <img className="m-10" src="/static/images/tokens/meme.png" alt="" height="24" />
          <img className="m-10" src="/static/images/tokens/eth-men.png" alt="" height="24" />
          <img className="m-10" src="/static/images/tokens/ndr.png" alt="" height="24" />
          <img className="m-10" src="/static/images/tokens/marble.png" alt="" height="24" />
          <img className="m-10" src="/static/images/tokens/bondly.png" alt="" height="24" />
          <img className="m-10" src="/static/images/tokens/polka.png" alt="" height="24" />
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
      <Section className="section-5">
        <h2 className="font-color-dark font-size-lg text-center">MORE UTILITY FOR YOUR NFT</h2>
        <div className="section-5-content">
          {dataMoreNFTs.map((d, index) => <MoreUtility className="section-5-item" key={`upcoming-drops-${index}`} data={d} />)}
        </div>
      </Section>
      <Section className="section-6">
        <h2 className="font-color-dark font-size-lg text-center">Our Team</h2>
        <div className="section-6-content">
          {dataTeam.map((d, index) => <TeamMember className="section-6-item" bg={index % 5} key={`team-member-${index}`} data={d} />)}
        </div>
      </Section>
      <Section className="section-7">
        <h2 className="font-color-dark font-size-lg text-center">Apply as an artist</h2>
        {/* <p className="font-color-dark font-size-md text-center">Apply  Duis libero elit, pulvinar vitae turpis non,<br/>scelerisque tempus felis</p> */}
        <div className="text-center">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeIu6-kRK_Owq4w5z8OfSz3YMXvlB1A_flAxDyxLJ6PMRaXww/viewform?usp=sf_link" 
            target="_blank" className="apply-artist m-10 font-button" rel="noopener noreferrer">APPLY</a>
        </div>
      </Section>
      <Section className="section-8" />
      <Section className="section-9">
        <h2 className="font-color-dark font-size-lg text-center">Partners</h2>
        <div className="text-center">
          <img className="partner-img" src="/static/images/partners/partner-1.png" alt="" />
          <img className="partner-img" src="/static/images/partners/partner-2.png" alt="" />
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
    </LandingPageWrapper>
  );
};

const LandingPageWrapper = styled.div``;

const Section = styled.div`
  padding: 60px 20%;
  width: 100vw;
  max-width: 100%;

  @media screen and (max-width: 1920px) {
    padding 60px 10%;
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

      @media screen and (max-width: 768px) {
        flex-direction: column;
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

    .apply-artist {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      width: 240px;
      height: 56px;
      border-radius: 28px;
      border: 1px solid #282B49;
      cursor: pointer;
      outline: none;
      background: #282b49;
      color: #fff;
      margin: 0px auto;

      @media screen and (max-width: 768px) {
        width: 224px;
        height: 48px;
      }
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
      margin: 30px;

      @media screen and (max-width: 768px) {
        margin: 0px 0px 30px 0px;
      }
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
`
export default withRouter(LandingPage);
