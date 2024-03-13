import axios from "axios";

import * as constants from "./constant";

const apiClient = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
export default apiClient;
