import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useWallet } from "use-wallet";

import styled from "styled-components";

const UnlockWallet = ({ history }) => {
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      history.push("/get-heroes");
    }
  }, [account, history]);

  return (
    <>
      {!account && (
        <UnlockWalletWrapper>
          <div
            role="button"
            className="meta-mask d-flex flex-column align-items-center justify-content-center"
            onClick={(e) => connect()}
          >
            <img src={`/static/images/icons/meta-mask.png`} alt="meta-mask" />
            <p>
              Connect to your <span>MetaMask</span> wallet
            </p>
          </div>
          <div
            role="button"
            onClick={(e) => connect("walletconnect")}
            className="wallet-connect d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src={`/static/images/icons/wallet-connect.png`}
              alt="wallet-connect"
            />
            <p>
              Scan with <span>WalletConnect</span> to connect
            </p>
          </div>
        </UnlockWalletWrapper>
      )}
    </>
  );
};

const UnlockWalletWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: calc(100vh - 73px);

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  // padding-top: 150px;

  @media screen and (max-width: 1080px) {
    // margin-top: -50px;
  }

  > div {
    width: 70%;
    height: 270px;
    background-size: 100% 100%;
    cursor: pointer;
    padding: 0px 16px;

    @media screen and (max-width: 1024px) {
      img {
        width: 100px;
      }

      p {
        font-size: 14px;
      }
    }

    @media screen and (max-width: 768px) {
      width: 90%;

      img {
        width: 70px;
      }

      p {
        font-size: 12px;
      }
    }

    p {
      font-size: 20px;
      font-family: Orbitron-Medium;
      text-align: center;
    }

    span {
      font-size: 24px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.secondary.main};
    }

    &:first-of-type {
      background-image: url("/static/images/bg/pages/unlock-wallet/meta-mask.png");
      text-shadow: 10px 10px 10px
        ${(props) =>
          props.theme.darken(props.theme.palette.secondary.main, 0.57)};

      p {
        color: #ff24c8;
      }
    }

    &:last-of-type {
      background-image: url("/static/images/bg/pages/unlock-wallet/wallet-connect.png");
      text-shadow: 10px 10px 10px
        ${(props) => props.theme.darken(props.theme.palette.primary.main, 0.57)};

      p {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
`;

export default withRouter(UnlockWallet);
