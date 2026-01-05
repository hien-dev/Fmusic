import API from "@shared/api";
import { baseAudioBody, baseIOSBody, endpointPath } from "@shared/api/config";
import { VideoDTO } from "@shared/model";
import { Log } from "@shared/utils/function";
import * as Network from "expo-network";

export const initFetch = async (videoId: string): Promise<VideoDTO | null> => {
  try {
    const newWork = await Network.getNetworkStateAsync();
    const isCellular = newWork.type === Network.NetworkStateType.CELLULAR;
    console.log("isCellular", isCellular);

    let url = endpointPath("player");
    let body = Object.assign({ videoId: videoId }, baseIOSBody);
    if (isCellular) {
      url = endpointPath("reel");
      body = Object.create(baseAudioBody(videoId));
    }
    const response = await API.post(url, body);
    return isCellular ? VideoDTO.iTag18(response.data) : VideoDTO.detail(response.data);
  } catch (error) {
    Log.error("MusicBottomSheet->initFetch\n", JSON.stringify(error));
    throw error;
  }
};
