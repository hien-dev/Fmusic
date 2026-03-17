import API from "@shared/api";
import { BROWSER_PARAMS, ContentTabs, baseWebBody, endpointPath } from "@shared/api/config";
import { ChannelDTO, PlaylistDTO } from "@shared/model";
import { Log, suggestQueriesParse } from "@shared/utils/function";

export const initFetch = async (query: string, tab?: ContentTabs) => {
  try {
    const body = baseWebBody({ query, params: tab });
    const response = await API.post(endpointPath("search"), body);
    return PlaylistDTO.search(response.data);
  } catch (error) {
    Log.error("Search->initFetch\n", JSON.stringify(error));
    throw error;
  }
};

export const continuationFetch = async (continuation: string) => {
  try {
    const body = baseWebBody({ continuation });
    const response = await API.post(endpointPath("search"), body);
    return PlaylistDTO.searchContinuations(response.data);
  } catch (error) {
    Log.error("Search->continuation\n", JSON.stringify(error));
    throw error;
  }
};

export const fetchArtists = async (browseId: string) => {
  try {
    const body = baseWebBody({ browseId, params: BROWSER_PARAMS });
    const response = await API.post(endpointPath("browse"), body);
    console.log("Search->fetchArtists\n", JSON.stringify(response.data));
    return ChannelDTO.create(response.data);
  } catch (error) {
    Log.error("Search->fetchArtists\n", JSON.stringify(error));
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
