import API from "@shared/api";
import { baseAudioBody, baseIOSBody, endpointPath } from "@shared/api/config";
import { VideoDTO } from "@shared/model";
import { Log } from "@shared/utils/function";
import * as Network from "expo-network";

export const initFetch = async (videoId: string): Promise<VideoDTO | null> => {
  try {
    const newWork = await Network.getNetworkStateAsync();
    // const isCellular = newWork.type === Network.NetworkStateType.CELLULAR;
    const isCellular = true;
    if (isCellular) {
      const response = await API.post(endpointPath("reel"), baseAudioBody(videoId));
      Log.log("MusicBottomSheet->initFetch\n", JSON.stringify(response.data));
      return VideoDTO.iTag18(response.data);
    }
    const body = Object.assign({ videoId: videoId }, baseIOSBody);
    const response = await API.post(endpointPath("player"), body);
    return VideoDTO.detail(response.data);
  } catch (error) {
    Log.error("MusicBottomSheet->initFetch\n", JSON.stringify(error));
    throw error;
  }
};
