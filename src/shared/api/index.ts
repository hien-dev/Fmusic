import { Log } from "@shared/utils/function";
import axios from "axios";
import { endpointPath } from "./config";

const API = axios.create({ timeout: 15000 });

const fetchDynamicHeaders = async () => {
  const res = await axios.get(endpointPath("requestHeader"));
  return res.data.headers;
};

API.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    const headers = await fetchDynamicHeaders();
    config.headers = {
      ...config.headers,
      ...headers,
    };
  }
  Log.log("API Request URL:", config.url);
  return config;
});

export default API;
