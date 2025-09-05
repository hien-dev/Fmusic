import { useState } from "react";
type Item = { id: string; name: string };
export function useFavorite() {
  // Placeholder local state (có thể thay bằng API hoặc Zustand)
  const [items] = useState<Item[]>([]);
  return { items };
}
