export const BASE_URL = "https://www.youtube.com/";
export const IOS_CLIENT_VERSION = "19.45.4";
export const IOS_DEVICE_MODEL = "iPhone16,2";
export const IOS_OS_VERSION = "17.5.1.21F90";
export const ANDROID_OS_VERSION = "10_12_6";
export const ANDROID_SDK_VERSION = "34";
export const ANDROID_CLIENT_VERSION = "19.28.35";
export const BROWSER_VERSION = "92.0.3404.129";
export const VISITOR_DATA = "Cgs0VzczaDg0NERzNCj0wsDEBjIKCgJWThIEGgAgLw%3D%3D";

export enum Endpoint {
  requestHeader = "requestHeader",
  suggestQueries = "suggestQueries",
  search = "search",
  next = "next",
  browse = "browse",
  reel = "reel",
  player = "player",
}

export const endpointPath = (endpoint: keyof typeof Endpoint): string => {
  switch (endpoint) {
    case Endpoint.requestHeader:
      return BASE_URL;
    case Endpoint.suggestQueries:
      return "https://suggestqueries-clients6.youtube.com/complete/search?ds=yt&client=youtube&gs_ri=youtube&q=";
    case Endpoint.search:
      return `${BASE_URL}youtubei/v1/search?prettyPrint=false`;
    case Endpoint.next:
      return `${BASE_URL}youtubei/v1/next?prettyPrint=false&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`;
    case Endpoint.browse:
      return `${BASE_URL}youtubei/v1/browse?prettyPrint=false&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`;
    case Endpoint.reel:
      return "https://youtubei.googleapis.com/youtubei/v1/reel/reel_item_watch?%24fields=playerResponse";
    case Endpoint.player:
      return "https://youtubei.googleapis.com/youtubei/v1/player";
    default:
      return BASE_URL;
  }
};

export const baseWebBody = ({
  query,
  continuation,
  videoId,
}: {
  query?: string;
  continuation?: string;
  videoId?: string;
}) => {
  return {
    context: {
      client: {
        clientName: "WEB",
        clientVersion: "2.20241205.01.00",
      },
    },
    ...(query ? { query } : {}),
    ...(continuation ? { continuation } : {}),
    ...(videoId ? { videoId } : {}),
    contentCheckOk: true,
    racyCheckOk: true,
  };
};

export const baseAudioBody = (videoId: string) => {
  return {
    videoId: videoId,
    cpn: "DUA5nfxp-d977GYp",
    contentCheckOk: true,
    racyCheckOk: true,
    context: {
      client: {
        clientName: "ANDROID",
        clientVersion: "21.08.265",
        platform: "MOBILE",
        osName: "Android",
        osVersion: "14",
        androidSdkVersion: "34",
        hl: "en",
        gl: "US",
        utcOffsetMinutes: -240,
      },
      request: {
        internalExperimentFlags: [],
        useSsl: true,
      },
      user: {
        lockedSafetyMode: false,
      },
    },
  };
};
