// LpStaking (NEW POOL)
import DEV_LPSTAKING_ABI from "./json/LpStaking_new_abi_dev.json";
import PROD_LPSTAKING_ABI from "./json/LpStaking_new_abi_prod.json";

// UniswapV2Pair
import DEV_UNISWAPV2PAIR_ABI from "./json/UniswapV2Pair_abi_dev.json";
import PROD_UNISWAPV2PAIR_ABI from "./json/UniswapV2Pair_abi_prod.json";

// NDR
import DEV_NDR_ABI from "./json/NDR_abi_dev.json";
import PROD_NDR_ABI from "./json/NDR_abi_prod.json";

// NFT
import DEV_NFT_ABI from "./json/NFT_abi_dev.json";
import PROD_NFT_ABI from "./json/NFT_abi_prod.json";

// NFT Staking (Main)
import DEV_NFT_STAKING_ABI from "./json/NFTStaking_abi_dev.json";
import PROD_NFT_STAKING_ABI from "./json/NFTStaking_abi_prod.json";

// LpStaking (new lp pool)
export const DEV_LPSTAKING_ADDRESS = "0xD60D9b25E891a6757460EC2Fd7Dd80e5fE637071";
export const PROD_LPSTAKING_ADDRESS = "0x2c92744a0428e405e95dc3eb812e1b87872b22eb";
export { DEV_LPSTAKING_ABI, PROD_LPSTAKING_ABI };

// UniswapV2Pair (lp token NDRWETH)
export const DEV_UNISWAPV2PAIR_ADDRESS = "0x14c8177245407380d93c501b3e5bec4f228bcc69";   // Rinkeby
// export const DEV_UNISWAPV2PAIR_ADDRESS = "0x4c1ee33627aac7bf637a716438f0df64696d146f";   // Ropstein
export const PROD_UNISWAPV2PAIR_ADDRESS = "0x65d0A154D2425CE2Fd5fED3BdaE94D9a9aFE55CE";
export { DEV_UNISWAPV2PAIR_ABI, PROD_UNISWAPV2PAIR_ABI };

// NDR (ndr token)
export const DEV_NDR_ADDRESS = "0x29326F9050Be6DF0eC285d55476dF4906c82DA1e"; // Rinkeby
// export const DEV_NDR_ADDRESS = "0xbCe7A4482EE4fe54f777fBbEbdb2eDdE16e5120F";  // Ropstein
export const PROD_NDR_ADDRESS = "0x739763a258640919981F9bA610AE65492455bE53";
export { DEV_NDR_ABI, PROD_NDR_ABI };

// NFT TOKEN
export const DEV_NFT_ADDRESS = "0x7fcc8188ef983bc54e7d50c4d46d20ca0174cc37";
export const PROD_NFT_ADDRESS = "0x89ee76cc25fcbf1714ed575faa6a10202b71c26a";
export { DEV_NFT_ABI, PROD_NFT_ABI };

// NFT Staking
export const DEV_NFT_STAKING_ADDRESS = "0x8d38f755ade31055007c4fb49ff1f06639df0876";
export const PROD_NFT_STAKING_ADDRESS = "0x81b6a8bf87817adca4874838560966957c3e01e5";
export { DEV_NFT_STAKING_ABI, PROD_NFT_STAKING_ABI };

// web3 provider (not using for now)
export const DEV_WEB3_WEBSOCKET_PROVIDER = "wss://kovan.infura.io/ws/v3/235035a10d0a4a9eadc71fff0c1240dc";
export const PROD_WEB3_WEBSOCKET_PROVIDER = "wss://mainnet.infura.io/ws/v3/235035a10d0a4a9eadc71fff0c1240dc";

// WETH (MainNet)
export const WETH_TOKEN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// Gas price multiplier
export const GAS_PRICE_MULTIPLIER = 1.1;
export const CARD_STRENGTH_MULTIPLIER = 100;

export const getGasFee = (gasPrice) => {
  return Math.round(gasPrice * GAS_PRICE_MULTIPLIER);
}
