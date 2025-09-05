import { useEffect, useState } from "react";
import { searchApi } from "../services/search.api";
import { useDebounce } from "../../../shared/hooks/useDebounce";

type Item = { id: string; name: string };

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(query, 400);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!debounced || debounced.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchApi.search(debounced);
        if (alive) setResults(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [debounced]);

  return { query, setQuery, results, loading };
}
