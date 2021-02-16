import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { toast } from "react-toastify";

import SectionTitleMenu from "../component/SectionTitleMenu";
import CardBuying from "../component/Card/CardBuying";
import LPStakingBoard from "../container/LPStakingBoard";

import UnlockWalletPage from "./UnlockWalletPage";

import cardsActions from "../redux/cards/actions";
import lpstakingActions from "../redux/lpstaking/actions";
import { RESPONSE, CARD_TYPE, CARD_SUB_SERIES } from "../helper/constant";
import { getCardType } from "../helper/utils";

import cx from "classnames";

const GetHeroes = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.Cards.cards);
  const cardPrice = useSelector((state) => state.Cards.cardPrice);
  const cardsApy = useSelector((state) => state.Cards.cardsApy);

  const [isBuyingHash, setBuyingHash] = useState(false);
  const [isBuyingEth, setBuyingEth] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  const [cardFilter, setCardFilter] = useState("All");
  const [subCardFilter, setSubCardFilter] = useState("All");

  // Timer to get price and minted count frequently - 30s
  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      dispatch(cardsActions.getMintedCount(cards));
      dispatch(cardsActions.getCardsPrice());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch, cards]);

  useEffect(() => {
    dispatch(cardsActions.getCards());
    dispatch(cardsActions.getCardsPrice());
  }, [dispatch]);

  useEffect(() => {
    if (cards.length > 0) {
      dispatch(cardsActions.getCardsApy(cards, cardPrice));
    }
  }, [cards, cardPrice, dispatch]);

  const handleBuyCardEth = (card) => {
    setBuyingEth(true);
    setSelectedCardId(card.id);
    dispatch(cardsActions.buyHeroCardEth(card, callbackBuyCardEth));
  };

  const handleBuyCardHash = (card) => {
    setBuyingHash(true);
    setSelectedCardId(card.id);
    dispatch(cardsActions.buyHeroCardHash(card, callbackBuyCardHash));
  };

  const callbackBuyCardHash = (status) => {
    setBuyingHash(false);
    setSelectedCardId(0);
    if (status === RESPONSE.SUCCESS) {
      toast.success("Success");
      dispatch(lpstakingActions.getEarningAmount());
      dispatch(cardsActions.getMintedCount(cards));
    } else if (status === RESPONSE.INSUFFICIENT) {
      toast.error("You have not enough Hash");
    } else {
      toast.error("Failed...");
    }
  };

  const callbackBuyCardEth = (status) => {
    setBuyingEth(false);
    setSelectedCardId(0);
    if (status === RESPONSE.SUCCESS) {
      toast.success("Success");
      dispatch(cardsActions.getMintedCount(cards));
    } else if (status === RESPONSE.INSUFFICIENT) {
      toast.error("You have not enough ETH");
    } else {
      toast.error("Failed...");
    }
  };

  const { account } = useWallet();

  const filteredCardList = useMemo(() => {
    let ret = [...cards];

    if (cardFilter === "Heroes") {
      ret = ret.filter((c) => CARD_TYPE.HERO.includes(c.series));
    }
    if (cardFilter === "Support") {
      ret = ret.filter((c) => CARD_TYPE.SUPPORT.includes(c.series));
    }
    if (cardFilter === "Badges") {
      ret = ret.filter((c) => CARD_TYPE.BADGE.includes(c.series));
    }
    if (subCardFilter !== "All") {
      ret = ret.filter((c) => c.sub_series === subCardFilter);
    }

    return ret;
  }, [cardFilter, subCardFilter, cards]);

  const subMenuList = useMemo(() => {
    if (cardFilter === "Heroes") {
      return ["All", ...CARD_SUB_SERIES.HERO];
    }
    if (cardFilter === "Support") {
      return ["All", ...CARD_SUB_SERIES.SUPPORT];
    }
    if (cardFilter === "Badges") {
      return ["All", ...CARD_SUB_SERIES.BADGE];
    }
    return [
      "All",
      ...CARD_SUB_SERIES.HERO,
      ...CARD_SUB_SERIES.SUPPORT,
      ...CARD_SUB_SERIES.BADGE,
    ];
  }, [cardFilter]);

  const getCardApyValue = (card) => {
    const cardType = getCardType(card);
    const index = cardsApy.findIndex(
      (element) =>
        element.type === cardType &&
        element.rarity === card.rarity.weight &&
        element.strength === card.strength
    );

    if (index === -1) {
      return 0;
    } else {
      return cardsApy[index].apy;
    }
  };

  const getCardNDRPerDayValue = (card) => {
    const cardType = getCardType(card);
    const index = cardsApy.findIndex(
      (element) =>
        element.type === cardType &&
        element.rarity === card.rarity.weight &&
        element.strength === card.strength
    );

    if (index === -1) {
      return 0;
    } else {
      return cardsApy[index].ndrPerDay;
    }
  };

  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <>
      <LPStakingBoard />
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitleMenu
          data={[
            { title: "All" },
            { title: "Heroes" },
            { title: "Support" },
            { title: "Badges" },
          ]}
          selected={cardFilter}
          onChangeMenu={(selected) => {
            setCardFilter(selected);
            setSubCardFilter("All");
          }}
        />
      </MenuWrapper>
      <MenuWrapper className="animation-fadeInRight">
        {subMenuList.map((menu, index) => (
          <SubMenuLink
            key={index}
            className={cx({ active: menu === subCardFilter })}
            onClick={(e) => {
              e.preventDefault();
              setSubCardFilter(menu);
            }}
          >
            {menu}
          </SubMenuLink>
        ))}
      </MenuWrapper>
      <CardContainer>
        {filteredCardList.map((c) => (
          <CardBuying
            key={`card_${c.id}`}
            card={c}
            onBuyCardEth={handleBuyCardEth}
            onBuyCardHash={handleBuyCardHash}
            isHero={CARD_TYPE.HERO.includes(c.series)}
            eth={
              CARD_TYPE.HERO.includes(c.series)
                ? cardPrice[c.rarity.weight].hero
                : cardPrice[c.rarity.weight].support
            }
            currentProcessingCardId={selectedCardId}
            loadingHash={isBuyingHash}
            loadingEth={isBuyingEth}
            apy={getCardApyValue(c)}
            ndrPerDay={getCardNDRPerDayValue(c)}
          />
        ))}
      </CardContainer>
    </>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 100px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const SubMenuLink = styled.a`
  color: #417977;
  font-size: 1.4rem;
  font-family: Orbitron-Black;
  text-shadow: 4px 4px 2.7px #27787580;
  padding-right: 40px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  &:first-child {
    padding-left: 80px;

    @media screen and (max-width: 768px) {
      padding-left: 0px;
    }
  }

  &:hover {
    color: #80f1ed;
    text-decoration: none;
  }

  &.active {
    color: #80f1ed;
  }
`;
export default GetHeroes;
