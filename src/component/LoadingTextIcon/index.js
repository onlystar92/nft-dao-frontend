import React from "react";
import styled from "styled-components";

const LoadingTextIcon = ({ loadingText, icon = true, text = true }) => {
  return (
    <LoadingWrapper>
      {icon && <img
        className="loading-icon"
        src="/static/images/icons/loading.gif"
        height="25"
        alt=""
        style={{ marginTop: 0, marginRight: 5 }}
      />}
      <span className="loading-text">{loadingText}</span>
    </LoadingWrapper>
  );
};

export default LoadingTextIcon;

const LoadingWrapper = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  font-family: Orbitron-Medium;
  text-shadow: 5px 5px 3px #27787580;
  color: #161617;

  .loading-text {
    padding-left: 5px;
  }
`;
