import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UseWalletProvider } from "use-wallet";


import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import defaultTheme from "./theme";
import Routes from "./routes/Routes";

import { getNetworkChainId } from "./helper/constant";

import "./vendor/index.scss";

const App = () => {
  return (
    <StylesProvider injectFirst>
      <UseWalletProvider
        chainId={getNetworkChainId()}
      // connectors={{
      //   walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
      // }}
      >
        <Router>
          <Routes />
          <ToastContainer />
        </Router>
      </UseWalletProvider>
    </StylesProvider>
  );
};

export default App;
