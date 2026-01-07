import { Dimensions, Platform } from "react-native";

export const iPhone = Platform.OS === "ios" && !Platform.isPad;

export const windowSize = Dimensions.get("window");

export const screenSize = Dimensions.get("screen");
