import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

// import CloseIcon from "@material-ui/icons/Close";

import SectionTitle from "../../component/SectionTitle";
// import LoadingTextIcon from "../../component/LoadingTextIcon";

import { CARD_SERIES, RESPONSE } from "../../helper/constant";

import nftStakingActions from "../../redux/nftStaking/actions";

const NFTBonusStakingModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector((state) => state.NFTStaking.stakedCardTokens);

  const unStakeCards = useMemo(() => {
    const ret = [];

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].series !== CARD_SERIES.BADGE) continue;
      const idx = stakedCardTokens.findIndex(
        (e) => Number(e) === Number(cards[i].id)
      );
      if (idx < 0 && Number(cards[i].owned) > 0) {
        ret.push({ ...cards[i] });
      }
    }
    return ret;
  }, [cards, stakedCardTokens]);

  const handleStake = (e, cardId) => {
    e.preventDefault();
    e.stopPropagation();

    if (stakeLoading) return;

    setSelectedCardId(cardId);

    setStakeLoading(true);
    dispatch(
      nftStakingActions.stakeCard([cardId], (status) => {
        setSelectedCardId(0);
        setStakeLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Staked successfully");
          dispatch(nftStakingActions.getStakedCards());
          dispatch(nftStakingActions.getMyStakedStrength());
          dispatch(nftStakingActions.getTotalStakedStrength());
          dispatch(nftStakingActions.getClaimableNDR());
          onClose();
        } else {
          toast.error("Staked failed");
        }
      })
    );
  };

  const handlePreventClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <NFTBonusStakingModalContainer onClick={(e) => onClose()}>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Select a Bonus Card to Stake" long />
      </MenuWrapper>
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ paddingBottom: 100 }}
      >
        {unStakeCards.length > 0 &&
          unStakeCards.map((card) => (
            <CardWrapper key={`stake_card_${card.id}`}>
              <div className="card position-relative">
                <img
                  src={card.image}
                  alt={`${card.name}`}
                  className="card-image"
                />
                <div
                  className="card-border"
                  onClick={(e) => handleStake(e, card.id)}
                ></div>
              </div>
              <div className="button-wrapper text-center">
                {stakeLoading && card.id === selectedCardId ? (
                  <button
                    className="hover-effect3"
                    onClick={(e) => handlePreventClose(e)}
                  >
                    <div className="loading-wrapper">
                      <img
                        src="/static/images/icons/loading.gif"
                        height="25"
                        alt=""
                        style={{ marginTop: 3, marginRight: 5 }}
                      />{" "}
                      Staking...
                    </div>{" "}
                  </button>
                ) : (
                  <button
                    className="hover-effect3"
                    onClick={(e) => handleStake(e, card.id)}
                  >
                    Stake
                  </button>
                )}
              </div>
            </CardWrapper>
          ))}
      </div>
    </NFTBonusStakingModalContainer>
  );
};

export default NFTBonusStakingModal;

const NFTBonusStakingModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: transparent;
  z-index: 200;
  overflow-y: auto;

  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 75px 7.5% 22.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.875rem;
      font-family: Orbitron-Black;
      text-transform: uppercase;
      text-shadow: 5px 5px 3px #27787580;
      line-height: 1.875rem;
      text-align: center;
      color: #fec100;
    }

    .close-button {
      .MuiSvgIcon-root {
        width: 2.1em;
        height: 2.1em;
      }
      svg path {
        fill: #fec100;
      }
      &:hover {
        svg path {
          fill: #f628ca;
        }
      }
    }
  }
`;

const CardWrapper = styled.div`
  margin: 8px;

  .card {
    width: 232.5px;
    height: 324px;
    position: relative;
    padding: 12.75px 10.5px;
    background: transparent;
    z-index: 400;

    .card-image {
      width: 217.5px;
      height: 307.5px;
      position: absolute;
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
    }

    .marked {
      position: absolute;
      top: 6.566px;
      left: 6.66px;
      width: 99px;
      height: 99px;
    }
  }

  .button-wrapper {
    button {
      width: 100%;
      height: 52px;
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
      align-items: center;
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

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 100px 7.5% 0px;

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-right: 20px;
    text-align: center;
  }
`;