import React from "react";

import styled from "styled-components";
import cn from "classnames";

const TeamMember = ({ className, bg, data }) => (
  <TeamMemberWrapper className={cn(className, `bg-${bg}`)}>
    <img className="team-member-img" src={data.image} alt="" />
    <a href={data.linkedin} target="_blank" rel="noopener noreferrer"><img className="team-member-social" src="/static/images/social/linkedin.png" alt="" /></a>
    <div className="team-member-name">{data.name}</div>
    <div className="team-member-title">{data.title}</div>
  </TeamMemberWrapper>
);

const TeamMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 21px;
  padding-left: 19px;
  align-items: center;

  &.bg-0 {
    background: url("/static/images/bg/bg-u-1.png");
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
  }

  &.bg-1 {
    background: url("/static/images/bg/bg-u-2.png");
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
  }

  &.bg-2 {
    background: url("/static/images/bg/bg-u-3.png");
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
  }
  
  &.bg-3 {
    background: url("/static/images/bg/bg-u-4.png");
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
  }

  &.bg-4 {
    background: url("/static/images/bg/bg-u-5.png");
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
  }

  .team-member-img {
    width: 100%;
  }

  .team-member-name {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-top: 43px;
  }
  
  .team-member-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    margin-top: 9px;
  }

  .team-member-social {
    width: 60px;
    height: 60px;
  }
`;

export default TeamMember;
