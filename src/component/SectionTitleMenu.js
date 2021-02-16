import React, { useState } from "react";
import styled from "styled-components";

import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from "react-bootstrap/Card";

import cx from "classnames";

const SectionTitleMenu = ({ data, selected, onChangeMenu }) => {
  const [title, setTitle] = useState("All");
  const [cardTypeSelectorShow, setCardTypeSelectorShow] = useState(false)
  
  const handleOpenCardTypeSelector = useAccordionToggle("0", () =>
    setCardTypeSelectorShow(!cardTypeSelectorShow)
  );

  const handleChangeTitle = (title) => {
    setTitle(title);
    onChangeMenu(title);
    setCardTypeSelectorShow(false);
  };

  return (
    <SectionTitleWrapper>
      {data.map((d, index) => (
        <div
          role="button"
          className={cx("title", { active: selected === d.title })}
          key={index}
          onClick={(e) => handleChangeTitle(d.title)}
        >
          {d.title}
        </div>
      ))}
      <div className="title-line"></div>
      <div className="mobile-section-wrapper">
        <Accordion defaultActiveKey={title}>
          <Card>
            <Card.Header onClick={e => handleOpenCardTypeSelector()}>
              {title}
            </Card.Header>
            <Accordion.Collapse eventKey="0" in={cardTypeSelectorShow}>
              <Card.Body>
                {data.map((d, index) =>
                  d.title === title ? null : (
                    <div 
                      role="button"
                      className="mobile-title-item" key={index}
                      onClick={e => handleChangeTitle(d.title)}
                    >
                      {d.title}
                    </div>
                  )
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </SectionTitleWrapper>
  );
};

const SectionTitleWrapper = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  width: 100%;

  @media screen and (max-width: 550px) {
    // flex-flow: row wrap;
  }

  .title {
    background-image: url("/static/images/bg/components/section-title/section-title-last-bg.png");
    background-size: 100% 100%;
    width: 192px;
    height: 42.4px;
    text-align: right;
    color: ${(props) => props.theme.palette.secondary.main};
    font-size: 22.4px;
    line-height: 34px;
    padding: 4px 45px 0 0;
    font-family: Orbitron-Black;
    text-shadow: 4px 4px 2.7px #27787580;
    margin-right: -23px;
    cursor: pointer;

    &.active {
      background-image: url("/static/images/bg/components/section-title/section-title-last-bg--active.png");
    }

    &:first-child {
      background-image: url("/static/images/bg/components/section-title/section-title-first-bg.png");
      text-align: center;

      &.active {
        background-image: url("/static/images/bg/components/section-title/section-title-first-bg--active.png");
      }
    }

    @media screen and (max-width: 1024px) {
      width: 134.4px;
      height: 42.4px;
      margin-right: -12.1px;
      font-size: 15.68px;
      padding: 4px 31.5px 0 0;
    }

    @media screen and (max-width: 545px) {
      display: none;
    }
  }

  .title-line {
    background: url("/static/images/bg/components/section-title/section-title-line.png")
      no-repeat;
    background-position: bottom;
    background-size: 100% 18px;
    margin-left: 30px;
    flex: 1;
    height: 55px;

    @media screen and (max-width: 630px) {
      display: none;
    }
  }

  .mobile-section-wrapper {
    display: none;
    width: calc(100% - 20px);
    height: 50px;
    z-index: 300;

    @media screen and (max-width: 545px) {
      display: flex;
      // background: #ff24c8;
      box-shadow: 4px 4px 2.7px #27787580;
    }

    .accordion {
      width: 100%;
      color: #fec100;
      font-family: Orbitron-Black;
      font-size: 1.3rem;
      text-shadow: 4px 4px 2.7px #27787580;
    }

    .card {
      background: #ff24c8;
    }

    .card-body {
      background: #000;
      color: #fec100;
    }

    .mobile-title-item {
      margin-bottom: 10px;
    }
  }
`;

export default SectionTitleMenu;
