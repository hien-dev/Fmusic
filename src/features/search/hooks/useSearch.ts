import { tr } from "@shared/locales/i18n";
import { PlaylistDTO } from "@shared/model";
import { debounce } from "@shared/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, LayoutAnimation } from "react-native";
import { continuationFetch, fetchSuggestions, initFetch } from "../services/search.api";

interface UseSearch {
  isShowSearch: boolean;
  onToggleShowSearch: () => void;
  searching: string;
  onChangeSearching: (value: string) => void;
  playlists: PlaylistDTO | undefined;
  onLoadMore: () => void;
  isLoading: boolean;
  suggestions: string[];
  onSearching: (queryString?: string) => void;
}

export const useSearch = (): UseSearch => {
  const [isShowSearch, onChangeShowSearch] = useState(false);
  const [searching, setSearching] = useState("");
  const [isLoading, onChangeLoading] = useState(false);
  const [playlists, onChangePlaylists] = useState<PlaylistDTO | undefined>(undefined);
  const [suggestions, onChangeSuggestions] = useState<string[]>([]);

  const fetchSuggestionsDebouncedRef = useRef(
    debounce(async (query: string) => {
      if (!query.trim()) {
        return;
      }
      const suggestions = await fetchSuggestions(query);
      onChangeSuggestions(suggestions);
    }, 300)
  );

  const initializedRef = useRef(false);

  const fetchPlaylists = useCallback((query: string) => {
    onChangeLoading(true);
    initFetch(query)
      .then((response) => onChangePlaylists(response))
      .catch((error) => {
        Alert.alert(tr("app.title"), error?.message, [
          {
            text: tr("common.retry"),
            onPress: () => fetchPlaylists(query),
          },
          {
            text: tr("common.cancel"),
            onPress: () => {},
          },
        ]);
      })
      .finally(() => {
        onChangeLoading(false);
      });
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    fetchPlaylists("remix tiktok 2025");
  }, [fetchPlaylists]);

  const onChangeSearching = (value: string) => {
    setSearching(value);
    if (fetchSuggestionsDebouncedRef.current) {
      fetchSuggestionsDebouncedRef.current.cancel();
    }
    fetchSuggestionsDebouncedRef.current(value);
  };

  const onSearching = (queryString?: string) => {
    onChangePlaylists(undefined);
    fetchPlaylists(queryString || searching);
  };

  const onLoadMore = () => {
    if (playlists?.continuation) {
      onChangeLoading(true);
      continuationFetch(playlists.continuation)
        .then((response) => {
          if (playlists.playlist.length > 0) {
            onChangePlaylists({
              ...playlists,
              continuation: response.continuation,
              playlist: [...playlists.playlist, ...response.playlist],
            });
            return;
          }
          onChangePlaylists(response);
        })
        .catch((error) => {
          Alert.alert(tr("app.title"), JSON.stringify(error?.message), [
            {
              text: tr("common.retry"),
              onPress: onLoadMore,
            },
            {
              text: tr("common.cancel"),
              onPress: () => {},
            },
          ]);
        })
        .finally(() => {
          onChangeLoading(false);
        });
    }
  };

  const onToggleShowSearch = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onChangeShowSearch((v) => !v);
  }, [isShowSearch]);

  return {
    isShowSearch,
    onToggleShowSearch,
    searching,
    onChangeSearching,
    playlists,
    onLoadMore,
    isLoading,
    suggestions,
    onSearching,
  };
};
