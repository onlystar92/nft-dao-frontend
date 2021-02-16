import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const CardStakingOld = ({
  card,
  unStaked,
  currentProcessingCardId,
  loadingUnStake,
  onUnStake,
  onStake,
  loadingApprove,
  approved,
  onApprove,
}) => {
  const handleClickBlankCard = () => {
    if (!unStaked) return;

    if (approved) {
      onStake();
    } else {
      toast.info("You should approve cards first");
    }
  };

  return (
    <CardWrapperOld>
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
        </div>
      </div>
      <div className="button-wrapper text-center">
        {unStaked ? (
          approved ? (``
            // <button className="hover-effect3" onClick={onStake}>
            //   Stake
            // </button>
          ) : loadingApprove ? (
            <button className="hover-effect3">
              <img
                src="/static/images/icons/loading.gif"
                height="25"
                alt=""
                style={{ marginTop: 3, marginRight: 5 }}
              />{" "}
              Approving...
            </button>
          ) : (
            <button className="hover-effect3" onClick={onApprove}>
              Approve All
            </button>
          )
        ) : (
          <button className="hover-effect3" onClick={(e) => onUnStake(card.id)}>
            {loadingUnStake && card.id === currentProcessingCardId ? (
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
              `Unstake`
            )}
          </button>
        )}
      </div>
    </CardWrapperOld>
  );
};

const CardWrapperOld = styled.div`
  margin: 8px;

  .card {
    width: 290.63px;
    height: 405px;
    position: relative;
    padding: 14.6875px 13.125px;
    background: transparent;

    .card-image {
      width: 271.875px;
      height: 384.375px;
      position: absolute;

      &.un-obtained {
        opacity: 0.3;
      }
    }

    .un-staked {
      width: 271.875px;
      height: 384.375px;
      cursor: pointer;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: 415.31px;
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

    .marked {
      position: absolute;
      top: 6.566px;
      left: 6.66px;
      width: 74.25;
      height: 74.25px;
    }
  }

  .button-wrapper {
    margin-top: 10px;

    button {
      width: 100%;
      height: 62.5px;
      background: url("/static/images/bg/components/card/button-bg.png");
      background-size: 100% 100%;
      border: none;
      color: #161617;
      font-size: 20px;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      outline: none;
      box-sizing: border-box;
    }
    .loading-wrapper {
      display: flex;
      font-size: 20px;
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

export default CardStakingOld;
