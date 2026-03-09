import { VideoDTO } from "./VideoDTO";

export class PlaylistDTO {
  public playlistId?: string;
  public fromNext: boolean;
  public title?: string;
  public playlist: VideoDTO[];
  public continuation?: string;

  constructor(params: {
    playlistId?: string;
    fromNext: boolean;
    title?: string;
    playlist: VideoDTO[];
    continuation?: string;
  }) {
    this.playlistId = params.playlistId;
    this.fromNext = params.fromNext;
    this.title = params.title;
    this.playlist = params.playlist;
    this.continuation = params.continuation;
  }

  static search(data: any): PlaylistDTO {
    const renderer =
      data?.contents?.twoColumnSearchResultsRenderer ??
      data?.contents?.singleColumnSearchResultsRenderer;

    const sectionList = renderer
      ? renderer?.primaryContents?.sectionListRenderer
      : data?.contents?.sectionListRenderer;

    const contents = sectionList?.contents ?? [];

    let continuation = sectionList?.continuations?.[0]?.nextContinuationData?.continuation;

    const results: VideoDTO[] = [];

    for (const section of contents) {
      // Check for continuation at the section level
      if (section?.continuationItemRenderer && !continuation) {
        continuation =
          section.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
      }

      const itemSectionContents = section?.itemSectionRenderer?.contents ?? [];
      const itemsToProcess = section?.itemSectionRenderer ? itemSectionContents : [section];

      for (const item of itemsToProcess) {
        const v = VideoDTO.search(item);
        if (v) {
          results.push(v);
          continue;
        }

        // Check for continuation at the item level
        if (item?.continuationItemRenderer && !continuation) {
          continuation =
            item.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
        }

        const model = item?.elementRenderer?.newElement?.type?.componentType?.model;

        const videoData = model?.compactVideoModel?.compactVideoData;
        const playlistData = model?.compactPlaylistModel?.compactPlaylistData;
        const videoWithContextData = model?.videoWithContextModel?.videoWithContextData;

        if (videoData && typeof videoData === "object") {
          const v = VideoDTO.compactVideo(videoData);
          if (v) results.push(v);
        } else if (playlistData && typeof playlistData === "object") {
          const v = VideoDTO.compactPlaylist(playlistData);
          if (v) results.push(v);
        } else if (videoWithContextData && typeof videoWithContextData === "object") {
          const v = VideoDTO.videoWithContext(videoWithContextData);
          if (v) results.push(v);
        }
      }
    }

    return new PlaylistDTO({
      playlistId: "play-list-search",
      fromNext: false,
      title: "",
      playlist: results,
      continuation,
    });
  }

  static searchContinuations(data: any): PlaylistDTO {
    const continuationContents = data?.continuationContents;
    const onResponseReceivedCommands = data?.onResponseReceivedCommands;

    let continuation: string | undefined;
    let contents: any[] = [];

    if (continuationContents) {
      const result =
        continuationContents?.sectionListContinuation ??
        continuationContents?.itemSectionContinuation;
      continuation = result?.continuations?.[0]?.nextContinuationData?.continuation;
      contents = result?.contents ?? [];

      if (continuationContents?.sectionListContinuation) {
        contents = result?.contents?.[0]?.itemSectionRenderer?.contents ?? [];
      }
    } else if (onResponseReceivedCommands) {
      contents =
        onResponseReceivedCommands[0]?.appendContinuationItemsAction?.continuationItems ?? [];
    }

    const results: VideoDTO[] = [];

    for (const section of contents) {
      if (section?.continuationItemRenderer && !continuation) {
        continuation =
          section.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
        continue;
      }

      const itemSectionContents = section?.itemSectionRenderer?.contents ?? [];
      const itemsToProcess = section?.itemSectionRenderer ? itemSectionContents : [section];

      for (const item of itemsToProcess) {
        const v = VideoDTO.search(item);
        if (v) {
          results.push(v);
          continue;
        }

        if (item?.continuationItemRenderer && !continuation) {
          continuation =
            item.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
          continue;
        }

        const model = item?.elementRenderer?.newElement?.type?.componentType?.model;

        const videoData = model?.compactVideoModel?.compactVideoData;
        const playlistData = model?.compactPlaylistModel?.compactPlaylistData;

        if (videoData && typeof videoData === "object") {
          const v = VideoDTO.compactVideo(videoData);
          if (v) results.push(v);
        } else if (playlistData && typeof playlistData === "object") {
          const v = VideoDTO.compactPlaylist(playlistData);
          if (v) results.push(v);
        }
      }
    }

    return new PlaylistDTO({
      playlistId: "play-list-search",
      fromNext: false,
      title: "",
      playlist: results,
      continuation,
    });
  }

