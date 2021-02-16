import React, { useState } from "react";

import styled from "styled-components";
import { Reply, ShoppingCart } from "@material-ui/icons";

import ModalMask from "../../component/ModalMask";

const Stake = ({
  allowance,
  balance,
  hashes,
  staked,
  stat,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenOldWithdraw,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  const handleOpenDeposit = (e) => {
    e.preventDefault();
    onOpenDeposit();
  };

  const handleOpenWithdraw = (e) => {
    e.preventDefault();
    onOpenWithdraw();
  };

  // const handleOpenOldWithdraw = (e) => {
  //   e.preventDefault();
  //   onOpenOldWithdraw();
  // };

  const handleOpenHelp = (e) => {
    e.preventDefault();
    setShowHelp(!showHelp);
  };

  return (
    <StakeWrapper>
      {showHelp && <ModalMask onClose={() => setShowHelp(false)} />}
      <div className="stake-wrapper animation-slideDown">
        <a
          className="b-control b-help action"
          href="/"
          onClick={(e) => handleOpenHelp(e)}
          style={{ zIndex: 200 }}
        >
          {showHelp ? <span>X</span> : <span>?</span>}
        </a>
        <div className="stat">
          <div className="section top">
            <div id="tvl" className="b-control credit">
              <label className="stat-info">TVL:</label>
              <span className="stat-info">{`$ ${stat.tvl}`}</span>
            </div>
            <div id="uni_lp" className="b-control credit">
              <label className="stat-info">1 UNI-LP:</label>
              <span className="stat-info">{`${stat.lpPriceNDR} NDR ${stat.lpPriceETH} ETH`}</span>
            </div>
          </div>
          <div className="section">
            <div id="ndr" className="b-control credit">
              <div>
                <label>Hashes</label>
                <span>{hashes}</span>
              </div>
              <div>
                <label>Per Day</label>
                <span>{((staked / 2.25) * 10).toFixed(2)}</span>
              </div>
            </div>
            <div id="stake" className="b-control credit">
              <div>
                <label>UNI-LP Staked</label>
                <span>{staked}</span>
              </div>
              <div>
                <label>UNI-LP Balance</label>
                <span>{balance}</span>
              </div>
            </div>
          </div>
          {showHelp && (
            <div className="help" onClick={(e) => setShowHelp(false)}>
              <p>
                On this page you can purchase Node Runners cards which you can
                later stake to earn NDR tokens. You can buy a card with ETH or
                purchase it for “Hashes”. When you buy it with ETH, 90% of funds
                are used to buyback NDR and lock liquidity in 1 transaction.
              </p>
              <p>
                To obtain “Hashes” you need to provide liquidity by adding
                tokens to Uniswap NDR/ETH pair. Liquidity on Uniswap can be{" "}
                <strong>
                  <a
                    href="https://app.uniswap.org/#/add/0x739763a258640919981f9ba610ae65492455be53/ETH"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    provided here.
                  </a>{` `}
                </strong>
                . You will then obtain at least 1 NDR/ETH UNI-LP token, that can
                be staked on this page to earn "Hashes". 1 LP value is shown on
                this page.
              </p>
              <p>
                Once you have 1 UNI-LP token, click stake, input desired amount,
                approve and click stake again. 1 LP token will yield you 4.44
                “Hashes” per day. Maximum amount to stake is 22.5 LP tokens.
                Once you farmed “Hashes” you can use them to purchase cards.
              </p>
              <p>
                <a
                  rel="noopener noreferrer"
                  href="https://bit.ly/ndr-guide"
                  target="_blank"
                >
                  Read the full guide here.
                </a>
              </p>
            </div>
          )}
          <div className="section">
            <a
              className="b-control action"
              href="https://app.zerion.io/market/asset/UNI-V2-0x65d0a154d2425ce2fd5fed3bdae94d9a9afe55ce"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShoppingCart />
              <span>GET UNI-LP</span>
            </a>
            <a
              className="b-control action"
              href="https://info.uniswap.org/pair/0x65d0a154d2425ce2fd5fed3bdae94d9a9afe55ce"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShoppingCart />
              <span>BUY NDR</span>
            </a>
            <a
              className="b-control action"
              href="/"
              onClick={(e) => handleOpenDeposit(e)}
            >
              <Reply />
              <span>STAKE</span>
            </a>
            <a
              className="b-control action"
              href="/"
              onClick={(e) => handleOpenWithdraw(e)}
              title="There is a 2% LP withdrawal fee."
            >
              <Reply />
              <span>UNSTAKE</span>
            </a>
          </div>
        </div>
        {/* <a
          className="action"
          href="/"
          onClick={(e) => handleOpenOldWithdraw(e)}
        >
          <span>Exit Old</span>
          <span>Pool</span>
        </a> */}
      </div>
    </StakeWrapper>
  );
};

const StakeWrapper = styled.div`
  display: flex;
  justify-content: center;

  .stake-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;

    @media screen and (max-width: 840px) {
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      padding: 0px 20px;

      .stat {
        width: 100%;
      }
    }

    .section {
      display: flex;
      flex-direction: row;
      margin-top: -16px;

      @media screen and (max-width: 840px) {
        flex-flow: row wrap;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-top: -4px;
      }

      &.top {
        margin-top: 0px;
      }

      #tvl {
        height: 56px;
        margin-right: -17.6px;

        @media screen and (max-width: 840px) {
          margin-right: 0px;
          width: 80%;
        }

        @media screen and (max-width: 600px) {
          width: 100%;
        }
      }

      #uni_lp {
        width: 440px;
        height: 56px;

        @media screen and (max-width: 840px) {
          margin-top: -4px;
          width: 425px;
          width: 80%;
        }
        @media screen and (max-width: 600px) {
          width: 100%;
          height: 70px;
        }
      }

      #ndr {
        margin-right: -17.6px;
        @media screen and (max-width: 840px) {
          width: 80%;
          margin-right: 0px;
        }
        @media screen and (max-width: 600px) {
          width: 100%;
        }
      }

      #stake {
        width: 440px;
        @media screen and (max-width: 840px) {
          width: 80%;
          margin-top: -4px;
          margin-bottom: 20px;
        }
        @media screen and (max-width: 600px) {
          width: 100%;
        }
      }
    }

    .help {
      position: absolute;
      border: 6px solid #cd3ed5;
      width: 724px;
      margin-top: -20px;
      padding: 16px;
      color: #fff;
      font-family: Orbitron-Medium;
      font-size: 1rem;
      z-index: 1000;

      p {
        word-break: break-all;

        a {
          color: #80f1ed;
        }
      }

      @media screen and (max-width: 840px) {
        width: 100vw;
        max-width: 100%;
        height: 100vh;
        opacity: 0.9;
        left: 0px;
        top: 0px;
        margin-top: 0px;
        background: #1e1e1e;
        font-size: 1.2rem;
        line-height: 2rem;
        overflow-y: auto;
      }
    }

    .b-control {
      color: #212529;
      text-decoration: none;

      span {
        font-size: 16px;
        // max-width: 157px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 201.6px;
        height: 80.4px;
        margin-right: -19.2px;
        padding: 0 13.6px 17.6px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-content: center;
        cursor: pointer;
        text-align: center;

        @media screen and (max-width: 840px) {
          background-image: none;
          background: #80f1ed;
          margin-right: 0px;
          width: calc(40% - 5px);
          height: 80px;
          padding: 0px 0px 0px 0px;
          box-shadow: 0px 10px 10px #80f1ed91;
          box-sizing: border-box;
          margin-bottom: 20px;

          &:nth-child(1),
          &:nth-child(3) {
            margin-right: 5px;
          }

          &:nth-child(2),
          &:nth-child(4) {
            margin-left: 5px;
          }
        }

        @media screen and (max-width: 600px) {
          width: calc(50% - 5px);
          flex-direction: row;
        }

        @media screen and (max-width: 400px) {
          width: 100%;
          height: 50px;
          margin-bottom: 10px;

          &:nth-child(1),
          &:nth-child(3) {
            margin-right: 0px;
          }

          &:nth-child(2),
          &:nth-child(4) {
            margin-left: 0px;
          }
        }

        svg {
          width: 36px;
          height: 36px;
        }

        &.b-help {
          background: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          background-size: 100% 100%;
          width: 80px;
          color: #fec100;
          margin-right: -3px;

          @media screen and (max-width: 840px) {
            width: 80%;
            background: #db34ce;
            box-shadow: 0px 10px 10px #db34ce91;
            height: 65px;
            margin-right: 0px;
          }

          @media screen and (max-width: 600px) {
            width: 100%;
          }

          @media screen and (max-width: 400px) {
            height: 50px;
          }

          span {
            font-size: 2.5rem;
            padding-left: 5px;
          }
        }

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          color: #fec100;

          @media screen and (max-width: 840px) {
            background-image: none;
            color: #000;
          }
        }

        &:nth-child(3) {
          .MuiSvgIcon-root {
            transform: rotateY(180deg);
          }
        }
      }

      &.credit {
        background: url("/static/images/bg/pages/get-heroes/credit-bg.png");
        background-size: 100% 100%;
        margin-right: -13px;
        padding: 6px 22px 26px 10px;
        min-width: 320px;
        text-shadow: 10px 10px 10px #80f1ed91;
        display: flex;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;

        @media screen and (max-width: 840px) {
          margin-right: 0px;
          background: none;
          border: 4px solid #80f1ed;
          padding: 0px 8px 0px 8px;
        }

        @media screen and (max-width: 470px) {
          height: 80px;
        }

        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-content: center;
        }

        label {
          color: #80f1ed;
          font-size: 1.2rem;
          font-family: Orbitron-Medium;
          line-height: 1;
          margin-bottom: 8px;

          @media screen and (max-width: 470px) {
            font-size: 1rem;
          }

          @media screen and (max-width: 400px) {
            font-size: 0.8rem;
          }

          &.stat-info {
            margin-bottom: 0px;
            padding-top: 3px;
            font-family: Orbitron-Black;
          }
        }

        span {
          color: #fec100;
          font-size: 1.4rem;
          font-family: Orbitron-Black;
          line-height: 1;
          padding-left: 9px;
          padding-top: 4px;
          margin: 0;
          text-shadow: inherit;

          @media screen and (max-width: 470px) {
            font-size: 1.2rem;
          }

          @media screen and (max-width: 400px) {
            font-size: 1rem;
          }

          &.stat-info {
            padding-top: 3px;
          }
        }
      }
    }
  }
`;

export default Stake;
