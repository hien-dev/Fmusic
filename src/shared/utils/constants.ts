import { Dimensions, Platform } from "react-native";

export const iPhone = Platform.OS === "ios" && !Platform.isPad;
export const isTablet =
  (Platform.OS === "ios" && Platform.isPad) ||
  (Platform.OS === "android" && Dimensions.get("window").width >= 600);

export const windowSize = Dimensions.get("window");
export const SIDEBAR_COLLAPSED_WIDTH = 80;
export const getSidebarExpandedWidth = (screenWidth: number) => Math.min(screenWidth * 0.3, 300);

export const screenSize = Dimensions.get("screen");
