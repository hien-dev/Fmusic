import { ChannelDTO } from "@shared/model";
import { create } from "zustand";

type State = {
  channel: ChannelDTO | null;
};

type Action = {
  setChannel: (channel: ChannelDTO | null) => void;
};

export const useChannelDetailState = create<State & Action>((set) => ({
  channel: null,
  setChannel: (channel) => set({ channel }),
}));
