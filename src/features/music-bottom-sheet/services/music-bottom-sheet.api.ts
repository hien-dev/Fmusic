import API from "@shared/api";
import { baseAudioBody, baseWebBody, endpointPath } from "@shared/api/config";
import { PlaylistDTO, VideoDTO } from "@shared/model";
import { Log } from "@shared/utils/function";

export const initFetch = async (videoId: string): Promise<VideoDTO | null> => {
  try {
    const response = await API.post(endpointPath("player"), baseAudioBody(videoId));
    return VideoDTO.iTag18(response.data);
  } catch (error) {
    Log.error("MusicBottomSheet->initFetch\n", JSON.stringify(error));
    throw error;
  }
};

export const fetchNextMusic = async (videoId: string): Promise<PlaylistDTO | null> => {
  try {
    const body = baseWebBody({ videoId });
    const response = await API.post(endpointPath("next"), body);
    return PlaylistDTO.next(response.data);
  } catch (error) {
    Log.error("MusicBottomSheet->fetchNextMusic\n", JSON.stringify(error));
    throw error;
  }
};
