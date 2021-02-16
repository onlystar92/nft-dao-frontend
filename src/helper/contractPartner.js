import * as Contract from "./contract";

// MEME NFT
import MEME_ABI from "./jsonPartner/MEME_abi.json";

// DOKI NFT
import DOKI_ABI from "./jsonPartner/DOKI_abi.json";

// Meme Staking abi
import DEV_MEME_STAKING_ABI from "./json/MEMEStaking_abi_dev.json";
import PROD_MEME_STAKING_ABI from "./json/MEMEStaking_abi_prod.json";

// Doki Staking abi
import DEV_DOKI_STAKING_ABI from "./jsonPartner/DOKI_NFT_Staking_abi.json";
import PROD_DOKI_STAKING_ABI from "./jsonPartner/DOKI_NFT_Staking_abi.json";

// MEME Staking
export const DEV_MEME_STAKING_ADDRESS = "0x177e145cE88FE047C3B6A57C59a19103257e7912";
export const PROD_MEME_STAKING_ADDRESS = "0x28f99f6242fe892a7a611c768c0007e5f3a496be";
export { DEV_MEME_STAKING_ABI, PROD_MEME_STAKING_ABI };

export const MEME_NFT_ADDRESS = "0xe4605d46fd0b3f8329d936a8b258d69276cba264";

// MEME Staking
export const DEV_DOKI_STAKING_ADDRESS = "0x177e145cE88FE047C3B6A57C59a19103257e7912";
export const PROD_DOKI_STAKING_ADDRESS = "0x69b35e0072dC5A9e7F868d8f98012cA19FA6b3fd";
export { DEV_DOKI_STAKING_ABI, PROD_DOKI_STAKING_ABI };

export const DOKI_NFT_ADDRESS = "0x7CdC0421469398e0F3aA8890693d86c840Ac8931";

// For dev: Test with nft
export const partnerNFTs = {
  MEME: {
    title: "MEME",
    dev: {
      token: Contract.DEV_NFT_ADDRESS,
      tokenAbi: Contract.DEV_NFT_ABI,
      staking: DEV_MEME_STAKING_ADDRESS,
      stakingAbi: DEV_MEME_STAKING_ABI
    },
    prod: {
      token: MEME_NFT_ADDRESS,
      tokenAbi: MEME_ABI,
      staking: PROD_MEME_STAKING_ADDRESS,
      stakingAbi: PROD_MEME_STAKING_ABI
    },
  },
  DOKI: {
    title: "DOKI",
    dev: {
      token: Contract.DEV_NFT_ADDRESS,
      tokenAbi: Contract.DEV_NFT_ABI,
      staking: DEV_MEME_STAKING_ADDRESS,
      stakingAbi: DEV_MEME_STAKING_ABI
    },
    prod: {
      token: DOKI_NFT_ADDRESS,
      tokenAbi: DOKI_ABI,
      staking: PROD_DOKI_STAKING_ADDRESS,
      stakingAbi: PROD_DOKI_STAKING_ABI
    },
  },
};
