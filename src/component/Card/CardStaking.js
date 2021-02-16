import React, { useMemo } from "react";
import styled from "styled-components";

const CardStaking = ({
  card,
  unStaked,
  onSelectCard,
  selectedCardIds,
  strength
}) => {
  const handleClickCard = () => {
    if (unStaked) return;
    onSelectCard(card.id)
  };

  const isSelected = useMemo(() => {
    if (card) {
      const index = selectedCardIds.findIndex((id) => id === card.id)
      return index >= 0;
    }

    return false;
  }, [card, selectedCardIds])

  return (
    <CardWrapper>
      <div className={`card ${unStaked ? '' : 'hover'} ${isSelected ? 'active' : ''}`}>
        {unStaked ? (
          <img
            src={`/static/images/bg/components/card/un-staked.png`}
            alt="unStaked"
            className="un-staked"
          />
        ) : (
            <img src={card.image} alt={`${card}`} className="card-image" />
          )}
        <div className="card-border" onClick={(e) => handleClickCard()}></div>
      </div>
      {strength && <div className="strength-text">
        <label>Strength:</label>
        <span>{card.strength}</span>
      </div>}
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
    cursor: not-allowed;

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
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    &.active {
      .card-border {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
    }

    &.hover {
      cursor: pointer;

      // &:hover{
      //   .card-border {
      //     background: url("/static/images/bg/components/card/card-border--active.png");
      //     background-size: cover;
      //   }
      // }
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

export default CardStaking;
