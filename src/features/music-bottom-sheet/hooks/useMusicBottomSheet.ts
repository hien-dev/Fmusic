import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { fetchNextMusic, initFetch } from "../services/music-bottom-sheet.api";
import { useMusicBottomSheetState } from "../services/music-bottom-sheet.state";

export function useMusicBottomSheet() {
  const { onChangeVideo, onChangeShowBottomSheet, onChangeNextVideo } = useMusicBottomSheetState();

  const isShowBottomSheet = useMusicBottomSheetState(
    useShallow((state) => state.isShowBottomSheet)
  );
  const video = useMusicBottomSheetState(useShallow((state) => state.video));
  const nextVideos = useMusicBottomSheetState((state) => state.nextVideos);

  const fetchMusicById = (videoId: string) => {
    Promise.all([initFetch(videoId), fetchNextMusic(videoId)])
      .then(([video, nextVideos]) => {
        onChangeVideo(video);
        onChangeNextVideo(nextVideos);
      })
      .finally(() => {
        onChangeShowBottomSheet(true);
      });
  };

  const toggleBottomSheet = useCallback(() => {
    onChangeShowBottomSheet(!isShowBottomSheet);
  }, [isShowBottomSheet]);

  return {
    isShowBottomSheet,
    video,
    nextVideos,
    fetchMusicById,
    onChangeShowBottomSheet,
    toggleBottomSheet,
  };
}
