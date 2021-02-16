import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import SectionTitle from "../../component/SectionTitle";

import CardStakingOld from "../../component/Card/CardStakingOld";
import NFTStakingBoardOld from "../NFTStakingBoardOld";
import NFTStakingModalOld from "../NFTStakingModalOld";

// import cardsActions from "../../redux/cards/actions";
import oldNFTStakingActions from "../../redux/oldNFTStaking/actions";

import { MAX_STAKED_CARD_COUNT, RESPONSE } from "../../helper/constant";

const NFTStakingOld = () => {
  const dispatch = useDispatch();

  const [unStakeLoading, setUnStakeLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  const [stakeDlgOpenOld, setStakeDlgOpenOld] = useState(false);

  const [approveLoading, setApproveLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector(
    (state) => state.OldNFTStaking.stakedCardTokens
  ); // Staked card count

  const oldStakedCards = useMemo(() => {
    const ret = [];
    for (let i = 0; i < 4; i++) {
      ret.push({
        card: null,
        unStaked: true,
      });
    }

    let cnt = 0;
    for (let i = 0; i < stakedCardTokens.length; i++) {
      const cardIndex = cards.findIndex(
        (e) => Number(e.id) === Number(stakedCardTokens[i])
      );
      if (cardIndex >= 0) {
        ret[cnt].card = { ...cards[cardIndex] };
        ret[cnt].unStaked = false;
        cnt++;
      }
    }
    return ret;
  }, [cards, stakedCardTokens]);

  useEffect(() => {
    dispatch(oldNFTStakingActions.getStakedCards());
    dispatch(
      oldNFTStakingActions.getApprovedStatus((status) => {
        setApproved(status);
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (cards.length > 0) {
      dispatch(oldNFTStakingActions.getMyCardsCount(cards));
    }
  }, [dispatch, cards]);

  const handleUnStake = (cardId) => {
    setSelectedCardId(cardId);
    setUnStakeLoading(true);
    dispatch(
      oldNFTStakingActions.unStakeCard(cardId, (status) => {
        setSelectedCardId(0);
        setUnStakeLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Sucess");
          dispatch(oldNFTStakingActions.getStakedCards());
          dispatch(oldNFTStakingActions.getMyStakedStrength());
          dispatch(oldNFTStakingActions.getTotalStakedStrength());
          dispatch(oldNFTStakingActions.getClaimableNDR());
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  const handleOpenStakeModalOld = () => {
    setStakeDlgOpenOld(true);
  };

  const handleCloseStakeModalOld = () => {
    setStakeDlgOpenOld(false);
  };

  const handleApproveAll = () => {
    setApproveLoading(true);
    dispatch(
      oldNFTStakingActions.approveAll(true, (status) => {
        setApproveLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Approved successfully");
          dispatch(
            oldNFTStakingActions.getApprovedStatus((status) => {
              setApproved(status);
            })
          );
        } else {
          toast.error("Approved failed");
        }
      })
    );
  };

  return (
    <StakePageContainer>
      {stakeDlgOpenOld && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <NFTStakingModalOld onClose={handleCloseStakeModalOld} />
        </div>
      )}
      <NFTStakingBoardOld />
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle
          title={`${stakedCardTokens.length}/${MAX_STAKED_CARD_COUNT} Cards Staked`}
          long
        />
      </MenuWrapper>
      <CardContainer>
        {oldStakedCards.length > 0 &&
          oldStakedCards.map((c, index) => (
            <CardStakingOld
              key={`card_${index}`}
              card={c.card}
              unStaked={c.unStaked}
              currentProcessingCardId={selectedCardId}
              onUnStake={handleUnStake}
              onStake={handleOpenStakeModalOld}
              loadingUnStake={unStakeLoading}
              approved={approved}
              loadingApprove={approveLoading}
              onApprove={handleApproveAll}
            />
          ))}
      </CardContainer>
    </StakePageContainer>
  );
};

const StakePageContainer = styled.div`
  width: 100vw;
  max-width: 100%;

  .nav-pills {
    margin: 0px;
  }

  .nav-pills .nav-item .nav-link {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

const NFTStakeModalMask = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  background: #000;
  opacity: 0.9;
  z-index: 100;
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 20px;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }

  .menu-actions {
    display: flex;
    padding-left: 20px;

    .menu-item {
      width: 210px;
      height: 32px;
      padding-left: 40px;
      padding-top: 6px;
    }

    .selected-card-count {
      background-image: url("/static/images/bg/pages/stake/title.png");
      background-size: 100% 100%;
      font-family: Orbitron-Black;
      color: #fec100;
    }

    .unstake-button {
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

export default NFTStakingOld;
