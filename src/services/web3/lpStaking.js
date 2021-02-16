import { getGasPrice } from "../web3";
import { getGasFee } from "../../helper/contract";

export const getEarningAsync = async (instance, address) => {
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

export const getRewardRateAsync = async (instance, address) => {
  return await instance.methods
    .rewardRate()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getRewardAsync = async (instance, address) => {
  return await instance.methods
    .rewards(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getBalanceAsync = async (instance, address) => {
  return await instance.methods
    .balanceOf(address)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllowanceAsync = async (instance, owner, sender) => {
  return await instance.methods
    .allowance(owner, sender)
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTotalSupplyAsync = async (instance) => {
  return await instance.methods
    .totalSupply()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getReservesAsync = async (instance) => {
  return await instance.methods
    .getReserves()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getReleaseTimeAsync = async (instance) => {
  return await instance.methods
    .releaseTime()
    .call()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const depositAsync = async (instance, web3, amount, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .stake(amount.toString())
    .estimateGas({ from: address });

  return await instance.methods
    .stake(amount.toString())
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

export const withdrawAsync = async (instance, web3, amount, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .withdraw(amount.toString())
    .estimateGas({ from: address });

  return await instance.methods
    .withdraw(amount.toString())
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

export const approveAsync = async (
  instance,
  web3,
  amount,
  address,
  spender
) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .approve(
      spender,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .estimateGas({ from: address });

  return await instance.methods
    .approve(
      spender,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
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

// Claim Token
export const claimAsync = async (instance, web3, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .getReward()
    .estimateGas({ from: address });

  return await instance.methods
    .getReward()
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

// Claim Token with FEE
export const claimWithFeeAsync = async (instance, web3, fee, address) => {
  const prices = await getGasPrice();
  // Get gas limit
  const gasLimit = await instance.methods
    .getReward()
    .estimateGas({ value: fee.toString(), from: address });

  return await instance.methods
    .getReward()
    .send({
      value: fee.toString(),
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

// Exit Token
export const exitAsync = async (instance, web3, address) => {
  const prices = await getGasPrice();

  // Get gas limit
  const gasLimit = await instance.methods
    .exit()
    .estimateGas({ from: address });

  return await instance.methods
    .exit()
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