import { PlaylistDTO } from "@shared/model";
import { Log } from "@shared/utils/function";
import { useEffect, useState } from "react";
import { initFetch } from "../services/search.api";

interface UseSearch {
  isShowSearch: boolean;
  onChangeShowSearch: (value: boolean) => void;
  searching: string;
  onChangeSearching: (value: string) => void;
  playlist: PlaylistDTO | undefined;
}

export const useSearch = (): UseSearch => {
  const [isShowSearch, onChangeShowSearch] = useState(false);
  const [searching, onChangeSearching] = useState("");
  const [playlist, onChangePlaylist] = useState<PlaylistDTO | undefined>(undefined);

  useEffect(() => {
    initFetch("remix tiktok")
      .then((response) => onChangePlaylist(response))
      .catch((error) => Log.error(JSON.stringify(error)));
  }, []);

  return { isShowSearch, onChangeShowSearch, searching, onChangeSearching, playlist };
};
