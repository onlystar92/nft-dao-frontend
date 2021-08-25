import React from "react";

import styled from "styled-components";
import cn from "classnames";

const TeamMember = ({ className, bg, data }) => (
  <TeamMemberWrapper className={cn(className, `bg-${bg}`)}>
    <img className="team-member-img" src={data.image} alt="" />
    <div className="team-member-name">{data.name}</div>
    <div className="team-member-title">{data.title}</div>
    <a href={data.linkedin} target="_blank" rel="noopener noreferrer"><img className="team-member-social" src="/static/images/social/linkedin-blue.png" alt="" /></a>
  </TeamMemberWrapper>
);

const TeamMemberWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 12px;

  .team-member-img {
    width: 199px;
    height: 199px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)), url(team_darius.png);
    border-radius: 16px;

    @media screen and (max-width: 1280px) {
      width: 185px;
      height: 185px;
    }
    @media screen and (max-width: 1024px) {
      width: 224px;
      height: 224px;
    }
    @media screen and (max-width: 576px) {
      width: 148px;
      height: 148px;
    }
  }

  .team-member-name {
    font-weight: 500;
    font-size: 16px;
    color: var(--color-black);
    margin-top: 8px;
    margin-bottom: 4px;
    @media screen and (max-width: 576px) {
      max-width: 140px;
    }
  }
  
  .team-member-title {
    max-width: 180px;
    font-weight: normal;
    font-size: 12px;
    color: #7D7D7D;
    @media screen and (max-width: 576px) {
      max-width: 140px;
    }
  }

  .team-member-social {
    position: absolute;
    width: 32px;
    height: 32px;
    bottom: 48px;
    left: 12px;
  }
`;

export default TeamMember;
