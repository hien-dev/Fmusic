import { Log } from "@shared/utils/function";
import { initFetch } from "../services/music-bottom-sheet.api";

export function useMusicBottomSheet() {
  const fetchMusicById = (videoId: string) => {
    initFetch(videoId)
      .then((response) => {
        Log.log("Fetched music data:", JSON.stringify(response));
      })
      .catch((error) => {
        Log.error("Failed to fetch music data:", error);
      });
  };
  return { fetchMusicById };
}
