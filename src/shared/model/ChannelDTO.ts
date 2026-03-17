import { VideoDTO } from "./VideoDTO";

export class ChannelDTO {
  public readonly id: string;
  public browseId?: string;
  public meta: {
    title: string;
    description?: string;
    channelUrl?: string;
    avatarUrl?: string;
    subscriberText?: string;
    keywords?: string[];
  };
  public videos: VideoDTO[];

  constructor(params: {
    title: string;
    description?: string;
    browseId?: string;
    channelUrl?: string;
    avatarUrl?: string;
    subscriberText?: string;
    keywords?: string[];
    videos?: VideoDTO[];
  }) {
    this.id = (-Date.now()).toString();
    this.browseId = params.browseId;
    this.meta = {
      title: params.title,
      description: params.description,
      channelUrl: params.channelUrl,
      avatarUrl: params.avatarUrl,
      subscriberText: params.subscriberText,
      keywords: params.keywords,
    };
    this.videos = params.videos ?? [];
  }

  /**
   * Tạo đầy đủ ChannelDTO từ response browse channel:
   * - Lấy metadata từ metadata.channelMetadataRenderer
   * - Lấy list video + continuation từ playlistVideoListRenderer
   */
  static create(json: any): ChannelDTO | null {
    const metadataRenderer =
      json?.metadata?.channelMetadataRenderer ?? json?.channelMetadataRenderer;

    const browseRenderer =
      json?.contents?.twoColumnBrowseResultsRenderer ??
      json?.contents?.singleColumnBrowseResultsRenderer;

    const playlistData =
      browseRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer;

    const contents = playlistData?.contents ?? [];
    const continuation =
      playlistData?.continuations?.[0]?.nextContinuationData?.continuation ?? undefined;

    const videos: VideoDTO[] = contents
      .map((c: any) => (c?.playlistVideoRenderer ? c.playlistVideoRenderer : null))
      .filter(Boolean)
      .map((node: any) => VideoDTO.browse(node))
      .filter((v: VideoDTO | null): v is VideoDTO => !!v);

    if (!metadataRenderer && videos.length === 0) return null;

    const title: string = metadataRenderer?.title ?? "";
    const description: string | undefined = metadataRenderer?.description;
    const channelUrl: string | undefined = metadataRenderer?.channelUrl;

    const avatarThumb =
      metadataRenderer?.avatar?.thumbnails?.slice(-1)?.[0] ??
      metadataRenderer?.avatar?.thumbnails?.[0] ??
      undefined;
    const avatarUrl: string | undefined = avatarThumb?.url;

    const keywordsRaw: unknown = metadataRenderer?.keywords;
    const keywords: string[] | undefined = Array.isArray(keywordsRaw)
      ? (keywordsRaw as string[])
      : typeof keywordsRaw === "string"
        ? keywordsRaw.split(/\s+/).filter(Boolean)
        : undefined;

    const browseId: string | undefined = metadataRenderer?.externalId;

    if (!title && !avatarUrl && !channelUrl && !description && videos.length === 0) return null;

    return new ChannelDTO({
      title,
      description,
      browseId,
      channelUrl,
      avatarUrl,
      subscriberText: undefined,
      keywords,
      videos,
    });
  }
}
