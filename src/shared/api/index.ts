import { Log } from "@shared/utils/function";
import axios from "axios";
import { endpointPath } from "./config";

const API = axios.create({ timeout: 15000 });

const fetchDynamicHeaders = async () => {
  const res = await axios.get(endpointPath("requestHeader"));
  return res.data.headers;
};

API.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const headers = await fetchDynamicHeaders();
      config.headers = {
        ...config.headers,
        ...headers,
      };
    }
    Log.log("API Request URL:", config.url);
    return config;
  },
  (error) => {
    Log.error("API Request Error:");
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    Log.log("API Response URL:", response.config.url, "==>", response.status);
    return response;
  },
  (error) => {
    Log.error("API Response Error:");
    return Promise.reject(error);
  }
);

export default API;
