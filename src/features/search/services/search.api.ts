import API from "@shared/api";
import { baseIOSBody, endpointPath } from "@shared/api/config";
import { PlaylistDTO } from "@shared/model";

export const initFetch = async (query: string) => {
  try {
    const body = Object.assign({query}, baseIOSBody);        
    const response = await API.post(endpointPath("search"), body);
    return PlaylistDTO.search(response.data);
  } catch (error) {
    throw error;
  }
};
