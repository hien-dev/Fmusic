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
      return `${BASE_URL}youtubei/v1/search?prettyPrint=false&key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`;
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

export const baseIOSBody = {
  context: {
    client: {
      remoteHost: "227.62.69.226",
      visitorData: VISITOR_DATA,
      clientName: "IOS",
      clientVersion: IOS_CLIENT_VERSION,
      deviceMake: "Apple",
      deviceModel: IOS_DEVICE_MODEL,
      platform: "MOBILE",
      osName: "iOS",
      osVersion: IOS_OS_VERSION,
      hl: "vi",
      gl: "VN",
      utcOffsetMinutes: -240,
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_6) AppleWebKit/534.35 (KHTML, like Gecko) Chrome/85.4.3358.135 Safari/530.34,gzip(gfe)",
    },
    user: {
      lockedSafetyMode: false,
    },
    request: {
      useSsl: true,
    },
  },
  contentCheckOk: true,
  racyCheckOk: true,
};

export const baseAudioBody = (videoId: string) => {
  return {
    context: {
      client: {
        osVersion: ANDROID_OS_VERSION,
        clientName: "ANDROID",
        hl: "vi",
        deviceMake: "Apple",
        browserName: "Chrome",
        remoteHost: "14.232.210.53",
        platform: "DESKTOP",
        userAgent: `Mozilla/5.0 (Macintosh; Intel Mac OS X ${ANDROID_OS_VERSION}) AppleWebKit/539.31 (KHTML, like Gecko) Chrome/${BROWSER_VERSION} Safari/540.34,gzip(gfe)`,
        clientVersion: ANDROID_CLIENT_VERSION,
        originalUrl: "https://www.youtube.com/",
        deviceModel: "",
        acceptHeader: "*/*",
        gl: "VN",
        visitorData: VISITOR_DATA,
        osName: "Android",
        browserVersion: BROWSER_VERSION,
        androidSdkVersion: ANDROID_SDK_VERSION,
      },
      request: {
        useSsl: true,
      },
      user: {
        lockedSafetyMode: false,
        enableSafetyMode: false,
      },
    },
    videoId,
    contentCheckOk: true,
    racyCheckOk: true,
    playerRequest: {
      videoId,
    },
    disablePlayerResponse: false,
  };
};
