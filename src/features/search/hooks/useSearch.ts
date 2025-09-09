import { PlaylistDTO } from "@shared/model";
import { useEffect, useState } from "react";
import { continuationFetch, initFetch } from "../services/search.api";

interface UseSearch {
  isShowSearch: boolean;
  onChangeShowSearch: (value: boolean) => void;
  searching: string;
  onChangeSearching: (value: string) => void;
  playlists: PlaylistDTO | undefined;
  onLoadMore: () => void;
  isLoading: boolean;
}

export const useSearch = (): UseSearch => {
  const [isShowSearch, onChangeShowSearch] = useState(false);
  const [searching, onChangeSearching] = useState("");
  const [isLoading, onChangeLoading] = useState(false);
  const [playlists, onChangePlaylists] = useState<PlaylistDTO | undefined>(undefined);

  useEffect(() => {
    onChangeLoading(true);
    initFetch("remix tiktok")
      .then((response) => onChangePlaylists(response))
      .finally(() => {
        onChangeLoading(false);
      });
  }, []);

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

  return {
    isShowSearch,
    onChangeShowSearch,
    searching,
    onChangeSearching,
    playlists,
    onLoadMore,
    isLoading,
  };
};
