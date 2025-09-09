export interface VideoSource {
  uri: string;
  metadata: {
    title: string;
    imageUri: string;
  };
}

export class VideoDTO {
  public readonly id: string;
  public videoId?: string;
  public browseId?: string;
  public playlistId?: string;
  public title: string;
  public thumbnailURL: string;
  public author: string;
  public url?: string;

  constructor(params: {
    title: string;
    thumbnailURL: string;
    author: string;
    videoId?: string;
    browseId?: string;
    playlistId?: string;
    url?: string;
  }) {
    this.id = (-Date.now()).toString();
    this.title = params.title;
    this.thumbnailURL = params.thumbnailURL;
    this.author = params.author;
    this.videoId = params.videoId;
    this.browseId = params.browseId;
    this.playlistId = params.playlistId;
    this.url = params.url;
  }

  get isPlaylist(): boolean {
    return !!(this.browseId || this.playlistId);
  }

  static compactVideo(json: any): VideoDTO | null {
    const videoId =
      json?.onTap?.innertubeCommand?.coWatchWatchEndpointWrapperCommand?.watchEndpoint
        ?.watchEndpoint?.videoId;

    const videoData = json?.videoData ?? {};
    const title = videoData?.metadata?.title ?? "";
    const author = videoData?.metadata?.byline ?? "";
    const thumbnailURL = videoData?.thumbnail?.image?.sources?.[0]?.url ?? "";

    if (!title && !thumbnailURL && !author && !videoId) return null;

    return new VideoDTO({
      title,
      thumbnailURL,
      author,
      videoId,
    });
  }

  static compactPlaylist(json: any): VideoDTO | null {
    const title = json?.metadata?.title ?? "";
    const author = `Playlist · ${json?.thumbnail?.videoCountA11y ?? "mix"}`;
    const thumbnailURL = json?.thumbnail?.image?.sources?.[0]?.url ?? "";

    const dragAndDropUrl: string | undefined = json?.dragAndDropUrl;
    const browseIdFromDragAndDropUrl = this.replaceBrowseId(dragAndDropUrl);

    const explicitBrowseId = json?.onTap?.innertubeCommand?.browseEndpoint?.browseId;

    const browseId =
      explicitBrowseId ??
      (typeof browseIdFromDragAndDropUrl === "string" ? browseIdFromDragAndDropUrl : undefined);

    const videoId =
      typeof browseIdFromDragAndDropUrl === "object"
        ? (browseIdFromDragAndDropUrl as Record<string, string>)?.videoId
        : undefined;

    const playlistId =
      typeof browseIdFromDragAndDropUrl === "object"
        ? (browseIdFromDragAndDropUrl as Record<string, string>)?.playlistId
        : undefined;

    if (!title && !thumbnailURL && !author && !browseId && !playlistId) {
      return null;
    }

    return new VideoDTO({
      title,
      thumbnailURL,
      author,
      videoId,
      browseId,
      playlistId,
    });
  }

  static next(json: any): VideoDTO | null {
    const videoId = json?.videoId;
    const title = json?.title?.simpleText ?? json?.title?.runs?.[0]?.text ?? "";
    const author = json?.shortBylineText?.runs?.[0]?.text ?? "";
    const thumbnailURL = json?.thumbnail?.thumbnails?.[0]?.url ?? "";

    if (!title && !thumbnailURL && !author && !videoId) return null;

    return new VideoDTO({
      title,
      thumbnailURL,
      author,
      videoId,
    });
  }

  static nextContinuations(json: any): VideoDTO | null {
    const videoWithContextData =
      json?.newElement?.type?.componentType?.model?.videoWithContextModel?.videoWithContextData;

    const videoId =
      videoWithContextData?.onTap?.innertubeCommand?.coWatchWatchEndpointWrapperCommand
        ?.watchEndpoint?.watchEndpoint?.videoId ?? "";

    const title = videoWithContextData?.videoData?.metadata?.title ?? "";

    const author = json?.videoData?.metadata?.metadataDetails ?? "";

    const thumbnailURL = videoWithContextData?.videoData?.thumbnail?.image?.sources?.[0]?.url ?? "";

    if (!title && !thumbnailURL && !author && !videoId) return null;

    return new VideoDTO({
      title,
      thumbnailURL,
      author,
      videoId,
    });
  }

  static browse(json: any): VideoDTO | null {
    const videoId = json?.videoId;
    const title = json?.title?.runs?.[0]?.text ?? "";
    const author = json?.shortBylineText?.runs?.[0]?.text ?? "";
    const thumbnailURL = json?.thumbnail?.thumbnails?.[0]?.url ?? "";

    if (!title && !thumbnailURL && !author && !videoId) return null;

    return new VideoDTO({
      title,
      thumbnailURL,
      author,
      videoId,
    });
  }

  static browseContinuations(json: any): VideoDTO | null {
    return this.browse(json);
  }

  static detail(json: any): VideoDTO | null {
    const playerResponse = json;
    const videoId = playerResponse?.videoDetails?.videoId;
    const title = playerResponse?.videoDetails?.title ?? "";
    const thumbnailURL =
      playerResponse?.videoDetails?.thumbnail?.thumbnails?.slice(-1)?.[0]?.url ?? "";
    const url = playerResponse?.streamingData?.hlsManifestUrl;

    if (!title && !thumbnailURL && !videoId && !url) return null;

    return new VideoDTO({
      title,
      thumbnailURL,
      author: "",
      videoId,
      url,
    });
  }

  static iTag18(json: any): VideoDTO | null {
    const playerResponse = json?.playerResponse;
    const videoId = playerResponse?.videoDetails?.videoId;
    const title = playerResponse?.videoDetails?.title ?? "";
    const thumbnailURL =
      playerResponse?.videoDetails?.thumbnail?.thumbnails?.slice(-1)?.[0]?.url ?? "";
    const url = playerResponse?.streamingData?.formats?.[0]?.url ?? "";

    if (!title && !thumbnailURL && !videoId && !url) return null;

    return new VideoDTO({
      title,
      thumbnailURL,
      author: "",
      videoId,
      url,
    });
  }

  private static replaceBrowseId(
    data: unknown
  ): { videoId: string; playlistId: string } | string | null {
    if (typeof data !== "string") return null;

    if (data.includes("list") && data.includes("watch")) {
      const vValue = this.getQueryParam(data, "v");
      const listValue = this.getQueryParam(data, "list");

      if (vValue && listValue) {
        return { videoId: vValue, playlistId: listValue };
      }
    }

    if (data.includes("playlist?list=")) {
      return data.replace("https://www.youtube.com/playlist?list=", "");
    }

    return null;
  }

  private static getQueryParam(url: string, param: string): string | null {
    try {
      const u = new URL(url);
      const v = u.searchParams.get(param);
      return v ?? null;
    } catch {
      const qIndex = url.indexOf("?");
      if (qIndex === -1) return null;
      const qs = url.substring(qIndex + 1);
      const sp = new URLSearchParams(qs);
      return sp.get(param);
    }
  }
}
