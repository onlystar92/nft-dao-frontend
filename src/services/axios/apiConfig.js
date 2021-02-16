import axios from "axios";

const apiUrl = process.env.REACT_APP_API_ROOT;

export const getClient = () => axios.create({ baseURL: apiUrl });
