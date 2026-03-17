import API from "@shared/api";
import { BROWSER_PARAMS, baseWebBody, endpointPath } from "@shared/api/config";
import { ChannelDTO } from "@shared/model";
import { Log } from "@shared/utils/function";

export const fetchChannelDetail = async (browseId: string) => {
  try {
    const body = baseWebBody({ browseId, params: BROWSER_PARAMS });
    const response = await API.post(endpointPath("browse"), body);
    return ChannelDTO.create(response.data);
  } catch (error) {
    Log.error("ChannelDetail->fetchChannelDetail\n", JSON.stringify(error));
    throw error;
  }
};
