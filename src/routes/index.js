import async from "../component/Async";

const MyCards = async(() => import("../pages/MyCardsPage"));
const Stake = async(() => import("../pages/StakePage"));
const Farm = async(() => import("../pages/FarmPage"));
const GetCards = async(() => import("../pages/GetCardsPage"));
const FightVillains = async(() => import("../pages/FightVillainsPage"));
const FightStart = async(() => import("../pages/FightStartPage"));
const UnlockWallet = async(() => import("../pages/UnlockWalletPage"));

const menuRoutes = [
	{
		path: '/my-cards',
		component: MyCards,
		layout: 'cardMenu'
	},
	{
		path: '/stake',
		component: Stake,
		layout: 'cardMenu'
	},
	{
		path: '/farm',
		component: Farm,
		layout: 'cardMenu'
	},
	{
		path: '/get-heroes',
		component: GetCards,
		layout: 'cardMenu'
	},
	{
		path: '/fight-villains',
		component: FightVillains,
		layout: 'cardMenu'
	},
	{
		path: '/fight-villains/fight',
		component: FightStart,
		layout: 'battle'
	},
	{
		path: '/unlock-wallet',
		component: UnlockWallet,
		layout: 'cardMenu'
	}
];

export {
	menuRoutes
};
