import { VideoDTO } from "@shared/model";
import { create } from "zustand";

type State = {
  isShowBottomSheet: boolean;
  video: VideoDTO | null;
};

type Action = {
  onChangeShowBottomSheet: (isShow: boolean) => void;
  onChangeVideo: (video: VideoDTO | null) => void;
};

export const useMusicBottomSheetState = create<State & Action>((set) => ({
  isShowBottomSheet: false,
  onChangeShowBottomSheet: (isShow) => set({ isShowBottomSheet: isShow }),
  video: null,
  onChangeVideo: (video) => set({ video }),
}));
