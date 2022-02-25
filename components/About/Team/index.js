import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { dataTeams } from '../../../helpers/dummy'  

const TeamsWrapper = styled.div`
  width: 100%;
  padding: 0 0 100px 0;
  margin-bottom: 50px;
  background-color: #030921 !important;
  position: relative;
  p {
    color: white;
    text-align: center;
    line-height: 20px;
  }
  .title_img {
    width: 100%;
    display: flex;
    margin: 80px 0;
    & > img {
      width: 28%;
      align-self: center;
      margin: auto;
    }
  }
  .title {
    font-weight: 700;
    color: white;
    font-family: 'Luxfont';
    font-size: 72px;
    text-align: center;
    margin: 70px 0;
  }
  .content_area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 999;
    justify-content: space-around;
  }
  .member {
    width: 14.5%;
    margin-bottom: 35px;
  }
  .member_img {
    width: 100%;
    margin-bottom: 10px;
  }
  .member_name {
    font-weight: bold;
  }
  .member_role {
    font-size: 12px;
  }
  .social {
    width: 50%;
    margin: 10px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-around;
    img {
      cursor: pointer;
    }
    img:hover, img:focus {
      transform: scale(1.1);
    }
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    .content_area {
      padding: 0 100px;
    }
    .member {
      width: 22%;
    }
    .title_img {
      margin: 50px 0;
    }
    .title {
      font-size: 60px;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .content_area {
      padding: 0 80px;
    }
    .member {
      width: 27%;
    }
    .title_img {
      margin: 30px 0 40px 0;
      & > img {
        width: 35%;
      }
    }
    .title {
      font-size: 56px;
      margin: 50px 0 40px 0;
    }
  }
  @media (min-width: 564px) and (max-width: 768px) {
    .title_img {
      margin: 70px 0 20px 0 !important; 
    }
  }
  @media all and (max-width: 768px) {
    padding: 0 20px 0 20px;
    .member {
      width: 42%;
    }
    .title_img {
      margin: 30px 0 20px 0;
      & > img {
        width: 65%;
      }
    }
    .title {
      font-size: 48px;
      margin: 40px 0 30px 0;
    }
  }
  
`

const Teams = () => {
  return (
    <TeamsWrapper>
      <h2 className="title">OUR TEAM</h2>
      {/* <div className="title_img">
        <img src="assets/home/text/partner_title.png" />
      </div> */}
      <div className="content_area wraped">
        {dataTeams.map((data, index) => (
          <div className="member">
            <img className="member_img" src={data.image} />
            <p className="member_name">{data.name}</p>
            <p className="member_role">{data.role}</p>
            <div className="social">
              <img src={data.social1} />
              {data.social2 && <img src={data.social2} />}
            </div>
          </div>
        ))}
      </div>
    </TeamsWrapper>
  )
}

export default Teams
