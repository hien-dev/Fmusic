import { PlaylistDTO } from "@shared/model";
import { create } from "zustand";

type State = {
  playlists: PlaylistDTO | undefined;
};

type Action = {
  onChangePlaylists: (playlists: PlaylistDTO | undefined) => void;
};

export const useSearchState = create<State & Action>((set) => ({
  playlists: undefined,
  onChangePlaylists: (playlists) => set({ playlists }),
}));
