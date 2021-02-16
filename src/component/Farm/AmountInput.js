import React from "react";

import styled from "styled-components";

const AmountInput = ({
  className,
  showMin,
  showMax,
  min,
  max,
  value,
  onSetAmount,
}) => {
  return (
    <AmountInputWrapper className={className}>
      {showMin && (
        <div className="min" onClick={e => onSetAmount(min)}>
          MIN
          <br />
          {min}
        </div>
      )}
      <div className="input">
        <input
          type="text"
          className="input-amount"
          value={value}
          onChange={(e) => onSetAmount(e.target.value)}
        />
      </div>
      {showMax && (
        <div className="max" onClick={e => onSetAmount(max > 0 ? max : "MAX")}>
          MAX
          <br />
          {max > 0 && max}
        </div>
      )}
    </AmountInputWrapper>
  );
};

const AmountInputWrapper = styled.div`
  background: linear-gradient(to bottom, #d13cd4, #f828ca, #ff24c8);
  box-shadow: 0px 10px 10px #de35d070;
  border: 1px solid #ffffff22;
  border-radius: 1px;
  display: flex;
  flex-direction: row;
  font-family: Orbitron-Black;
  font-size: 0.9rem;
  color: #fec100;
  padding: 4px 5px;

  .min,
  .max {
    cursor: pointer;
  }

  .input {
    flex: 1;

    &-amount {
      width: 100%;
      background: transparent;
      color: #fec100;
      outline: none;
      border: none;
      font-size: 1.5rem;
      line-height: 3rem;
      margin-top: 15px;
      text-align: center;
    }
  }
`;

export default AmountInput;
