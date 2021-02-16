export const NETWORK = {
  MAIN: 1,
  ROPSTEIN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
};

export const getNetworkChainId = () => {
  const { REACT_APP_BUILD_MODE } = process.env;

  if (REACT_APP_BUILD_MODE === "production") {
    return NETWORK.MAIN;
  } else {
    return NETWORK.RINKEBY;
    // return NETWORK.ROPSTEIN;
  }
};

export const STAKE_MIN_LIMIT = 1;
export const STAKE_MAX_LIMIT = 22.5;

export const MAX_STAKED_CARD_COUNT = 4;
export const MAX_BONUS_STAKED_CARD_COUNT = 1;

export const RESPONSE = {
  SUCCESS: 100,
  INSUFFICIENT: 200,
  ERROR: 300,
  SHOULD_APPROVE: 400,
  SHOULD_STAKE: 500,
};

export const CARD_HASH_PRICE_UNIT = 25;

export const CARD_SERIES = {
  PEOPLE: "People",
  SUPPORT: "Support",
  BADGE: "Badge"
};

export const CARD_SUB_SERIES = {
  HERO: ['Devs', 'Limited'],
  SUPPORT: ['Wisdom', 'Attack', 'Weapons'],
  BADGE: ['Generic']
}

export const CARD_TYPE = {
  HERO: [CARD_SERIES.PEOPLE],
  SUPPORT: [CARD_SERIES.SUPPORT],
  BADGE: [CARD_SERIES.BADGE]
};

export const CARD_RARITY = {
  LEGENDARY: 64,
  EPIC: 32,
  RARE: 16,
  COMMON: 4,
  BASIC: 1,
};

export const OPENSEA_BUY_LINK = "https://opensea.io/assets/0x89ee76cc25fcbf1714ed575faa6a10202b71c26a/";

export const CUSTOM_NFT = {
  NODERUNNER: 'NODERUNNER',
  MEME: 'MEME',
  DOKI: 'DOKI'
}
