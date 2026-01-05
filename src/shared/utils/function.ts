import { Platform } from "react-native";

export const formatDate = (d: Date) => d.toISOString().split("T")[0];

export const iPhone = Platform.OS === "ios" && !Platform.isPad;

const log = (...args: any[]) => console.log("[LOG]", ...args);
const error = (...args: any[]) => console.log("[ERROR]", ...args);
export const Log = { log, error };
