import API from "@shared/api";
import { baseIOSBody, endpointPath } from "@shared/api/config";
import { PlaylistDTO } from "@shared/model";
import { Log, suggestQueriesParse } from "@shared/utils/function";

export const initFetch = async (query: string) => {
  try {
    const body = Object.assign({ query }, baseIOSBody);
    const response = await API.post(endpointPath("search"), body);
    return PlaylistDTO.search(response.data);
  } catch (error) {
    Log.error("Search->initFetch\n", JSON.stringify(error));
    throw error;
  }
};

export const continuationFetch = async (continuation: string) => {
  try {
    const body = Object.assign({ continuation }, baseIOSBody);
    const response = await API.post(endpointPath("search"), body);
    return PlaylistDTO.searchContinuations(response.data);
  } catch (error) {
    Log.error("Search->continuation\n", JSON.stringify(error));
    throw error;
  }
};

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  try {
    const url = `${endpointPath("suggestQueries")}${query}`;
    const response = await API.get(url);
    const parse = suggestQueriesParse(response.data);
    return parse;
  } catch (error) {
    Log.error("Search->suggestions\n", JSON.stringify(error));
    throw error;
  }
};
