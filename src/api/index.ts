import axios from "axios";

const ENDPOINT = "http://192.168.4.1";
// const ENDPOINT = "http://192.168.191.193";
const $api = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 10 * 1000,
});
export { ENDPOINT, $api };
