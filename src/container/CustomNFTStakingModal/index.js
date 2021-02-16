import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";
import Loading from "../../component/Loading";

import { CUSTOM_NFT, RESPONSE } from "../../helper/constant";
import { getValueFromObject } from "../../helper/utils";

import customNFTStakingActions from "../../redux/customNFTStaking/actions";

const { REACT_APP_BUILD_MODE } = process.env;

const CustomNFTStakingModal = ({ nftToken, onClose }) => {
  const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  const cards = useSelector((state) => state.customNFTStaking.cards);
  const stakedCardTokens = useSelector((state) => getValueFromObject(state.customNFTStaking.staked, nftToken, []));
  const ownedCardTokens = useSelector((state) => getValueFromObject(state.customNFTStaking.owned, nftToken, []));

  const unStakeCards = useMemo(() => {
    const token = REACT_APP_BUILD_MODE === "development" ? CUSTOM_NFT.NODERUNNER : nftToken;

    const ret = [];

    if (token in cards) {
      const myCards = cards[token].cards;

      for (let i = 0; i < myCards.length; i++) {
        const idx = stakedCardTokens.findIndex(
          (e) => Number(e) === Number(myCards[i].id)
        );
        const idx2 = ownedCardTokens.findIndex(
          (e) => Number(e) === Number(myCards[i].id)
        );
        if (idx < 0 && idx2 >= 0) {
          ret.push({ ...myCards[i] });
        }
      }
    }
    console.log(ret);
    return ret;
  }, [cards, stakedCardTokens, ownedCardTokens, nftToken]);

  const handleStake = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedCardIds.length === 0) {
      toast.error("Select cards please");
      return;
    }

    if (stakeLoading) return;
    // console.log(selectedCardIds);
    setStakeLoading(true);
    dispatch(
      customNFTStakingActions.stakeCard(nftToken, selectedCardIds, (status) => {
        setSelectedCardIds([]);
        setStakeLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Staked successfully");
          dispatch(customNFTStakingActions.getStakedCards(nftToken));
          dispatch(customNFTStakingActions.getMyStakedStrength(nftToken));
          dispatch(customNFTStakingActions.getTotalStakedStrength(nftToken));
          dispatch(customNFTStakingActions.getClaimableNDR(nftToken));
          onClose();
        } else {
          toast.error("Staked failed");
        }
      })
    );
  };

  const handleSelectCard = (e, cardId) => {
    e.preventDefault();
    e.stopPropagation();

    const oldSelectedCard = [...selectedCardIds];
    const findIndex = oldSelectedCard.findIndex((id) => id === cardId);
    if (findIndex >= 0) {
      oldSelectedCard.splice(findIndex, 1);
    } else {
      oldSelectedCard.push(cardId);
    }
    setSelectedCardIds([...oldSelectedCard]);
  };

  return (
    <NFTStakeModalContainer onClick={(e) => onClose()}>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Select cards to stake" long />
      </MenuWrapper>
      <MenuWrapper className="animation-fadeInRight">
        <div className="menu-actions">
          <div className="menu-item selected-card-count">
            {`${selectedCardIds.length} Cards Selected`}
          </div>
          {selectedCardIds.length > 0 && (
            <div
              role="button"
              className="menu-item stake-button"
              onClick={(e) => handleStake(e)}
            >
              {stakeLoading ? (
                <LoadingTextIcon loadingText="Staking..." />
              ) : (
                `Stake selected`
              )}
            </div>
          )}
        </div>
      </MenuWrapper>
      <div
        className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
        style={{ paddingBottom: 100 }}
      >
        {unStakeCards.length > 0 ? (
          unStakeCards.map((card) => {
            const active = selectedCardIds.includes(card.id) ? "active" : "";
            return (
              <CardWrapper key={`stake_card_${card.id}`}>
                <div className={`card ${active}`}>
                  <img
                    src={card.image}
                    alt={`${card.name}`}
                    className="card-image"
                  />
                  <div
                    className="card-border"
                    onClick={(e) => handleSelectCard(e, card.id)}
                  ></div>
                </div>
                <div className="strength-text">
                  <label>Strength:</label>
                  <span>{card.strength}</span>
                </div>
              </CardWrapper>
            );
          })
        ) : (
          <Loading type="bubbles" color="#fec100" text="Loading..."/>
        )}
      </div>
    </NFTStakeModalContainer>
  );
};

export default CustomNFTStakingModal;

const NFTStakeModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: transparent;
  z-index: 200;
  overflow-y: auto;
  padding-top: 100px;
  padding-left: 10%;
  padding-right: 10%;

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 75px 7.5% 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
      padding: 75px 0px 0px;
    }

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

    &.active {
      .card-border {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
    }
  }

  .strength-text{
    padding-left: 10px;
    padding-top: 5px;

    label {
      font-size: 16px;
      font-family: Orbitron-Medium;
      color: #80f1ed;
      margin-bottom: 0;
    }

    span {
      font-size: 16px;
      font-family: Orbitron-Black;
      color: #fec100;
      padding-left: 4.66667px;
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0px 7.5%;

  @media screen and (max-width: 768px) {
    padding: 0px;
  }

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-right: 20px;
    text-align: center;
  }

  .menu-actions {
    display: flex;
    padding-left: 20px;
    flex-flow: row wrap;

    .menu-item {
      width: 210px;
      height: 32px;
      padding-left: 40px;
      padding-top: 6px;
      margin-bottom: 5px;
    }

    .selected-card-count {
      background-image: url("/static/images/bg/pages/stake/title.png");
      background-size: 100% 100%;
      font-family: Orbitron-Black;
      color: #fec100;
      padding-left: 20px;
    }

    .stake-button {
      background-image: url("/static/images/bg/pages/stake/button.png");
      background-size: 100% 100%;
      font-family: Orbitron-Medium;
      color: #161617;
      margin-left: -12px;
      cursor: pointer;

      &:hover {
        background-image: url("/static/images/bg/pages/stake/button--active.png");
        color: #fec100;
      }
    }
  }
`;
