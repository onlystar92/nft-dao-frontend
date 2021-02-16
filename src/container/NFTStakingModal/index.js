import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";
import Loading from "../../component/Loading";

import { CARD_SERIES, RESPONSE } from "../../helper/constant";

import nftStakingActions from "../../redux/nftStaking/actions";

const NFTStakingModal = ({ isBadgeCardStaked, onClose }) => {
  const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector(
    (state) => state.NFTStaking.stakedCardTokens
  );

  const unStakeCards = useMemo(() => {
    const ret = [];

    for (let i = 0; i < cards.length; i++) {
      const idx = stakedCardTokens.findIndex(
        (e) => Number(e) === Number(cards[i].id)
      );
      if (idx < 0 && Number(cards[i].owned) > 0) {
        if (isBadgeCardStaked && cards[i].series === CARD_SERIES.BADGE) {
          continue;
        }
        ret.push({ ...cards[i] });
      }
    }
    return ret;
  }, [cards, stakedCardTokens, isBadgeCardStaked]);

  const handleStake = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedCardIds.length === 0) {
      toast.error("Select cards please");
      return;
    }

    let badgeCardCnt = 0;
    for (let i = 0; i < selectedCardIds.length; i++) {
      const index = cards.findIndex(
        (c) => c.id === selectedCardIds[i] && c.series === CARD_SERIES.BADGE
      );
      if (index >= 0) {
        badgeCardCnt++;
      }
    }

    if (badgeCardCnt > 1) {
      toast.error("Only 1 badge can be staked");
      return;
    }

    if (stakeLoading) return;
    // console.log(selectedCardIds);
    setStakeLoading(true);
    dispatch(
      nftStakingActions.stakeCard(selectedCardIds, (status) => {
        setSelectedCardIds([]);
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

export default NFTStakingModal;

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
