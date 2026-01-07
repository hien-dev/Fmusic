import { Platform } from "react-native";

export const formatDate = (d: Date) => d.toISOString().split("T")[0];

export const iPhone = Platform.OS === "ios" && !Platform.isPad;

const log = (...args: any[]) => console.log("[LOG]", ...args);
const error = (...args: any[]) => console.log("[ERROR]", ...args);
export const Log = { log, error };

const decodeUnicodeDeep = (input: string): string => {
  let prev = input;
  let curr = input;
  do {
    prev = curr;
    curr = curr.replace(/\\u([\dA-Fa-f]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  } while (curr !== prev);

  return curr;
};
export const suggestQueriesParse = (data: any): string[] => {
  const regex = /\["([^"]+)",\s*0,\s*\[/g;
  const results: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = regex.exec(data)) !== null) {
    const raw = match[1];
    const cleaned = decodeUnicodeDeep(raw).normalize("NFC").replace(/\s+/g, " ").trim();
    results.push(cleaned);
  }

  return results;
};
