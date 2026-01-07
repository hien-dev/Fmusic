import { PlaylistDTO, VideoDTO } from "@shared/model";
import { create } from "zustand";

type State = {
  isShowBottomSheet: boolean;
  video: VideoDTO | null;
  nextVideos: PlaylistDTO | null;
};

type Action = {
  onChangeShowBottomSheet: (isShow: boolean) => void;
  onChangeVideo: (video: VideoDTO | null) => void;
  onChangeNextVideo: (playlist: PlaylistDTO | null) => void;
};

export const useMusicBottomSheetState = create<State & Action>((set) => ({
  isShowBottomSheet: false,
  onChangeShowBottomSheet: (isShow) => set({ isShowBottomSheet: isShow }),
  video: null,
  onChangeVideo: (video) => set({ video }),
  nextVideos: null,
  onChangeNextVideo: (playlist) => set({ nextVideos: playlist }),
}));
