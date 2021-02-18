import React from "react";
import styled from "styled-components";

const AnnounceCap = () => {
  return (
    <AnnounceCapWrapper>
      <span>Join Us:</span>
      <a className="social" href="https://twitter.com/dropsnft" target="_blank" rel="noopener noreferrer"><img width="26" height="26" src="/static/images/social/twitter.png" alt="" /></a>
      <a className="social" href="https://t.me/drops_nft" target="_blank" rel="noopener noreferrer"><img width="26" height="26" src="/static/images/social/telegram.png" alt="" /></a>
      <a className="social" href="https://discord.gg/FqZKAs6pmD" target="_blank" rel="noopener noreferrer"><img width="26" height="26" src="/static/images/social/discord.png" alt="" /></a>
    </AnnounceCapWrapper>
  )
}

const AnnounceCapWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 50px;
  background: #051ca6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;

  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
`;

export default AnnounceCap;
