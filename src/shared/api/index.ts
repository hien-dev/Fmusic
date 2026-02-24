import { Log } from "@shared/utils/function";
import axios from "axios";
import { endpointPath } from "./config";

const API = axios.create({ timeout: 15000 });

let headersPromise: Promise<any> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchDynamicHeaders = async () => {
  const now = Date.now();

  if (headersPromise && now - lastFetchTime < CACHE_DURATION) {
    return headersPromise;
  }

  const performFetch = async (retries: number): Promise<any> => {
    try {
      Log.log(`API Request Header attempt: ${6 - retries}`);
      const res = await axios.get(endpointPath("requestHeader"));
      lastFetchTime = Date.now();
      return res.data.headers;
    } catch (err) {
      if (retries > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return performFetch(retries - 1);
      }
      headersPromise = null;
      throw err;
    }
  };

  headersPromise = performFetch(5);
  return headersPromise;
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
    Log.log("API Request Body:", JSON.stringify(config.data));
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
