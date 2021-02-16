import { getClient } from "./apiConfig";

const getCardsAPI = () => getClient(false).get("/v1/cards");
const getPartnerCardsAPI = () => getClient(false).get("/v1/cards/partners");

export { getCardsAPI, getPartnerCardsAPI };
