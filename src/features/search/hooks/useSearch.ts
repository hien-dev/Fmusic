import { PlaylistDTO } from "@shared/model";
import { debounce } from "@shared/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutAnimation } from "react-native";
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
    }, 500)
  );

  useEffect(() => {
    onChangeLoading(true);
    initFetch("Remix")
      .then((response) => onChangePlaylists(response))
      .finally(() => {
        onChangeLoading(false);
      });
  }, []);

  const onChangeSearching = (value: string) => {
    setSearching(value);
    if (fetchSuggestionsDebouncedRef.current) {
      fetchSuggestionsDebouncedRef.current.cancel();
    }
    fetchSuggestionsDebouncedRef.current(value);
  };

  const onSearching = (queryString?: string) => {
    onChangeLoading(true);
    onChangePlaylists(undefined);
    initFetch(queryString || searching)
      .then((response) => onChangePlaylists(response))
      .finally(() => {
        onChangeLoading(false);
      });
  };

  const onLoadMore = () => {
    if (playlists?.continuation) {
      onChangeLoading(true);
      continuationFetch(playlists.continuation)
        .then((response) => {
          if (playlists.playlist.length > 0) {
            let updatePlaylist = playlists;
            updatePlaylist.continuation = response.continuation;
            updatePlaylist.playlist = [...playlists.playlist, ...response.playlist];
            onChangePlaylists(updatePlaylist);
            return;
          }
          onChangePlaylists(response);
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
