export const qk = {
  search: (q?: string) => ["search", q ?? "all"] as const,
  favorites: () => ["favorites"] as const,
  profile: () => ["profile"] as const,
};
