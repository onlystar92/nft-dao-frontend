import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const DopWrapper = styled.div`
  margin-bottom: 70px;
  .available {
    display: flex;
    flex-direction: row;
  }
  .dop {
    width: 55%;
    font-family: 'lilgrotesk';
    font-weight: 700;
    font-size: 50px;
    color: white;
    align-self: center;
    padding: 0 2vw;
    p {
      padding-left: 2vw;
    }
    img {
      width: 95%;
    }
  }
  .organ {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      height: auto;
    }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .dop {
      width: 50%;
      font-size: 40px;
      padding: 1vw;
      p {
        padding-left: 0;
      }
    }
    .organ {
      width: 50%;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .available {
      flex-direction: column;
    }
    .dop {
      width: 100%;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
      img {
        width: 77%;
      }
    }
    .organ {
      width: 70%;
      margin: auto;
    }
  }
  @media all and (max-width: 768px) {
    margin-bottom: 60px;
    .available {
      flex-direction: column;
    }
    .dop {
      width: 100%;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    .organ {
      width: 90%;
      margin: auto;
    }
  }
  @media all and (max-width: 468px) {
    .organ {
      width: 90%;
      margin: auto;
      img:first-child {
        width: 36%;
        height: auto;
      }
      img {
        width: 22%;
        height: auto;
      }
    }
  }
  
`

const Dop = () => {
  return (
    <DopWrapper>
      <div className="limited available">
        <div className="dop">
          {/* <p>DOP AVAILABLE ON:</p> */}
          <img src="assets/home/text/dop_title.png" />
        </div>
        <div className="organ">
          <img src="assets/home/uniswap.png" />
          <img src="assets/home/gate.png" />
          <img src="assets/home/mexc.png" />
        </div>
      </div>
    </DopWrapper>
  )
}

export default Dop
