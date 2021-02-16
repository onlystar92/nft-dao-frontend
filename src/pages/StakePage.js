import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import UnlockWalletPage from "./UnlockWalletPage";
import NFTStaking from "../container/NFTStakingPage";
import CustomNFTStaking from "../container/CustomNFTStaking";

import { CUSTOM_NFT } from "../helper/constant";

import cardsActions from "../redux/cards/actions";
import memeStakingActions from "../redux/customNFTStaking/actions";

const Stake = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.getCards());
    dispatch(memeStakingActions.getCustomCards());
  }, [dispatch]);

  const { account } = useWallet();
  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <StakePageContainer>
      <NFTStaking />
      <CustomNFTStaking icon={"icons/meme.png"} nftToken={CUSTOM_NFT.MEME} />
      <CustomNFTStaking icon={"icons/doki.png"} nftToken={CUSTOM_NFT.DOKI} />
    </StakePageContainer>
  );
};

const StakePageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  padding-top: 30px;

  .nav-pills {
    margin: 0px;
  }

  .nav-pills .nav-item .nav-link {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

export default Stake;
