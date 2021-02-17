import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import lpstakingActions from "../../redux/lpstaking/actions";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const getCurrentUrl = (location) => {
    return location.pathname.split(/[?#]/)[0];
  };

  const checkIsActive = (location, url) => {
    const current = getCurrentUrl(location);

    if (!current || !url) {
      return false;
    }

    if (current === url || (current === "/" && url === "home")) {
      return true;
    }

    return current.indexOf(url) > -1;
  };

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "active" : "";
  };

  const getMenuName = () => {
    if (getMenuItemActive("home")) {
      return "Home";
    }

    if (getMenuItemActive("stake")) {
      return "Stake";
    }

    if (getMenuItemActive("get-heroes")) {
      return "Get Cards";
    }

    if (getMenuItemActive("farm")) {
      return "Farm";
    }

    if (getMenuItemActive("fight-villains")) {
      return "Fight Villains";
    }

    return "";
  };

  return (
    <HeaderWrapper>
      <div className="logo-wrapper">
        {/* <img className="icon-btn" src="/static/images/icons/burger.png" alt="burger" /> */}
        <img className="logo" src="/static/images/logo/logo.png" alt="logo"/>
        {/* <img className="icon-btn" src="/static/images/icons/wallet.png" alt="wallet" /> */}
      </div>
      {/* <div className="menu-wrapper">
        <ul className="menu-nav">
          <li className="menu-nav-item">
            <NavLink to="" className="menu-nav-link">HOME</NavLink>
          </li>
          <li className="menu-nav-item">
            <NavLink to="" className="menu-nav-link">STAKE & EARN</NavLink>
          </li>
          <li className="menu-nav-item">
            <NavLink to="" className="menu-nav-link">DROPS</NavLink>
          </li>
        </ul>
      </div>
      <div className="wallet-wrapper">
        <div className="wallet-balance">
          <div>ETH: 20</div>
          <div>dPoints: 1000</div>
        </div>
        <div className="wallet-info">MY WALLET</div>
      </div> */}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 96px;
  align-items: center;
  background: #fff;

  .logo-wrapper {
    width: 160px;
    padding-left: 60px;

    .logo {
      width: 100px;
      height: 23px;
    }

    .icon-btn {
      display: none;
    }

    @media screen and (max-width: 768px) {
      padding-left: 20px;  
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      width: 100%;

      .icon-btn {
        display: block;
      }
    }
  }

  .wallet-wrapper {
    display: flex;
    align-items: center;
    padding-right: 60px;
    border-left: 1px solid #B7B7D6;
    height: 68px;
    padding-left: 30px;
    
    @media screen and (max-width: 768px) {
      display: none;
    }

    .wallet-balance {
      font-size: 14px;
      font-weight: 600;
      opacity: 0.4;
    }

    .wallet-info {
      font-size: 1rem;
      font-weight: 400;
      margin-left: 30px;
      cursor: pointer;
      width: 100px;

      &:hover {
        font-weight: 600;
      }
    }
  }

  .menu-wrapper {
    flex: 1;

    @media screen and (max-width: 768px) {
      display: none;
    }
    
    .menu-nav {
      display: flex;
      justify-content: center;
      
      &-item {
        list-style-type: none;
        width: 150px;
        text-align: center;
      }

      &-link {
        text-decoration: none;
        font-size: 1rem;
        color: #282B49;


        &:hover {
          font-weight: 700;
        }
      }
    }
  }
`;

export default Header;
