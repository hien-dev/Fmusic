import Fonts from "@assets/fonts";
import { useFonts } from "expo-font";
import { ReactNode } from "react";

export function FontProvider({ children }: { children: ReactNode }) {
  const [loaded] = useFonts({
    regular: Fonts.regular,
    bold: Fonts.bold,
    italic: Fonts.italic,
  });
  return <>{children}</>;
}
