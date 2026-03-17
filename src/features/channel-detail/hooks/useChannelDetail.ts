import { useCallback, useState } from "react";
import { fetchChannelDetail } from "../services/channel-detail.api";
import { useChannelDetailState } from "../services/channel-detail.state";

export function useChannelDetail() {
  const { channel, setChannel } = useChannelDetailState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (browseId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchChannelDetail(browseId);
        setChannel(result);
      } catch (e) {
        setError("Không thể tải thông tin kênh");
      } finally {
        setIsLoading(false);
      }
    },
    [setChannel]
  );

  const clear = useCallback(() => {
    setChannel(null);
    setError(null);
  }, [setChannel]);

  return {
    channel,
    isLoading,
    error,
    load,
    clear,
  };
}
