import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import en from "./en.json";
import vi from "./vi.json";

type Primitive = string | number | boolean | null | undefined;

type DotPaths<T> = T extends Primitive
  ? never
  : T extends Array<any>
    ? never
    : {
        [K in Extract<keyof T, string>]: T[K] extends Primitive | Array<any>
          ? `${K}`
          : `${K}` | `${K}.${DotPaths<T[K]>}`;
      }[Extract<keyof T, string>];

export type TxKey = DotPaths<typeof en>;

export const i18n = new I18n({ en, vi });
i18n.enableFallback = true;

const device = Localization.getLocales?.()[0]?.languageTag ?? "en";
i18n.locale = device;

export type TranslateValues = Record<string, string | number | undefined>;

export function tr<K extends TxKey>(key: K, values?: TranslateValues) {
  return i18n.t(key as string, values);
}

export function setLocale(locale: string) {
  i18n.locale = locale;
}
export function getLocale() {
  return i18n.locale;
}
