import { ThemePref, useColorState } from "@shared/hooks/useTheme";
import { getLocale, setLocale, tr, useLocale } from "@shared/locales/i18n";
import { useState } from "react";
import { useDesignSystem } from "@shared/provider";
import { spacing } from "@shared/themes";
import { Screen } from "@shared/ui";
import { Pressable, StyleSheet, Text, View } from "react-native";

const THEME_OPTIONS: { key: ThemePref; label: string }[] = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ko", label: "한국어" },
] as const;

function normalizeLocale(locale: string): string {
  if (locale.startsWith("vi")) return "vi";
  if (locale.startsWith("ko")) return "ko";
  return "en";
}

export default function SettingsScreen() {
  const { colors, typography, spacing } = useDesignSystem();
  const themePref = useColorState((s) => s.theme);
  const setTheme = useColorState((s) => s.setTheme);

  const locale = useLocale();
  const currentLocale = normalizeLocale(locale || getLocale());

  return (
    <Screen style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{tr("settings.title")}</Text>

      <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{tr("settings.theme")}</Text>
        <View style={styles.row}>
          {THEME_OPTIONS.map((opt) => {
            const isActive = themePref === opt.key;
            return (
              <Pressable
                key={opt.key}
                style={[
                  styles.chip,
                  {
                    borderColor: isActive ? colors.accent : colors.border,
                    backgroundColor: isActive ? colors.accent + "33" : colors.transparent,
                  },
                ]}
                onPress={() => setTheme(opt.key)}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    {
                      color: isActive ? colors.accent : colors.text,
                      fontFamily: typography.h5.fontFamily,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Language</Text>
        <View style={styles.row}>
          {LANGUAGE_OPTIONS.map((opt) => {
            const isActive = currentLocale === opt.code;
            return (
              <Pressable
                key={opt.code}
                style={[
                  styles.chip,
                  {
                    borderColor: isActive ? colors.accent : colors.border,
                    backgroundColor: isActive ? colors.accent + "33" : colors.transparent,
                  },
                ]}
                onPress={() => setLocale(opt.code)}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    {
                      color: isActive ? colors.accent : colors.text,
                      fontFamily: typography.h5.fontFamily,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: spacing.md,
  },
  card: {
    marginHorizontal: spacing.md,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chipLabel: {
    fontSize: 14,
  },
});