  static next(data: any): PlaylistDTO {
    const result =
      data?.contents?.twoColumnWatchNextResults ?? data?.contents?.singleColumnWatchNextResults;

    let continuation =
      result?.results?.results?.continuations?.[0]?.nextContinuationData?.continuation;

    const playlistData = result?.playlist?.playlist;
    const playlistId = playlistData?.playlistId as string | undefined;
    const title = playlistData?.title as string | undefined;

    let videos: VideoDTO[] = [];

    if (playlistData) {
      const contents = playlistData?.contents ?? [];
      videos = contents
        .map((c: any) => (c?.playlistPanelVideoRenderer ? c.playlistPanelVideoRenderer : null))
        .filter(Boolean)
        .map((node: any) => VideoDTO.next(node))
        .filter((v: VideoDTO | null): v is VideoDTO => !!v);
    } else {
      // Handle secondary results (suggestions)
      const secondaryResults = result?.secondaryResults?.secondaryResults?.results ?? [];
      videos = secondaryResults
        .map((c: any) => {
          if (c?.lockupViewModel) return VideoDTO.lockup(c);
          if (c?.compactVideoRenderer) return VideoDTO.next(c.compactVideoRenderer);
          return null;
        })
        .filter((v: VideoDTO | null): v is VideoDTO => !!v);

      // Find continuation in secondary results
      if (!continuation) {
        const lastItem = secondaryResults[secondaryResults.length - 1];
        if (lastItem?.continuationItemRenderer) {
          continuation =
            lastItem.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
        }
      }
    }

    return new PlaylistDTO({
      playlistId,
      fromNext: true,
      title,
      playlist: videos,
      continuation,
    });
  }

  static nextContinuations(data: any): PlaylistDTO {
    const result = data?.continuationContents?.sectionListContinuation;
    const continuation = result?.continuations?.[0]?.nextContinuationData?.continuation;

    const contents = result?.contents?.[0]?.itemSectionRenderer?.contents ?? [];

    const videos: VideoDTO[] = contents
      .map((c: any) => (c?.elementRenderer ? c.elementRenderer : null))
      .filter(Boolean)
      .map((node: any) => VideoDTO.nextContinuations(node))
      .filter((v: VideoDTO | null): v is VideoDTO => !!v);

    return new PlaylistDTO({
      playlistId: "",
      fromNext: true,
      title: "",
      playlist: videos,
      continuation,
    });
  }

  static browse(data: any): PlaylistDTO {
    const renderer =
      data?.contents?.twoColumnBrowseResultsRenderer ??
      data?.contents?.singleColumnBrowseResultsRenderer;

    const playlistData =
      renderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer;

    const contents = playlistData?.contents ?? [];
    const continuation = playlistData?.continuations?.[0]?.nextContinuationData?.continuation;

    const playlistId = playlistData?.playlistId as string | undefined;
    const title = data?.header?.pageHeaderRenderer?.pageTitle as string | undefined;

    const videos: VideoDTO[] = contents
      .map((c: any) => (c?.playlistVideoRenderer ? c.playlistVideoRenderer : null))
      .filter(Boolean)
      .map((node: any) => VideoDTO.browse(node))
      .filter((v: VideoDTO | null): v is VideoDTO => !!v);

    return new PlaylistDTO({
      playlistId,
      fromNext: false,
      title,
      playlist: videos,
      continuation,
    });
  }

  static browseContinuations(data: any): PlaylistDTO {
    const result = data?.continuationContents?.playlistVideoListContinuation;
    const continuation = result?.continuations?.[0]?.nextContinuationData?.continuation;

    const contents = result?.contents ?? [];

    const videos: VideoDTO[] = contents
      .map((c: any) => (c?.playlistVideoRenderer ? c.playlistVideoRenderer : null))
      .filter(Boolean)
      .map((node: any) => VideoDTO.browseContinuations(node))
      .filter((v: VideoDTO | null): v is VideoDTO => !!v);

    return new PlaylistDTO({
      playlistId: "",
      fromNext: false,
      title: "",
      playlist: videos,
      continuation,
    });
  }
}
