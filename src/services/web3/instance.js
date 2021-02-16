import {
  DEV_LPSTAKING_ADDRESS,
  PROD_LPSTAKING_ADDRESS,
  DEV_LPSTAKING_ABI,
  PROD_LPSTAKING_ABI,
  DEV_NDR_ABI,
  PROD_NDR_ABI,
  DEV_NDR_ADDRESS,
  PROD_NDR_ADDRESS,
  DEV_UNISWAPV2PAIR_ABI,
  PROD_UNISWAPV2PAIR_ABI,
  DEV_UNISWAPV2PAIR_ADDRESS,
  PROD_UNISWAPV2PAIR_ADDRESS,
  DEV_NFT_ADDRESS,
  PROD_NFT_ADDRESS,
  DEV_NFT_ABI,
  PROD_NFT_ABI,
  DEV_NFT_STAKING_ADDRESS,
  PROD_NFT_STAKING_ADDRESS,
  DEV_NFT_STAKING_ABI,
  PROD_NFT_STAKING_ABI
} from "../../helper/contract";

import {
  DEV_NFT_OLD_ADDRESS,
  PROD_NFT_OLD_ADDRESS,
  DEV_NFT_OLD_ABI,
  PROD_NFT_OLD_ABI,
  DEV_NFT_STAKING_OLD_ADDRESS,
  PROD_NFT_STAKING_OLD_ADDRESS,
  DEV_NFT_STAKING_OLD_ABI,
  PROD_NFT_STAKING_OLD_ABI,
  DEV_LPSTAKING_OLD_ABI,
  PROD_LPSTAKING_OLD_ABI,
  DEV_LPSTAKING_OLD_ADDRESS,
  PROD_LPSTAKING_OLD_ADDRESS,
} from "../../helper/contractOld";

import { farms } from "../../helper/contractFarm";
import { partnerNFTs } from "../../helper/contractPartner";

const { REACT_APP_BUILD_MODE } = process.env;

export const getLPStakingInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_LPSTAKING_ABI;
    address = DEV_LPSTAKING_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_LPSTAKING_ABI;
    address = PROD_LPSTAKING_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getOldLPStakingInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_LPSTAKING_OLD_ABI;
    address = DEV_LPSTAKING_OLD_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_LPSTAKING_OLD_ABI;
    address = PROD_LPSTAKING_OLD_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getOldNFTInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NFT_OLD_ABI;
    address = DEV_NFT_OLD_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NFT_OLD_ABI;
    address = PROD_NFT_OLD_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getOldNFTStakingInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NFT_STAKING_OLD_ABI;
    address = DEV_NFT_STAKING_OLD_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NFT_STAKING_OLD_ABI;
    address = PROD_NFT_STAKING_OLD_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getNDRInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NDR_ABI;
    address = DEV_NDR_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NDR_ABI;
    address = PROD_NDR_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getUniInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_UNISWAPV2PAIR_ABI;
    address = DEV_UNISWAPV2PAIR_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_UNISWAPV2PAIR_ABI;
    address = PROD_UNISWAPV2PAIR_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getFarmInstance = (web3, token) => {
  const farmData =
    REACT_APP_BUILD_MODE === "production"
      ? farms[token].prod
      : farms[token].dev;

  return {
    staking: {
      address: farmData.staking.address,
      abi: farmData.staking.abi,
      instance: new web3.eth.Contract(
        farmData.staking.abi,
        farmData.staking.address
      ),
      prodAddress: farms[token].prod.staking.address,
    },
    token: {
      address: farmData.token.address,
      abi: farmData.token.abi,
      instance: new web3.eth.Contract(
        farmData.token.abi,
        farmData.token.address
      ),
      prodAddress: farms[token].prod.token.address,
    },
  };
};

export const getNFTInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NFT_ABI;
    address = DEV_NFT_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NFT_ABI;
    address = PROD_NFT_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getNFTStakingInstance = (web3) => {
  let abi;
  let instance;
  let address;

  if (REACT_APP_BUILD_MODE === "development") {
    abi = DEV_NFT_STAKING_ABI;
    address = DEV_NFT_STAKING_ADDRESS;
  } else if (REACT_APP_BUILD_MODE === "production") {
    abi = PROD_NFT_STAKING_ABI;
    address = PROD_NFT_STAKING_ADDRESS;
  }

  instance = new web3.eth.Contract(abi, address);

  return {
    address,
    abi,
    instance,
  };
};

export const getPartnerNFTInstance = (web3, token) => {
  const partnerData =
    REACT_APP_BUILD_MODE === "production"
      ? partnerNFTs[token].prod
      : partnerNFTs[token].dev;

  return {
    token: {
      address: partnerData.token,
      abi: partnerData.tokenAbi,
      instance: new web3.eth.Contract(partnerData.tokenAbi, partnerData.token)
    },
    staking: {
      address: partnerData.staking,
      abi: partnerData.stakingAbi,
      instance: new web3.eth.Contract(partnerData.stakingAbi, partnerData.staking)
    }
  };
};
