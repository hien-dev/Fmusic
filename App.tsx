import "expo-router/entry";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[Error: Uncaught (in promise, id: 0) [AxiosError: Request failed with status code 400]]",
  "[AxiosError: Request failed with status code 400]",
]);
