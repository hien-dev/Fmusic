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
  return config;
});

export default API