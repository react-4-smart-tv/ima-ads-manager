import type { google } from "./ima";
export { default as loadImaSdk } from "./loadImaSdk";
export { default as loadScript } from "./loadScript";
export { default as SDKAdsManager } from "./ads.manager";
export * from "./ads.interface";
export * from "./ads.events";
export type ImaSdk = typeof google.ima;
export { google };
