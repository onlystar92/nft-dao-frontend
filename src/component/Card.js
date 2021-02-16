import React from "react";
import styled from "styled-components";

import { CARD_HASH_PRICE_UNIT } from "../helper/constant";

const Card = ({
  card,
  isHero,
  payed,
  eth,
  unObtained,
  marked,
  score,
  unStaked,
  ndrToken,
  empty,
  heroBlood,
  villainBlood,
  onBuyCardEth,
  onBuyCardHash,
  currentProcessingCardId,
  loadingHash,
  loadingEth,
}) => {
  return (
    <CardWrapper>
      {card && card.top && (
        <div className="card-grid top">
          <h4 className="text-left">{card.name}</h4>
          <div className="d-flex">
            <div className="w-50 text-wrapper">
              <div className="text-left">
                <label>Strength:</label>
                <span>{card.strength}</span>
              </div>
              <div className="text-left">
                <label>Minted:</label>
                <span>{`${
                  card.rarity.weight * CARD_HASH_PRICE_UNIT
                }/0.45}`}</span>
              </div>
              {/* {!cardGrid.isHero ? (
                <div className="text-left">
                  <label>Health:</label>
                  <span>{cardGrid.health}</span>
                </div>
              ) : (
                ""
              )} */}
            </div>
            <div className="w-50 text-wrapper">
              <div className="text-right">
                <label>Defense:</label>
                <span>{card.defense}</span>
              </div>
              <div className="text-right">
                <label>Rarity:</label>
                <span>{card.rarity.text}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {ndrToken && (
        <div className="ndr-token d-flex justify-content-around">
          <div className="text-center d-flex flex-column justify-content-between">
            <img src={`/static/images/icons/strength.png`} alt="strength" />
            <p>{card.strength}</p>
          </div>
          <div className="text-center d-flex flex-column justify-content-between">
            <img src={`/static/images/icons/defense.png`} alt="defense" />
            <p>{card.defense}</p>
          </div>
          <div className="text-center d-flex flex-column justify-content-between">
            <img src={`/static/images/icons/ndr.png`} alt="ndr" />
            <p>
              {/* {card.ndr} */}
              <span>NDR</span>
            </p>
          </div>
        </div>
      )}
      <div className="card position-relative">
        {heroBlood && (
          <div className="hero-blood">
            <img
              src={`/static/images/bg/components/card/hero-blood-bar.png`}
              alt="hero-blood-bar"
            />
            <span>{`${heroBlood}/100`}</span>
          </div>
        )}
        {villainBlood && (
          <div className="villain-blood">
            <img
              src={`/static/images/bg/components/card/villain-blood-bar.png`}
              alt="villain-blood-bar"
            />
            <span>{`${villainBlood}/100`}</span>
          </div>
        )}
        {unObtained && (
          <img
            src={`/static/images/bg/components/card/un-obtained.png`}
            alt="unObtained"
            className="un-obtained"
          />
        )}
        {unStaked ? (
          <img
            src={`/static/images/bg/components/card/un-staked.png`}
            alt="unStaked"
            className="un-staked"
          />
        ) : (
          <img
            src={card.image}
            alt={card.name}
            className={`card-image ${unObtained ? "un-obtained" : ""}`}
          />
        )}
        <img
          src={`/static/images/bg/components/card/card-border.png`}
          width="320"
          height="443"
          alt="card-border"
          className="card-border"
        />
        {marked && (
          <img
            src={`/static/images/bg/components/card/marked.png`}
            alt="marked"
            className="marked"
          />
        )}
      </div>
      {score ? (
        <div className="score">
          <img
            src={`/static/images/icons/cards.png`}
            alt="cards"
            className="card-icon"
          />
          <span>{score}</span>
        </div>
      ) : (
        <div className="button-wrapper text-center">
          {unObtained ? (
            <button className="hover-effect3 un-obtained">Obtain Card</button>
          ) : unStaked ? (
            <button className="hover-effect3">Stake</button>
          ) : card && !card.top && !empty ? (
            <div className="card-grid">
              <h4 className="text-left">{card.name}</h4>
              <div className="d-flex">
                <div className="w-50 text-wrapper">
                  <div className="text-left">
                    <label>Strength:</label>
                    <span>{card.strength}</span>
                  </div>
                  <div className="text-left">
                    <label>Minted:</label>
                    <span>{card.minted}/{card.total_minted}</span>
                  </div>
                  {/* {!isHero ? (
                    <div className="text-left">
                      <label>Health:</label>
                      <span>{card.health}</span>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
                <div className="w-50 text-wrapper">
                  <div className="text-right">
                    <label>Defense:</label>
                    <span>{card.defense}</span>
                  </div>
                  <div className="text-right">
                    <label>Rarity:</label>
                    <span>{card.rarity.text}</span>
                  </div>
                </div>
              </div>
              <div className="grid-button-wrapper">
                {isHero && (
                  <button
                    className="buy-button hover-effect2"
                    onClick={(e) => onBuyCardHash(card)}
                  >
                    {loadingHash && card.id === currentProcessingCardId ? (
                      <div className="loading-wrapper">
                        <img
                          src="/static/images/icons/loading.gif"
                          height="20"
                          alt=""
                        />
                        BUYING...
                      </div>
                    ) : (
                      `${card.rarity.weight * CARD_HASH_PRICE_UNIT} Hash`
                    )}
                  </button>
                )}
                {/* <button
                  className={`${
                    isHero ? "eth-button" : "buy-button"
                  } hover-effect2`}
                  onClick={(e) => onBuyCardEth(card)}
                >
                  {loadingEth && card.id === currentProcessingCardId ? (
                    <div className="loading-wrapper">
                      <img
                        src="/static/images/icons/loading.gif"
                        height="20"
                        alt=""
                      />
                      BUYING...
                    </div>
                  ) : (
                    <>
                      {" "}
                      <span>Ξ</span>
                      {` `}
                      {convertFromWei(eth, 4)}
                    </>
                  )}
                </button> */}
                {/* {payed? (
                  isHero ? (
                    <>
                      <button
                        className="hash-button hover-effect2"
                        onClick={(e) => onBuyCardHash(card, card.hash)}
                      >
                        {card.rarity.weight * CARD_HASH_PRICE_UNIT} Hash
                      </button>
                      <button
                        className="eth-button hover-effect2"
                        onClick={(e) => onBuyCardHash(card, eth)}
                      >
                        {eth} Eth
                      </button>
                    </>
                  ) : (
                    <button className="buy-button hover-effect2">
                      Fight Villain
                    </button>
                  )
                ) : (
                  <button className="buy-button hover-effect2">
                    Buy on Opensea
                  </button>
                )} */}
              </div>
            </div>
          ) : empty ? (
            ""
          ) : (
            <button className="hover-effect3">Unstake</button>
          )}
        </div>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  margin: 8px;

  .card {
    width: 310px;
    height: 432px;
    position: relative;
    padding: 17px 14px;
    background: transparent;

    .card-image {
      width: 290px;
      height: 410px;
      position: absolute;

      &.un-obtained {
        opacity: 0.3;
      }
    }

    .hero-blood {
      position: absolute;
      bottom: -28px;
      right: -20px;

      span {
        position: absolute;
        bottom: 8px;
        right: 22px;
        color: ${(props) => props.theme.palette.secondary.main};
        font-family: Orbitron-Black;
        font-size: 20px;
        text-shadow: 5px 5px 3px
          ${(props) => props.theme.darken("#277875", 0.5)};
      }
    }

    .villain-blood {
      position: absolute;
      bottom: -28px;
      left: -18px;

      span {
        position: absolute;
        bottom: 8px;
        left: 20px;
        color: ${(props) => props.theme.palette.secondary.main};
        font-family: Orbitron-Black;
        font-size: 20px;
        text-shadow: 5px 5px 3px
          ${(props) => props.theme.darken("#277875", 0.5)};
      }
    }

    .un-obtained {
      width: 280px;
      height: 400px;
      opacity: 0.5;
    }

    .un-staked {
      width: 280px;
      height: 400px;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
    }

    .marked {
      position: absolute;
      top: 6.566px;
      left: 6.66px;
      width: 99px;
      height: 99px;
    }
  }

  .score {
    font-size: 20px;
    font-family: Orbitron-Black;
    color: #fec100;
    text-shadow: #fec100 5px 5px 10px;
    display: flex;
    margin-top: -2px;
    padding-left: 15px;

    span {
      padding-top: 2px;
      margin-left: -1.3333px;
    }
  }

  .button-wrapper {
    margin-top: -11.666px;

    button {
      width: 238px;
      height: 52px;
      background: url("/static/images/bg/components/card/button-bg.png");
      border: none;
      color: #161617;
      font-size: 20px;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      outline: none;
    }
  }

  .ndr-token {
    p {
      font-size: 20px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.secondary.main};
      padding-bottom: 2.6667px;
      margin-bottom: 3.3333px;
    }
  }

  .card-grid {
    width: 310px;
    padding: 0 22px;
    margin-top: 20px;
    text-shadow: 4.66667px 4.66667px 6.66667px
      ${(props) => props.theme.darken(props.theme.palette.primary.main, 0.57)};

    &.top {
      min-height: 89px;
      margin-top: 0;
    }

    h4 {
      font-size: 20px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.primary.main};
      border-bottom: 1.333px solid
        ${(props) => props.theme.palette.primary.main};
      padding-bottom: 2.66667px;
      margin-bottom: 3.3333px;
    }

    label {
      font-size: 13.6667px;
      font-family: Orbitron-Medium;
      color: ${(props) => props.theme.palette.primary.main};
      margin-bottom: 0;
    }

    span {
      font-size: 13.66667px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.secondary.main};
      padding-left: 4.66667px;
    }

    .text-wrapper {
      line-height: 16px;
    }

    .grid-button-wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      button {
        padding-bottom: -4.66667px;

        &.hash-button {
          // width: 152px;
          flex: 1;
          height: 35px;
          background-image: url("/static/images/bg/components/card/hash-button-bg.png");
          background-size: 100% 100%;
          margin-left: -3.33333px;
          padding-bottom: 4.66667px;
        }
        &.eth-button {
          // width: 148px;
          flex: 1;
          height: 38px;
          background-image: url("/static/images/bg/components/card/eth-button-bg.png");
          background-size: 100% 100%;
          margin-right: -8.66667px;
          padding-bottom: 4.66667px;

          span {
            font-family: "arial";
            font-size: 20px;
            color: #161617;
          }
        }
        &.buy-button {
          width: 290px;
          height: 38px;
          background-image: url("/static/images/bg/components/card/buy-button-bg.png");
          background-size: 100% 100%;

          span {
            font-family: "arial";
            font-size: 20px;
            color: #161617;
          }
        }
      }

      .loading-wrapper {
        display: flex;
        font-size: 14px;
        justify-content: center;
        color: #161617;
      }
    }
  }
`;

export default Card;
