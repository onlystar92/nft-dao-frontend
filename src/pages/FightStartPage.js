import React from "react";
import styled from "styled-components";

import Card from "../component/Card";

const FirstStartPageWrapper = styled.div`
	.vs {
		width: 176px;
		height: 186px;	
		margin: 164px -10px;
	}
	
	button {
		background-size: 100% 100%;
		background-color: transparent;
		border: none;
		font-size: 30px;
		padding-bottom: 4px;
		margin-bottom: 5px;
		margin-top: 53px;
		outline: none;
		
		&.attack {
			background-image: url("/static/images/bg/pages/fight-start/attack-button-bg.png");
			color: ${props => props.theme.palette.secondary.main};
			font-family: Orbitron-Black;
			text-shadow: 0 0 7px ${props => props.theme.darken('#000000', 0.35)};
			width: 459px;
			height: 83px;
		}
		
		&.retreat {
			background-image: url("/static/images/bg/pages/fight-start/retreat-button-bg.png");
			color: #00000;
			font-family: Orbitron-Medium;
			text-shadow: 3px 3px 3px ${props => props.theme.darken('#277875', 0.5)};
			width: 462px;
			height: 84px;
		}	
	}
	
	.equipment-wrapper {
		> div {
			transform: scale(0.8);
		}
	}
`;

const hero = {
	card: 'card-2',
	cardGrid: {
		name: 'Micheal Egorov',
		strength: 16,
		defense: 29,
		rarity: 'common',
		hash: 100,
		eth: 10,
		payed: false,
		isHero: true,
		top: true
	}
};

const villain = {
	card: 'card-1',
	ndrToken: true,
	cardGrid: {
		name: 'Micheal Egorov',
		strength: 16,
		defense: 29,
		rarity: 'common',
		hash: 100,
		eth: 10,
		ndr: 1,
		payed: false,
		isHero: true,
	}
};

const FightStartPage = () => {
	return (
		<FirstStartPageWrapper className="d-flex justify-content-center">
			<div className="group">
				<div className="d-flex align-items-start">
					<Card card={hero.card} cardGrid={hero.cardGrid} empty heroBlood={90} />
						<img
							src={`/static/images/icons/vs.png`}
							alt="vs"
							className="vs"
						/>
					<Card card={villain.card} cardGrid={villain.cardGrid} ndrToken empty villainBlood={100} />
				</div>
				<div className="d-flex justify-content-center">
					<button className="attack hover-effect2">Attack Villain</button>
					<button className="retreat hover-effect2">Retreat</button>
				</div>
			</div>
			<div className="equipment-wrapper d-flex flex-column">
				<Card card={'card-1'} empty />
				<Card card={'card-1'} empty />
			</div>
		</FirstStartPageWrapper>
	);
};

export default FightStartPage;
