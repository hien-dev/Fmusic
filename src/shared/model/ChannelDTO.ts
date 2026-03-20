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
   * - Lấy list video từ richGridRenderer (tab "Videos" đang selected)
   */
  static create(json: any): ChannelDTO | null {
    const metadataRenderer =
      json?.metadata?.channelMetadataRenderer ?? json?.channelMetadataRenderer;

    const browseRenderer =
      json?.contents?.twoColumnBrowseResultsRenderer ??
      json?.contents?.singleColumnBrowseResultsRenderer;

    const tabs = browseRenderer?.tabs ?? [];
    const selectedTab =
      tabs.find((t: any) => t?.tabRenderer?.selected) ??
      // fallback: tab videos thường nằm sau tab "Home"
      tabs?.[1] ??
      tabs?.[0];

    const richGridRenderer =
      selectedTab?.tabRenderer?.content?.richGridRenderer ??
      selectedTab?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
        ?.itemSectionRenderer?.contents?.[0]?.richGridRenderer;

    const gridContents = richGridRenderer?.contents ?? [];

    const videos: VideoDTO[] = gridContents
      .map((c: any) => c?.richItemRenderer?.content?.videoRenderer ?? null)
      .filter(Boolean)
      .map((videoRenderer: any) => {
        // Ưu tiên dùng helper sẵn có của VideoDTO để map author/title/thumbnail
        const v = VideoDTO.search({ videoRenderer });
        if (v) return v;

        // fallback nếu thiếu some fields mà VideoDTO.search trả về null
        const videoId = videoRenderer?.videoId;
        const title =
          videoRenderer?.title?.runs?.[0]?.text ??
          videoRenderer?.title?.simpleText ??
          "";
        const author =
          videoRenderer?.shortBylineText?.runs?.[0]?.text ??
          videoRenderer?.longBylineText?.runs?.[0]?.text ??
          videoRenderer?.ownerText?.runs?.[0]?.text ??
          "";
        const thumbnailURL =
          videoRenderer?.thumbnail?.thumbnails?.[0]?.url ??
          videoRenderer?.thumbnail?.thumbnails?.slice(-1)?.[0]?.url ??
          "";

        if (!videoId && !title && !thumbnailURL) return null;

        return new VideoDTO({
          title,
          thumbnailURL,
          author,
          videoId,
        });
      })
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
