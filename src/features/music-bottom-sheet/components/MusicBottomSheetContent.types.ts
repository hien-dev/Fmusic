import type BottomSheet from "@gorhom/bottom-sheet";
import type { ViewStyle } from "react-native";

export type MusicBottomSheetContentProps = {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  colors: any;
  video: any;
  nextVideos: any;
  player: any;
  fetchMusicById: (videoId: string) => void;
  videoContainerStyle: ViewStyle;
  animatedIndex: any;
  onChange: (index: number) => void;
};
