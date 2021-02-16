import React from "react";
import styled from "styled-components";
import { Tab, Nav } from "react-bootstrap";
import SectionTitle from "../component/SectionTitle";
import Card from "../component/Card";

const MyCardsWrapper = styled.div`
	.stake-stats {
    div {
      span {
        font-size: 20px;
        max-width: 127px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &:first-child {
        background: url('/assets/images/bg/card-menu/stats-first-bg.png');
        background-size: cover;
        width: 150px;
        height: 100px;
        margin-right: -8px;
        padding: 15px 0 0 2px;
      }

      &:last-child {
        background: url('/assets/images/bg/card-menu/stats-last-bg.png');
        background-size: cover;
        width: 150px;
        height: 100px;
        margin-left: -8px;
        padding: 15px 0 0 2px;
      }

      &.stat {
        background: url('/assets/images/bg/card-menu/stat-bg.png');
        background-size: cover;
        margin: 0 -7px;
        padding: 10px 12px 0;
        min-width: 293px;
        text-shadow: 15px 15px 10px #80f1ed91;

        h6 {
          color: #80f1ed;
          font-size: 20px;
          line-height: 1;
          margin: 0 0 7px;
        }

        p {
          color: #fec100;
          font-size: 30px;
          font-family: Orbitron-Black;
          line-height: 1;
          margin: 0;
        }
      }
    }
  }

  // .section-title {
  //   .title-wrapper {
  //     min-width: 1776px;
  //     margin-top: -34px;
  //   }
	//
  //   .title {
  //     background: url('/assets/images/bg/my-cards/title-bg.png');
  //     width: 272px;
  //     height: 67px;
  //     color: #fec100;
  //     font-size: 30px;
  //     font-family: Orbitron-Black;
  //     padding: 2px 0 0 13px;
  //     text-shadow: 5px 5px 3px #27787580;
  //   }
	//
  //   .title-line {
  //     background: url('/assets/images/bg/my-cards/title-line.png') no-repeat;
  //     background-position: bottom;
  //     width: 853px;
  //     height: 65px;
  //   }
  // }

  .card-wrapper {
    &.unstake {
      button {
        background: url('/assets/images/bg/card-menu/button-bg--stake.png');
        color: #fec100;
        font-size: 30px;
        font-family: Orbitron-Black;
        text-shadow: 0 0 7px #00000059;
      }
    }

    &:nth-of-type(2) {
      margin-top: 10px;
    }

    &:nth-of-type(3) {
      margin-top: 20px;
    }

    .card {
      width: 466px;
      height: 648px;
      position: relative;
      padding: 26px 24px;
      background: transparent;

      img {
        width: fit-content;

        &.card-bg {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        &.unstake-layer {
          position: absolute;
          top: 25px;
          z-index: 1;
        }
      }
    }

    .score {
      font-size: 30px;
      font-family: Orbitron-Black;
      color: #fec100;
      text-shadow: #fec100 5px 5px 10px;
    }
  }
`;

const Developers = [
	{
		card: 'card-1',
		marked: true,
		score: '02',

	},
	{
		card: 'card-2',
		unObtained: true
	},
	{
		card: 'card-2',
		score: '69'
	},
	{
		card: 'card-2',
		unObtained: true
	}
];

const Influencers = [
	{
		card: 'card-1',
		unObtained: true
	},
	{
		card: 'card-2',
		score: '23'
	},
	{
		card: 'card-2',
		unObtained: true
	},
	{
		card: 'card-2',
		unObtained: true
	}
];

const MyCards = () => {
	return (
    <MyCardsWrapper>
      <Tab.Container id="my-cards-page" defaultActiveKey="heroes">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="heroes">Heroes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="items">Items</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="villains">Villains</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="heroes">
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle title={"Developers"} />
            </div>
            <div className="d-flex justify-content-center">
              {Developers.map((d) => (
                <Card
                  marked={d.marked}
                  card={d.card}
                  score={d.score}
                  unObtained={d.unObtained}
                />
              ))}
            </div>
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle title={"Influencers"} />
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              {Influencers.map((d) => (
                <Card
                  marked={d.marked}
                  card={d.card}
                  score={d.score}
                  unObtained={d.unObtained}
                />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="items"></Tab.Pane>
          <Tab.Pane eventKey="villains"></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </MyCardsWrapper>
  );
};

export default MyCards;
