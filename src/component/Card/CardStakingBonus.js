import React from "react";
import styled from "styled-components";

const CardStakingBonus = ({
  card,
  unStaked,
  loadingUnStake,
  onUnStake,
  onStake,
  ...rest
}) => {
  const handleClickBlankCard = () => {
    if (!unStaked) return;
    onStake();
  };

  return (
    <CardWrapper>
      <div className="card position-relative">
        {unStaked ? (
          <img
            src={`/static/images/bg/components/card/un-staked.png`}
            alt="unStaked"
            className="un-staked"
          />
        ) : (
          <img src={card.image} alt={`${card}`} className="card-image" />
        )}
        <div className="card-border" onClick={(e) => handleClickBlankCard()}>
          <span>Bonus Card</span>
        </div>
      </div>
      <div className="button-wrapper text-center">
        {unStaked ? (
          <button className="hover-effect3" onClick={onStake}>
            Stake bonus card
          </button>
        ) : (
          <button className="hover-effect3" onClick={(e) => onUnStake(card.id)}>
            {loadingUnStake ? (
              <div className="loading-wrapper">
                <img
                  src="/static/images/icons/loading.gif"
                  height="25"
                  alt=""
                  style={{ marginTop: 3, marginRight: 5 }}
                />{" "}
                Unstaking...
              </div>
            ) : (
              `Unstake bonus card`
            )}
          </button>
        )}
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  margin: 8px;

  .card {
    width: 232.5px;
    height: 324px;
    position: relative;
    padding: 11.75px 10.5px;
    background: transparent;

    .card-image {
      width: 217.5px;
      height: 307.5px;
      position: absolute;
    }

    .un-staked {
      width: 217.5px;
      height: 307.5px;
      cursor: pointer;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 240px;
      height: 332.25px;
      background: url("/static/images/bg/components/card/card-border.png");
      background-size: cover;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;

      span {
        color: #fec100;
        font-size: 20px;
        font-family: Orbitron-Black;
        text-shadow: 5px 5px 3px #27787580;
      }
    }
  }

  .button-wrapper {
    margin-top: 10px;

    button {
      width: 100%;
      height: 50px;
      background: url("/static/images/bg/components/card/button-bg.png");
      background-size: 100% 100%;
      border: none;
      color: #161617;
      font-size: 16px;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      outline: none;
      box-sizing: border-box;
    }
    .loading-wrapper {
      display: flex;
      font-size: 16px;
      justify-content: center;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      color: #161617;
    }
  }

  &:hover {
    .card {
      .card-border {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
    }
    .button-wrapper {
      button {
        background: url("/static/images/bg/components/card/button-bg--active.png");
        background-size: 100% 100%;
        color: #fec100;
      }
    }
  }
`;

export default CardStakingBonus;
