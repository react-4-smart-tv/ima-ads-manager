import { google, ImaSdk } from ".";
export interface ConfigAds {
    adTagUrl: string;
    skipTime?: number;
    isLiveContent?: boolean;
}
export interface ConfigAdsManager {
    isDebug?: boolean;
    onLoadScriptSuccess?: (ima: ImaSdk) => void;
    onLoadScriptError?: (error: any) => void;
}
export interface IAdsManager {
    loadAds(config: ConfigAds): void;
    skipAd(): void;
    setVideoId(videoId: string): void;
    getVideoElement(): HTMLVideoElement | null;
    setContainerId(containerId: string): void;
    getContainerElement(): HTMLElement | null;
    clearAds(): void;
    getImaSdk(): ImaSdk | undefined;
    getImaAdsLoader(): google.ima.AdsLoader | undefined;
    getImaAdsManager(): google.ima.AdsManager | undefined;
}
