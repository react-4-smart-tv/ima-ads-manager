'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var eventemitter3 = {exports: {}};

(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
}(eventemitter3));

var AdsManagerEvents = {
    AD_SKIP_TIME: "adSkipTime",
    AD_ERROR: "adError",
    AD_PROGRESS: "adProgress",
    AD_ON_CONTENT_PAUSE_REQUEST: "onContentPauseRequested",
    AD_ON_CONTENT_RESUME_REQUEST: "onContentResumeRequested",
};

var AdsManager = /** @class */ (function (_super) {
    __extends(AdsManager, _super);
    function AdsManager(config) {
        var _this = _super.call(this) || this;
        _this._name = "AdsManager";
        _this._idVideo = "";
        _this._idContainer = "";
        _this._videoElement = null;
        _this._containerElement = null;
        _this._showAds_ = false;
        _this._currentTime = 0;
        _this._skipTime = 0;
        _this.onAdsManagerLoaded = function (event, config) {
            var _a, _b;
            var videoElement = _this.getVideoElement();
            if (!videoElement)
                return;
            if (!_this.imaSdk)
                return;
            var renderSetting = new _this.imaSdk.AdsRenderingSettings();
            renderSetting.playAdsAfterTime = -1;
            if (renderSetting === null || renderSetting === void 0 ? void 0 : renderSetting["useVideoAdUi"]) {
                renderSetting["useVideoAdUi"] = false;
            }
            if (renderSetting === null || renderSetting === void 0 ? void 0 : renderSetting["disableUi"]) {
                renderSetting["disableUi"] = true;
            }
            renderSetting.loadVideoTimeout = 8000;
            renderSetting.enablePreloading = true;
            renderSetting.useStyledLinearAds = false;
            renderSetting.useStyledNonLinearAds = false;
            renderSetting.restoreCustomPlaybackStateOnAdBreakComplete = false;
            _this.imaAdsManager = event.getAdsManager(videoElement);
            _this.imaAdsManager.init(videoElement.clientWidth, videoElement.clientHeight, _this.imaSdk.ViewMode.NORMAL);
            _this.imaAdsManager.updateAdsRenderingSettings(renderSetting);
            (_a = _this.imaAdsManager) === null || _a === void 0 ? void 0 : _a.addEventListener(_this.imaSdk.AdErrorEvent.Type.AD_ERROR, _this.onAdError);
            _this.emit(AdsManagerEvents.AD_SKIP_TIME, 0);
            (_b = _this.imaAdsManager) === null || _b === void 0 ? void 0 : _b.start();
            _this._clearTimerStartLoad();
            _this._timerStartLoad = setTimeout(function () { return _this.onContentResumeRequested(); }, 10000);
            Object.keys(_this.imaSdk.AdEvent.Type).map(function (row, i) {
                var _a, _b;
                (_a = _this.imaAdsManager) === null || _a === void 0 ? void 0 : _a.addEventListener((_b = _this.imaSdk) === null || _b === void 0 ? void 0 : _b.AdEvent.Type[row], function (e) {
                    var _a;
                    var adData = e.getAdData();
                    if (!_this.imaSdk) {
                        _this.clearAds();
                        return;
                    }
                    switch (e === null || e === void 0 ? void 0 : e.type) {
                        case _this.imaSdk.AdEvent.Type.AD_BREAK_READY:
                            (_a = _this.imaAdsManager) === null || _a === void 0 ? void 0 : _a.start();
                            break;
                        case _this.imaSdk.AdEvent.Type.LOADED:
                            _this.onAdLoaded(e, config);
                            break;
                        case _this.imaSdk.AdEvent.Type.SKIPPABLE_STATE_CHANGED:
                            break;
                        case _this.imaSdk.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                            _this.onContentResumeRequested(e);
                            break;
                        case _this.imaSdk.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                            _this.onContentPauseRequested(e);
                            break;
                        case _this.imaSdk.AdEvent.Type.AD_BUFFERING:
                            _this._clearTimerBuffer();
                            _this._timerBuffering = setTimeout(function () { return _this.onContentResumeRequested(); }, 7000);
                            break;
                        case _this.imaSdk.AdEvent.Type.ALL_ADS_COMPLETED:
                            _this.onContentResumeRequested(e);
                            break;
                        case _this.imaSdk.AdErrorEvent.Type.AD_ERROR:
                            _this.onAdError(e);
                            break;
                        case _this.imaSdk.AdEvent.Type.LOG:
                            if (adData["adError"] && adData["adError"].getMessage) {
                                _this.emit(AdsManagerEvents.AD_ERROR, adData["adError"].getMessage());
                            }
                            break;
                        case _this.imaSdk.AdEvent.Type.STARTED:
                            _this._currentTime = 0;
                            _this.emit(AdsManagerEvents.AD_PROGRESS, {
                                currentTime: 0,
                            });
                            break;
                        case _this.imaSdk.AdEvent.Type.AD_PROGRESS:
                            var progressData = e.getAdData();
                            _this._clearTimerStartLoad();
                            if (progressData) {
                                if (progressData.currentTime !== _this._currentTime) {
                                    _this._currentTime = progressData.currentTime;
                                    _this._clearTimerBuffer();
                                    _this._timerBuffering = setTimeout(function () { return _this.onContentResumeRequested(); }, 10000);
                                }
                                _this.emit(AdsManagerEvents.AD_PROGRESS, {
                                    currentTime: progressData.currentTime,
                                    progressData: progressData,
                                });
                            }
                            _this._clearTimerPlayer();
                            break;
                    }
                }, false);
                return;
            });
        };
        _this.onAdLoaded = function (event, config) {
            var _a, _b;
            var adPodInfo = (_a = event
                .getAd()) === null || _a === void 0 ? void 0 : _a.getAdPodInfo();
            var skipTime = config.skipTime;
            if (adPodInfo) {
                if (skipTime && skipTime < adPodInfo.getMaxDuration()) {
                    _this.emit(AdsManagerEvents.AD_SKIP_TIME, skipTime);
                }
            }
            if (!((_b = event.getAd()) === null || _b === void 0 ? void 0 : _b.isLinear())) {
                _this.onContentResumeRequested(event);
            }
        };
        _this.onAdError = function (adErrorEvent) {
            if (_this.imaAdsManager) {
                _this.imaAdsManager.destroy();
            }
            _this.onContentResumeRequested();
        };
        _this.onContentResumeRequested = function (event) {
            var _a;
            if (!_this._showAds_)
                return;
            _this._showAds_ = false;
            _this.emit(AdsManagerEvents.AD_PROGRESS, { currentTime: 0 });
            var callback = function () {
                _this.emit(AdsManagerEvents.AD_ON_CONTENT_RESUME_REQUEST, event);
            };
            _this._clearTimerPlayer();
            _this._timerPlayer = setTimeout(callback, 1000);
            (_a = _this.imaAdsManager) === null || _a === void 0 ? void 0 : _a.stop();
        };
        _this.onContentPauseRequested = function (event) {
            _this._showAds_ = true;
            _this.emit(AdsManagerEvents.AD_ON_CONTENT_PAUSE_REQUEST, event);
            _this._clearTimerPlayer();
        };
        _this._name = "AdsManager";
        _this.init(config);
        return _this;
    }
    AdsManager.getInstance = function (config) {
        if (!this._instance) {
            this._instance = new AdsManager(config);
        }
        return this._instance;
    };
    AdsManager.clear = function () {
        var _a;
        (_a = this._instance) === null || _a === void 0 ? void 0 : _a.destroy();
        delete this._instance;
    };
    AdsManager.prototype.init = function (config) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var imaSdk, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, loadImaSdk({ isDebug: (config === null || config === void 0 ? void 0 : config.isDebug) || false })];
                    case 1:
                        imaSdk = _c.sent();
                        this.imaSdk = imaSdk;
                        (_a = config === null || config === void 0 ? void 0 : config.onLoadScriptSuccess) === null || _a === void 0 ? void 0 : _a.call(config, imaSdk);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        (_b = config === null || config === void 0 ? void 0 : config.onLoadScriptError) === null || _b === void 0 ? void 0 : _b.call(config, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdsManager.prototype.destroy = function () {
        this.clearAds();
    };
    AdsManager.prototype.clearAds = function () {
        this.resetAds();
        this._skipTime = 0;
        this._idVideo = "";
        this._idContainer = "";
        this._videoElement = null;
        this._containerElement = null;
    };
    AdsManager.prototype.resetAds = function () {
        this._showAds_ = false;
        this.emit(AdsManagerEvents.AD_PROGRESS, { currentTime: 0 });
        if (this.imaAdsLoader) {
            // this.imaAdsLoader.contentComplete();
            this.imaAdsLoader.destroy();
            this.imaAdsLoader = undefined;
        }
        if (this.imaAdsManager) {
            this.imaAdsManager.destroy();
            this.imaAdsManager = undefined;
        }
        this._clearTimerBuffer();
        this._clearTimerPlayer();
        this._clearTimerStartLoad();
    };
    AdsManager.prototype.skipAd = function () {
        var _a;
        if (this._currentTime >= this._skipTime) {
            (_a = this.imaAdsManager) === null || _a === void 0 ? void 0 : _a.stop();
        }
    };
    AdsManager.prototype.getImaSdk = function () {
        return this.imaSdk;
    };
    AdsManager.prototype.getImaAdsLoader = function () {
        return this.imaAdsLoader;
    };
    AdsManager.prototype.getImaAdsManager = function () {
        return this.imaAdsManager;
    };
    AdsManager.prototype.setVideoId = function (videoId) {
        this._idVideo = videoId;
        this._videoElement = document.getElementById(videoId);
    };
    AdsManager.prototype.getVideoElement = function () {
        if (!this._idVideo)
            return null;
        if (!this._videoElement) {
            this._videoElement = document.getElementById(this._idVideo);
        }
        return this._videoElement;
    };
    AdsManager.prototype.setContainerId = function (containerId) {
        this._idContainer = containerId;
        this._containerElement = document.getElementById(containerId);
        this.removeChild();
    };
    AdsManager.prototype.getContainerElement = function () {
        if (!this._idContainer)
            return null;
        if (!this._containerElement) {
            this._containerElement = document.getElementById(this._idContainer);
        }
        return this._containerElement;
    };
    AdsManager.prototype.loadAds = function (config) {
        var _a;
        if (!(config === null || config === void 0 ? void 0 : config.adTagUrl))
            return;
        if (!this.imaSdk || !((_a = this.imaSdk) === null || _a === void 0 ? void 0 : _a.AdsRequest))
            return;
        this.removeChild();
        if (config === null || config === void 0 ? void 0 : config.skipTime) {
            this._skipTime = config.skipTime;
        }
        // this.resetAds();
        var adsRequest = new this.imaSdk.AdsRequest();
        adsRequest.adTagUrl = config.adTagUrl;
        this.settingAdsLoader(config, adsRequest);
    };
    AdsManager.prototype.removeChild = function () {
        var container = this.getContainerElement();
        if (container) {
            if (container.hasChildNodes()) {
                for (var index = 0; index < container.children.length; index++) {
                    var element = container.children[index];
                    if (element.tagName === "DIV") {
                        container.removeChild(element);
                    }
                }
            }
        }
    };
    AdsManager.prototype.settingAdsLoader = function (config, adsRequest) {
        var _this = this;
        var _a, _b;
        if (!this.imaSdk ||
            !((_a = this.imaSdk) === null || _a === void 0 ? void 0 : _a.AdsRequest) ||
            !((_b = this.imaSdk) === null || _b === void 0 ? void 0 : _b.AdDisplayContainer))
            return;
        var videoElement = this.getVideoElement();
        var containerElement = this.getContainerElement();
        if (!videoElement || !containerElement)
            return;
        var imaAdDisplayContainer = new this.imaSdk.AdDisplayContainer(containerElement, videoElement);
        imaAdDisplayContainer.initialize();
        this.resetAds();
        this.imaAdsLoader = new this.imaSdk.AdsLoader(imaAdDisplayContainer);
        this.imaSdk.settings.setNumRedirects(8);
        if (!!adsRequest) {
            adsRequest.setAdWillAutoPlay(true);
            adsRequest.setAdWillPlayMuted(false);
            adsRequest.linearAdSlotWidth = videoElement.clientWidth;
            adsRequest.linearAdSlotHeight = videoElement.clientHeight;
            adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
            adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight;
            this.imaAdsLoader.addEventListener(this.imaSdk.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (event) { return _this.onAdsManagerLoaded(event, config); });
            this.imaAdsLoader.addEventListener(this.imaSdk.AdErrorEvent.Type.AD_ERROR, this.onAdError);
            this.imaAdsLoader.getSettings().setAutoPlayAdBreaks(false);
            this.imaAdsLoader.requestAds(adsRequest);
        }
    };
    AdsManager.prototype._clearTimerBuffer = function () {
        if (this._timerBuffering) {
            clearTimeout(this._timerBuffering);
            this._timerBuffering = undefined;
        }
    };
    AdsManager.prototype._clearTimerPlayer = function () {
        if (this._timerPlayer) {
            clearTimeout(this._timerPlayer);
            this._timerPlayer = undefined;
        }
    };
    AdsManager.prototype._clearTimerStartLoad = function () {
        if (this._timerStartLoad) {
            clearTimeout(this._timerStartLoad);
            this._timerStartLoad = undefined;
        }
    };
    return AdsManager;
}(eventemitter3.exports.EventEmitter));

exports.AdsManagerEvents = AdsManagerEvents;
exports.SDKAdsManager = AdsManager;
exports.loadImaSdk = loadImaSdk;
exports.loadScript = loadAdsScript;
