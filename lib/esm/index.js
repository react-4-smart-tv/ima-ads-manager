// Asynchronous loader for external scripts
var loadAdsScript = function (src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.async = true;
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

var imaSdkSrc = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
var imaSdkSrcDebug = "https://imasdk.googleapis.com/js/sdkloader/ima3_debug.js";
var pendingPromise = null;
var promiseFinished = function () {
    pendingPromise = null;
};
var loadImaSdk = function (config) {
    var w = window;
    if (w.google && w.google.ima) {
        return Promise.resolve(w.google.ima);
    }
    if (pendingPromise) {
        return pendingPromise;
    }
    pendingPromise = loadAdsScript((config === null || config === void 0 ? void 0 : config.isDebug) ? imaSdkSrcDebug : imaSdkSrc).then(function () { return w.google.ima; });
    pendingPromise.then(promiseFinished).catch(promiseFinished);
    return pendingPromise;
};

export { loadImaSdk, loadAdsScript as loadScript };
