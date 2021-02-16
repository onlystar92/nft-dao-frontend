import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = ({ type, text, color }) => {
  return (
    <LoadingWrapper>
      <ReactLoading type={type} color={color} />
      <span>{text}</span>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  font-family: Orbitron-Black;
  text-shadow: 5px 5px 3px #27787580;
  color: #fec100;
`;

export default Loading;
