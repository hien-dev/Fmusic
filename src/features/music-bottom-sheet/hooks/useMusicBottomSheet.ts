import { Log } from "@shared/utils/function";
import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { initFetch } from "../services/music-bottom-sheet.api";
import { useMusicBottomSheetState } from "../services/music-bottom-sheet.state";

export function useMusicBottomSheet() {
  const { onChangeVideo, onChangeShowBottomSheet } = useMusicBottomSheetState();

  const isShowBottomSheet = useMusicBottomSheetState(
    useShallow((state) => state.isShowBottomSheet)
  );
  const video = useMusicBottomSheetState(useShallow((state) => state.video));

  const fetchMusicById = (videoId: string) => {
    onChangeShowBottomSheet(true);
    initFetch(videoId)
      .then((response) => {
        onChangeVideo(response);
      })
      .catch((error) => {
        Log.error("Failed to fetch music data:", error);
      });
  };

  const toggleBottomSheet = useCallback(() => {
    onChangeShowBottomSheet(!isShowBottomSheet);
  }, [isShowBottomSheet]);

  return { isShowBottomSheet, video, fetchMusicById, onChangeShowBottomSheet, toggleBottomSheet };
}
