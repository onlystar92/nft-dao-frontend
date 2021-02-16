import { getGasPrice } from "../web3";
import { getGasFee } from "../../helper/contract";

export const getHeroPriceAsync = async (instance, rarity) => {
  return await instance.methods
    .getPriceHero(rarity)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getSupportPriceAsync = async (instance, rarity) => {
  return await instance.methods
    .getPriceSupport(rarity)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getCirculatingSupplyAsync = async (instance, tokenId) => {
  return await instance.methods
    .circulatingSupply(tokenId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getOwnedCardsCountAsync = async (instance, address, tokenId) => {
  return await instance.methods
    .balanceOf(address, tokenId)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getOwnedCardsCountMultiAsync = async (instance, addresses, tokenIds) => {
  return await instance.methods
    .balanceOfBatch(addresses, tokenIds)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getStakedStrengthByAddressAsync = async (instance, address) => {
  return await instance.methods
    .strengthWeight(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalStakedStrengthAsync = async (instance) => {
  return await instance.methods
    ._totalStrength()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getClaimFeeAsync = async (instance) => {
  return await instance.methods
    .fee()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getClaimableNDRAsync = async (instance, address) => {
  return await instance.methods
    .earned(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getStakedCardsAsync = async (instance, address) => {
  return await instance.methods
    .stakedOf(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllStakedCardsAsync = async (instance) => {
  return await instance.methods
    .getNftTokens()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getStakedCountByTokenIdAsync = async (instance, tokenId, address) => {
  return await instance.methods
    .balanceByTokenIdOf(tokenId, address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const isApprovedAllAsync = async (instance, address, spenderAddress) => {
  return await instance.methods
    .isApprovedForAll(address, spenderAddress)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Unstake Card
export const unStakeCardAsync = async (instance, web3, tokenId, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdrawNFT(tokenId)
    .estimateGas({ from: address });

  return await instance.methods
    .withdrawNFT(tokenId)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Unstake Card Multi
export const unStakeMultiCardAsync = async (instance, web3, tokenIds, amounts, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdrawNFT(tokenIds, amounts)
    .estimateGas({ from: address });

  return await instance.methods
    .withdrawNFT(tokenIds, amounts)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Unstake All Cards
export const unStakeAllCardsAsync = async (instance, web3, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdraw()
    .estimateGas({ from: address });

  return await instance.methods
    .withdraw()
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Stake Card
export const stakeCardAsync = async (instance, web3, tokenId, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .stake(tokenId)
    .estimateGas({ from: address });

  return await instance.methods
    .stake(tokenId)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Stake Card Multi
export const stakeMultiCardAsync = async (instance, web3, tokenIds, amounts, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .stake(tokenIds, amounts)
    .estimateGas({ from: address });

  return await instance.methods
    .stake(tokenIds, amounts)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

// Approve All Card
export const approveAllCardsAsync = async (
  instance,
  web3,
  spenderAddress,
  approved,
  address
) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .setApprovalForAll(spenderAddress, approved)
    .estimateGas({ from: address });

  return await instance.methods
    .setApprovalForAll(spenderAddress, approved)
    .send({
      from: address,
      gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
      gas: getGasFee(gasLimit),
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
