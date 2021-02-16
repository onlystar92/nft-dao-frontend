import { CARD_TYPE } from "./constant";

export const getValueFromObject = (obj, key, def = null) => {
  if (obj === null) {
    return def;
  }

  if (key in obj) {
    return obj[key];
  }

  return def;
};

export const convertFromWei = (val, fixed = 4) =>
  (Number(val !== null ? val : 0) / Math.pow(10, 18)).toFixed(fixed);

export const cardCompare = (a, b) => {
  let aScore = 0;
  let bScore = 0;

  if (CARD_TYPE.HERO.includes(a.series)) aScore += 10000;
  if (CARD_TYPE.HERO.includes(b.series)) bScore += 10000;

  aScore += a.rarity.weight;
  bScore += b.rarity.weight;

  if (aScore > bScore) return -1;
  if (bScore > aScore) return 1;

  return 0;
};

export const getCardType = (card) => {
  let cardType = "";
  if (
    CARD_TYPE.HERO.includes(card.series) ||
    CARD_TYPE.BADGE.includes(card.series)
  ) {
    cardType = "hero";
  }
  if (CARD_TYPE.SUPPORT.includes(card.series)) {
    cardType = "support";
  }

  return cardType;
};
