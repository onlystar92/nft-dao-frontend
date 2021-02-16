import React from "react";
import styled from "styled-components";

import SectionTitle from "../component/SectionTitle";
// import Card_2 from "../component/Card_2";

const GetHeroesWrapper = styled.div`
	.card-credit {
    > div {
      span {
        font-size: 20px;
        max-width: 127px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &.action {
        background-image: url('/static/images/bg/pages/get-heroes/credit-button-bg.png');
        background-size: 100% 100%;
        width: 140px;
        height: 100px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover {
        	background-image: url('/static/images/bg/pages/get-heroes/credit-button-bg--active.png');        	
        }
        
        &:nth-child(3) {
        	.MuiSvgIcon-root {
						transform: rotateY(180deg);
					}
       	}
        
        &:last-child {
					background: url('/static/images/bg/pages/get-heroes/credit-last-button-bg.png');
					background-size: 100% 100%;
					width: 140px;
					height: 100px;
				}
      }

      &.credit {
        background: url('/static/images/bg/pages/get-heroes/credit-bg.png');
        background-size: 100% 100%;
        margin-right: -13px;
        padding: 6px 22px 26px 10px;
        min-width: 405px;
        text-shadow: 10px 10px 10px #80f1ed91;
        
        > div:first-child {
        	margin-bottom: 4px;
        }

        label {
          color: #80f1ed;
          font-size: 30px;
          font-family: Orbitron-Medium;
          line-height: 1;
          margin: 0;
        }

        span {
          color: #fec100;
          font-size: 30px;
          font-family: Orbitron-Black;
          line-height: 1;
          padding-left: 9px;
          margin: 0;
          text-shadow: inherit;
        }
      }
    }
  }
`;

// const Villains = [
// 	{
// 		card: 'card-1',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: true,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-2',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: true,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-3',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: true,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-2',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: false,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-1',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: true,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-2',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: true,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-3',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: true,
// 			isHero: false,
// 			health: 100
// 		}
// 	},
// 	{
// 		card: 'card-2',
// 		cardGrid: {
// 			name: 'Micheal Egorov',
// 			strength: 16,
// 			defense: 29,
// 			rarity: 'common',
// 			hash: 100,
// 			eth: 10,
// 			payed: false,
// 			isHero: false,
// 			health: 100
// 		}
// 	}
// ];

const GetHeroes = () => {
	return (
		<GetHeroesWrapper>
			<div className="section-title d-flex justify-content-center animation-fadeInRight">
				<SectionTitle title={'Villains'} />
			</div>
			<div className="d-flex justify-content-center flex-wrap">
				{
					// Villains.map((c, index) => <Card_2 key={index} card={c.card} cardGrid={c.cardGrid} />)
				}
			</div>
		</GetHeroesWrapper>
	);
};

export default GetHeroes;
