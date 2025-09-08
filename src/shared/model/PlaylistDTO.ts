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
    const contents =
      data?.contents?.sectionListRenderer?.contents ?? [];

    const continuation =
      data?.contents?.sectionListRenderer?.continuations?.[0]?.nextContinuationData?.continuation;

    const allContents = contents
      .map((c: any) => c?.itemSectionRenderer?.contents ?? [])
      .flat();

    const results: VideoDTO[] = [];

    for (const item of allContents) {
      const model =
        item?.elementRenderer?.newElement?.type?.componentType?.model;

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

    return new PlaylistDTO({
      playlistId: "play-list-search",
      fromNext: false,
      title: "",
      playlist: results,
      continuation,
    });
  }

  static searchContinuations(data: any): PlaylistDTO {
    const result = data?.continuationContents?.sectionListContinuation;
    const continuation =
      result?.continuations?.[0]?.nextContinuationData?.continuation;

    const contents =
      result?.contents?.[0]?.itemSectionRenderer?.contents ?? [];

    const results: VideoDTO[] = [];

    for (const item of contents) {
      const model =
        item?.elementRenderer?.newElement?.type?.componentType?.model;

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
      data?.contents?.twoColumnWatchNextResults ??
      data?.contents?.singleColumnWatchNextResults;

    const continuation =
      result?.results?.results?.continuations?.[0]?.nextContinuationData
        ?.continuation;

    const playlistData = result?.playlist?.playlist;
    const playlistId = playlistData?.playlistId as string | undefined;
    const title = playlistData?.title as string | undefined;

    const contents = playlistData?.contents ?? [];

    const videos: VideoDTO[] = contents
      .map((c: any) =>
        c?.playlistPanelVideoRenderer ? c.playlistPanelVideoRenderer : null
      )
      .filter(Boolean)
      .map((node: any) => VideoDTO.next(node))
      .filter((v: VideoDTO | null): v is VideoDTO => !!v);

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
    const continuation =
      result?.continuations?.[0]?.nextContinuationData?.continuation;

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
    const continuation =
      playlistData?.continuations?.[0]?.nextContinuationData?.continuation;

    const playlistId = playlistData?.playlistId as string | undefined;
    const title =
      data?.header?.pageHeaderRenderer?.pageTitle as string | undefined;

    const videos: VideoDTO[] = contents
      .map((c: any) =>
        c?.playlistVideoRenderer ? c.playlistVideoRenderer : null
      )
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
    const continuation =
      result?.continuations?.[0]?.nextContinuationData?.continuation;

    const contents = result?.contents ?? [];

    const videos: VideoDTO[] = contents
      .map((c: any) =>
        c?.playlistVideoRenderer ? c.playlistVideoRenderer : null
      )
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
