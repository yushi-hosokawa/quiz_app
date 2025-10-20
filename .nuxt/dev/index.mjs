import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getResponseStatusText } from 'file:///home/uchoso/quiz/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///home/uchoso/quiz/node_modules/@vue/shared/dist/shared.cjs.js';
import { PrismaClient } from 'file:///home/uchoso/quiz/node_modules/@prisma/client/default.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///home/uchoso/quiz/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file:///home/uchoso/quiz/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///home/uchoso/quiz/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///home/uchoso/quiz/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///home/uchoso/quiz/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///home/uchoso/quiz/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///home/uchoso/quiz/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/uchoso/quiz/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/uchoso/quiz/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///home/uchoso/quiz/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///home/uchoso/quiz/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/uchoso/quiz/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///home/uchoso/quiz/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///home/uchoso/quiz/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/uchoso/quiz/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///home/uchoso/quiz/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///home/uchoso/quiz/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///home/uchoso/quiz/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///home/uchoso/quiz/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///home/uchoso/quiz/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///home/uchoso/quiz/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///home/uchoso/quiz/node_modules/vue/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///home/uchoso/quiz/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///home/uchoso/quiz/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///home/uchoso/quiz/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///home/uchoso/quiz/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/home/uchoso/quiz/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/uchoso/quiz","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/uchoso/quiz/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/uchoso/quiz/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/uchoso/quiz/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/home/uchoso/quiz/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "apiBase": "/api"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _aQgduzHjfHXJX44siLwcwlvrqWQzwU2ZAnhWQLjpw0 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/home/uchoso/quiz";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"プログラミング学習復習のためのフラッシュカードアプリ"}],"link":[],"style":[],"script":[],"noscript":[],"title":"Quiz App - プログラミング学習復習アプリ"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _T8B8_di1sz50VngqGR2gt99h0T9avxeySKfAVFIyAnQ = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _aQgduzHjfHXJX44siLwcwlvrqWQzwU2ZAnhWQLjpw0,
_T8B8_di1sz50VngqGR2gt99h0T9avxeySKfAVFIyAnQ
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _H4tive = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file:///home/uchoso/quiz/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file:///home/uchoso/quiz/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  islandHead.link ||= [];
  islandHead.style ||= [];
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_aeg9xl = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_3RErFh = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_CFB8WM = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_WQbgMN = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_SlGszd = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_sNHfcf = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_wT8lFQ = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_EspuyB = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_7fkTTw = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_ktn_pr = () => Promise.resolve().then(function () { return count_get$1; });
const _lazy_XOfdMi = () => Promise.resolve().then(function () { return importJson_post$1; });
const _lazy_aBdsDp = () => Promise.resolve().then(function () { return import_post$1; });
const _lazy_cko9xF = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_j_QIJp = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_Jm5fU3 = () => Promise.resolve().then(function () { return random_get$1; });
const _lazy_1fNOU8 = () => Promise.resolve().then(function () { return review_get$1; });
const _lazy_4PChmj = () => Promise.resolve().then(function () { return end_post$1; });
const _lazy_Vo3oXj = () => Promise.resolve().then(function () { return records_post$1; });
const _lazy_FODtrz = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_bALaM2 = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_9epIni = () => Promise.resolve().then(function () { return calendar_get$1; });
const _lazy_tVp0H1 = () => Promise.resolve().then(function () { return daily_get$1; });
const _lazy_y0HQLc = () => Promise.resolve().then(function () { return export_get$1; });
const _lazy__u_hDj = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_N7Xgsy = () => Promise.resolve().then(function () { return monthly_get$1; });
const _lazy_dx4juQ = () => Promise.resolve().then(function () { return problems_get$1; });
const _lazy_9z_mcl = () => Promise.resolve().then(function () { return recentSessions_get$1; });
const _lazy_YgBJ_O = () => Promise.resolve().then(function () { return weakProblems_get$1; });
const _lazy_88ZNta = () => Promise.resolve().then(function () { return weekly_get$1; });
const _lazy_YSh7Ih = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _H4tive, lazy: false, middleware: true, method: undefined },
  { route: '/api/genres/:id', handler: _lazy_aeg9xl, lazy: true, middleware: false, method: "delete" },
  { route: '/api/genres', handler: _lazy_3RErFh, lazy: true, middleware: false, method: "get" },
  { route: '/api/genres', handler: _lazy_CFB8WM, lazy: true, middleware: false, method: "post" },
  { route: '/api/languages/:id', handler: _lazy_WQbgMN, lazy: true, middleware: false, method: "delete" },
  { route: '/api/languages', handler: _lazy_SlGszd, lazy: true, middleware: false, method: "get" },
  { route: '/api/languages', handler: _lazy_sNHfcf, lazy: true, middleware: false, method: "post" },
  { route: '/api/problems/:id', handler: _lazy_wT8lFQ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/problems/:id', handler: _lazy_EspuyB, lazy: true, middleware: false, method: "get" },
  { route: '/api/problems/:id', handler: _lazy_7fkTTw, lazy: true, middleware: false, method: "put" },
  { route: '/api/problems/count', handler: _lazy_ktn_pr, lazy: true, middleware: false, method: "get" },
  { route: '/api/problems/import-json', handler: _lazy_XOfdMi, lazy: true, middleware: false, method: "post" },
  { route: '/api/problems/import', handler: _lazy_aBdsDp, lazy: true, middleware: false, method: "post" },
  { route: '/api/problems', handler: _lazy_cko9xF, lazy: true, middleware: false, method: "get" },
  { route: '/api/problems', handler: _lazy_j_QIJp, lazy: true, middleware: false, method: "post" },
  { route: '/api/problems/random', handler: _lazy_Jm5fU3, lazy: true, middleware: false, method: "get" },
  { route: '/api/problems/review', handler: _lazy_1fNOU8, lazy: true, middleware: false, method: "get" },
  { route: '/api/sessions/:id/end', handler: _lazy_4PChmj, lazy: true, middleware: false, method: "post" },
  { route: '/api/sessions/:id/records', handler: _lazy_Vo3oXj, lazy: true, middleware: false, method: "post" },
  { route: '/api/sessions', handler: _lazy_FODtrz, lazy: true, middleware: false, method: "get" },
  { route: '/api/sessions', handler: _lazy_bALaM2, lazy: true, middleware: false, method: "post" },
  { route: '/api/stats/calendar', handler: _lazy_9epIni, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/daily', handler: _lazy_tVp0H1, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/export', handler: _lazy_y0HQLc, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats', handler: _lazy__u_hDj, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/monthly', handler: _lazy_N7Xgsy, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/problems', handler: _lazy_dx4juQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/recent-sessions', handler: _lazy_9z_mcl, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/weak-problems', handler: _lazy_YgBJ_O, lazy: true, middleware: false, method: "get" },
  { route: '/api/stats/weekly', handler: _lazy_88ZNta, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_YSh7Ih, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_YSh7Ih, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

var _a;
const prismaClientSingleton = () => {
  return new PrismaClient();
};
const prisma = (_a = globalThis.prisma) != null ? _a : prismaClientSingleton();
globalThis.prisma = prisma;

const _id__delete$4 = defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, "id") || "0");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u52B9\u306AID\u3067\u3059"
      });
    }
    await prisma.problem.updateMany({
      where: { genreId: id },
      data: { genreId: null }
    });
    await prisma.genre.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error("Genre deletion error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u30B8\u30E3\u30F3\u30EB\u306E\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$8 = defineEventHandler(async (event) => {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: "asc"
      },
      include: {
        _count: {
          select: { problems: true }
        }
      }
    });
    return genres;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u30B8\u30E3\u30F3\u30EB\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$6 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.name || typeof body.name !== "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "\u30B8\u30E3\u30F3\u30EB\u540D\u304C\u5FC5\u8981\u3067\u3059"
      });
    }
    const genre = await prisma.genre.create({
      data: {
        name: body.name
      }
    });
    return genre;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        statusMessage: "\u3053\u306E\u30B8\u30E3\u30F3\u30EB\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u30B8\u30E3\u30F3\u30EB\u306E\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, "id") || "0");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u52B9\u306AID\u3067\u3059"
      });
    }
    await prisma.problem.updateMany({
      where: { languageId: id },
      data: { languageId: null }
    });
    await prisma.language.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error("Language deletion error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u8A00\u8A9E\u306E\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler(async (event) => {
  try {
    const languages = await prisma.language.findMany({
      orderBy: {
        name: "asc"
      },
      include: {
        _count: {
          select: { problems: true }
        }
      }
    });
    return languages;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u8A00\u8A9E\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$4 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.name || typeof body.name !== "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "\u8A00\u8A9E\u540D\u304C\u5FC5\u8981\u3067\u3059"
      });
    }
    const language = await prisma.language.create({
      data: {
        name: body.name
      }
    });
    return language;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        statusMessage: "\u3053\u306E\u8A00\u8A9E\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059"
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u8A00\u8A9E\u306E\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, "id") || "0");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u52B9\u306AID\u3067\u3059"
      });
    }
    await prisma.problem.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error("Problem deletion error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u554F\u984C\u306E\u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
    const problem = await prisma.problem.findUnique({
      where: { id },
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: "asc" }
        },
        tags: true
      }
    });
    if (!problem) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u554F\u984C\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"
      });
    }
    return problem;
  } catch (error) {
    if (error.statusCode === 404) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "\u554F\u984C\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put = defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, "id") || "0");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u52B9\u306AID\u3067\u3059"
      });
    }
    if (!body.questionType || !body.questionText) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u554F\u984C\u30BF\u30A4\u30D7\u3068\u554F\u984C\u6587\u306F\u5FC5\u9808\u3067\u3059"
      });
    }
    await prisma.choice.deleteMany({
      where: { problemId: id }
    });
    await prisma.problemTag.deleteMany({
      where: { problemId: id }
    });
    const problem = await prisma.problem.update({
      where: { id },
      data: {
        questionType: body.questionType,
        questionText: body.questionText,
        answerText: body.answerText || null,
        explanation: body.explanation || null,
        languageId: body.languageId || null,
        genreId: body.genreId || null,
        difficulty: body.difficulty || null,
        choices: body.choices && body.choices.length > 0 ? {
          create: body.choices.map((choice, index) => ({
            choiceText: choice.choiceText,
            isCorrect: choice.isCorrect || false,
            displayOrder: index + 1
          }))
        } : void 0,
        tags: body.tags && body.tags.length > 0 ? {
          create: body.tags.map((tag) => ({
            tagName: tag
          }))
        } : void 0
      },
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: "asc" }
        },
        tags: true
      }
    });
    return problem;
  } catch (error) {
    console.error("Problem update error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u554F\u984C\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const count_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const getArrayParam = (key) => {
    const value = query[key];
    if (!value) return void 0;
    return Array.isArray(value) ? value : [value];
  };
  const questionTypes = getArrayParam("questionType");
  const languageIdStrs = getArrayParam("languageId");
  const genreIdStrs = getArrayParam("genreId");
  const difficulties = getArrayParam("difficulty");
  const tags = getArrayParam("tag");
  const languageIds = languageIdStrs == null ? void 0 : languageIdStrs.map(Number).filter((n) => !isNaN(n));
  const genreIds = genreIdStrs == null ? void 0 : genreIdStrs.map(Number).filter((n) => !isNaN(n));
  const where = {};
  if (questionTypes && questionTypes.length > 0) {
    where.questionType = { in: questionTypes };
  }
  if (languageIds && languageIds.length > 0) {
    where.languageId = { in: languageIds };
  }
  if (genreIds && genreIds.length > 0) {
    where.genreId = { in: genreIds };
  }
  if (difficulties && difficulties.length > 0) {
    where.OR = [
      { difficulty: { in: difficulties } },
      { difficulty: null }
    ];
  }
  if (tags && tags.length > 0) {
    where.tags = {
      some: {
        tagName: { in: tags }
      }
    };
  }
  const count = await prisma.problem.count({
    where
  });
  return { count };
});

const count_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: count_get
}, Symbol.toStringTag, { value: 'Module' }));

const importJson_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { problems } = body;
    if (!Array.isArray(problems) || problems.length === 0) {
      throw createError({
        statusCode: 400,
        message: "\u554F\u984C\u30C7\u30FC\u30BF\u304C\u4E0D\u6B63\u3067\u3059"
      });
    }
    let imported = 0;
    const errors = [];
    for (const [index, problemData] of problems.entries()) {
      try {
        let languageId = null;
        let genreId = null;
        if (problemData.language) {
          const language = await prisma.language.upsert({
            where: { name: problemData.language },
            create: { name: problemData.language },
            update: {}
          });
          languageId = language.id;
        }
        if (problemData.genre) {
          const genre = await prisma.genre.upsert({
            where: { name: problemData.genre },
            create: { name: problemData.genre },
            update: {}
          });
          genreId = genre.id;
        }
        const problem = await prisma.problem.create({
          data: {
            questionType: problemData.questionType,
            questionText: problemData.questionText,
            answerText: problemData.answerText || null,
            explanation: problemData.explanation || null,
            languageId,
            genreId,
            difficulty: problemData.difficulty || null
          }
        });
        if (problemData.questionType === "choice" && problemData.choices) {
          for (const [choiceIndex, choice] of problemData.choices.entries()) {
            await prisma.choice.create({
              data: {
                problemId: problem.id,
                choiceText: choice.choiceText,
                isCorrect: choice.isCorrect || false,
                displayOrder: choiceIndex + 1
              }
            });
          }
        }
        if (problemData.tags && Array.isArray(problemData.tags)) {
          for (const tag of problemData.tags) {
            await prisma.problemTag.create({
              data: {
                problemId: problem.id,
                tagName: tag
              }
            });
          }
        }
        imported++;
      } catch (error) {
        console.error(`Failed to import problem ${index + 1}:`, error);
        errors.push(`\u554F\u984C${index + 1}: ${error.message}`);
      }
    }
    if (errors.length > 0) {
      return {
        imported,
        errors,
        message: `${imported}\u554F\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3057\u305F\uFF08${errors.length}\u4EF6\u306E\u30A8\u30E9\u30FC\uFF09`
      };
    }
    return {
      imported,
      message: `${imported}\u554F\u3092\u30A4\u30F3\u30DD\u30FC\u30C8\u3057\u307E\u3057\u305F`
    };
  } catch (error) {
    console.error("JSON import error:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u30A4\u30F3\u30DD\u30FC\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const importJson_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: importJson_post
}, Symbol.toStringTag, { value: 'Module' }));

const import_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const csvData = body.data;
    if (!Array.isArray(csvData) || csvData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "CSV\u30C7\u30FC\u30BF\u304C\u4E0D\u6B63\u3067\u3059"
      });
    }
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };
    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];
      try {
        if (!row.question_type || !row.question_text) {
          throw new Error("\u554F\u984C\u30BF\u30A4\u30D7\u3068\u554F\u984C\u6587\u306F\u5FC5\u9808\u3067\u3059");
        }
        if (!["choice", "text", "code"].includes(row.question_type)) {
          throw new Error("\u554F\u984C\u30BF\u30A4\u30D7\u306F choice, text, code \u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059");
        }
        let language = null;
        if (row.language && row.language.trim()) {
          language = await prisma.language.upsert({
            where: { name: row.language.trim() },
            update: {},
            create: { name: row.language.trim() }
          });
        }
        let genre = null;
        if (row.genre && row.genre.trim()) {
          genre = await prisma.genre.upsert({
            where: { name: row.genre.trim() },
            update: {},
            create: { name: row.genre.trim() }
          });
        }
        const tags = row.tags ? row.tags.split(";").map((t) => t.trim()).filter((t) => t.length > 0) : [];
        const choices = [];
        if (row.question_type === "choice") {
          const correctChoiceNum = parseInt(row.correct_choice || "0");
          if (!correctChoiceNum || correctChoiceNum < 1 || correctChoiceNum > 4) {
            throw new Error("\u6B63\u89E3\u306E\u9078\u629E\u80A2\u756A\u53F7(1-4)\u304C\u5FC5\u8981\u3067\u3059");
          }
          for (let j = 1; j <= 4; j++) {
            const choiceKey = `choice${j}`;
            const choiceText = row[choiceKey];
            if (choiceText && choiceText.trim()) {
              choices.push({
                choiceText: choiceText.trim(),
                isCorrect: j === correctChoiceNum,
                displayOrder: j
              });
            }
          }
          if (choices.length < 2) {
            throw new Error("\u9078\u629E\u5F0F\u554F\u984C\u306B\u306F\u5C11\u306A\u304F\u3068\u30822\u3064\u306E\u9078\u629E\u80A2\u304C\u5FC5\u8981\u3067\u3059");
          }
        }
        await prisma.problem.create({
          data: {
            questionType: row.question_type,
            questionText: row.question_text.trim(),
            answerText: row.answer_text ? row.answer_text.trim() : null,
            explanation: row.explanation ? row.explanation.trim() : null,
            languageId: (language == null ? void 0 : language.id) || null,
            genreId: (genre == null ? void 0 : genre.id) || null,
            difficulty: row.difficulty && ["easy", "medium", "hard"].includes(row.difficulty) ? row.difficulty : null,
            choices: choices.length > 0 ? {
              create: choices
            } : void 0,
            tags: tags.length > 0 ? {
              create: tags.map((tag) => ({ tagName: tag }))
            } : void 0
          }
        });
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: i + 1,
          data: row,
          error: error.message
        });
      }
    }
    return results;
  } catch (error) {
    console.error("CSV import error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "CSV\u30A4\u30F3\u30DD\u30FC\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F: " + error.message
    });
  }
});

const import_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: import_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const languageId = query.languageId ? Number(query.languageId) : void 0;
    const genreId = query.genreId ? Number(query.genreId) : void 0;
    const questionType = query.questionType;
    const limit = query.limit ? Number(query.limit) : void 0;
    const where = {};
    if (languageId) where.languageId = languageId;
    if (genreId) where.genreId = genreId;
    if (questionType) where.questionType = questionType;
    const problems = await prisma.problem.findMany({
      where,
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: "asc" }
        },
        tags: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: limit
    });
    return problems;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u554F\u984C\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.questionType || !body.questionText) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u554F\u984C\u30BF\u30A4\u30D7\u3068\u554F\u984C\u6587\u306F\u5FC5\u9808\u3067\u3059"
      });
    }
    const problem = await prisma.problem.create({
      data: {
        questionType: body.questionType,
        questionText: body.questionText,
        answerText: body.answerText || null,
        explanation: body.explanation || null,
        languageId: body.languageId || null,
        genreId: body.genreId || null,
        difficulty: body.difficulty || null,
        choices: body.choices && body.choices.length > 0 ? {
          create: body.choices.map((choice, index) => ({
            choiceText: choice.choiceText,
            isCorrect: choice.isCorrect || false,
            displayOrder: index + 1
          }))
        } : void 0,
        tags: body.tags && body.tags.length > 0 ? {
          create: body.tags.map((tag) => ({
            tagName: tag
          }))
        } : void 0
      },
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: "asc" }
        },
        tags: true
      }
    });
    return problem;
  } catch (error) {
    console.error("Problem creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u554F\u984C\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const random_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const count = query.count ? Number(query.count) : 10;
    const random = query.random !== "false";
    const getArrayParam = (key) => {
      const value = query[key];
      if (!value) return void 0;
      return Array.isArray(value) ? value : [value];
    };
    const questionTypes = getArrayParam("questionType");
    const languageIdStrs = getArrayParam("languageId");
    const genreIdStrs = getArrayParam("genreId");
    const difficulties = getArrayParam("difficulty");
    const tags = getArrayParam("tag");
    const languageIds = languageIdStrs == null ? void 0 : languageIdStrs.map(Number).filter((n) => !isNaN(n));
    const genreIds = genreIdStrs == null ? void 0 : genreIdStrs.map(Number).filter((n) => !isNaN(n));
    console.log("[Random API] Query params:", {
      count,
      random,
      questionTypes,
      languageIds,
      genreIds,
      difficulties,
      tags
    });
    const where = {};
    if (questionTypes && questionTypes.length > 0) {
      where.questionType = { in: questionTypes };
    }
    if (languageIds && languageIds.length > 0) {
      where.languageId = { in: languageIds };
    }
    if (genreIds && genreIds.length > 0) {
      where.genreId = { in: genreIds };
    }
    if (difficulties && difficulties.length > 0) {
      where.OR = [
        { difficulty: { in: difficulties } },
        { difficulty: null }
      ];
    }
    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          tagName: { in: tags }
        }
      };
    }
    console.log("[Random API] Where clause:", where);
    const totalCount = await prisma.problem.count({ where });
    console.log("[Random API] Total matching problems:", totalCount);
    if (totalCount === 0) {
      return [];
    }
    const requestedCount = Math.min(count, totalCount);
    let problems;
    if (random) {
      const randomIndexes = [];
      while (randomIndexes.length < requestedCount) {
        const randomIndex = Math.floor(Math.random() * totalCount);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      problems = await Promise.all(
        randomIndexes.map(async (skip) => {
          return await prisma.problem.findFirst({
            where,
            skip,
            include: {
              language: true,
              genre: true,
              choices: {
                orderBy: { displayOrder: "asc" }
              },
              tags: true
            }
          });
        })
      );
      problems = problems.filter((p) => p !== null);
    } else {
      problems = await prisma.problem.findMany({
        where,
        take: requestedCount,
        include: {
          language: true,
          genre: true,
          choices: {
            orderBy: { displayOrder: "asc" }
          },
          tags: true
        },
        orderBy: {
          id: "asc"
        }
      });
    }
    console.log("[Random API] Returning", problems.length, "problems");
    return problems;
  } catch (error) {
    console.error("[Random API] Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u30E9\u30F3\u30C0\u30E0\u554F\u984C\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const random_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: random_get
}, Symbol.toStringTag, { value: 'Module' }));

const review_get = defineEventHandler(async (event) => {
  try {
    const incorrectRecords = await prisma.studyRecord.findMany({
      where: {
        isCorrect: false
      },
      orderBy: {
        answeredAt: "desc"
      },
      select: {
        problemId: true,
        answeredAt: true
      }
    });
    const problemIds = /* @__PURE__ */ new Set();
    const problemLastAnswers = /* @__PURE__ */ new Map();
    for (const record of incorrectRecords) {
      if (!problemLastAnswers.has(record.problemId)) {
        problemLastAnswers.set(record.problemId, record.answeredAt);
      }
    }
    for (const [problemId, lastIncorrectDate] of problemLastAnswers.entries()) {
      const laterCorrectRecord = await prisma.studyRecord.findFirst({
        where: {
          problemId,
          isCorrect: true,
          answeredAt: {
            gt: lastIncorrectDate
          }
        }
      });
      if (!laterCorrectRecord) {
        problemIds.add(problemId);
      }
    }
    const problems = await prisma.problem.findMany({
      where: {
        id: {
          in: Array.from(problemIds)
        }
      },
      include: {
        language: true,
        genre: true,
        choices: {
          orderBy: { displayOrder: "asc" }
        },
        tags: true
      }
    });
    return problems;
  } catch (error) {
    console.error("Review problems fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u5FA9\u7FD2\u554F\u984C\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const review_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: review_get
}, Symbol.toStringTag, { value: 'Module' }));

const end_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
    const session = await prisma.studySession.update({
      where: { id },
      data: {
        sessionEnd: /* @__PURE__ */ new Date()
      }
    });
    return session;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u30BB\u30C3\u30B7\u30E7\u30F3\u306E\u7D42\u4E86\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const end_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: end_post
}, Symbol.toStringTag, { value: 'Module' }));

const records_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const sessionId = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
    const body = await readBody(event);
    if (!body.problemId || typeof body.isCorrect !== "boolean") {
      throw createError({
        statusCode: 400,
        statusMessage: "\u554F\u984CID\u3068\u6B63\u8AA4\u60C5\u5831\u304C\u5FC5\u8981\u3067\u3059"
      });
    }
    const record = await prisma.studyRecord.create({
      data: {
        sessionId,
        problemId: body.problemId,
        isCorrect: body.isCorrect,
        userAnswer: body.userAnswer || null,
        timeSpent: body.timeSpent || null
      }
    });
    await prisma.studySession.update({
      where: { id: sessionId },
      data: {
        totalQuestions: {
          increment: 1
        }
      }
    });
    return record;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u5B66\u7FD2\u8A18\u9332\u306E\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const records_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: records_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const limit = query.limit ? parseInt(query.limit) : 10;
    const sessions = await prisma.studySession.findMany({
      take: limit,
      orderBy: { sessionStart: "desc" },
      include: {
        studyRecords: {
          select: {
            isCorrect: true
          }
        }
      }
    });
    const sessionsWithStats = sessions.map((session) => ({
      id: session.id,
      sessionStart: session.sessionStart,
      sessionEnd: session.sessionEnd,
      totalQuestions: session.totalQuestions,
      correctCount: session.studyRecords.filter((r) => r.isCorrect).length
    }));
    return sessionsWithStats;
  } catch (error) {
    console.error("Sessions fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u30BB\u30C3\u30B7\u30E7\u30F3\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  try {
    const session = await prisma.studySession.create({
      data: {
        sessionStart: /* @__PURE__ */ new Date(),
        totalQuestions: 0
      }
    });
    return session;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u30BB\u30C3\u30B7\u30E7\u30F3\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const calendar_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const days = Number(query.days) || 90;
    const startDate = /* @__PURE__ */ new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);
    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: startDate
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: "asc"
      }
    });
    const dailyStats = {};
    for (let i = 0; i < days; i++) {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toISOString().split("T")[0];
      dailyStats[dateKey] = {
        date: dateKey,
        sessionCount: 0,
        totalProblems: 0,
        correctCount: 0,
        incorrectCount: 0
      };
    }
    sessions.forEach((session) => {
      const dateKey = session.sessionStart.toISOString().split("T")[0];
      if (dailyStats[dateKey]) {
        dailyStats[dateKey].sessionCount++;
        dailyStats[dateKey].totalProblems += session.studyRecords.length;
        dailyStats[dateKey].correctCount += session.studyRecords.filter((r) => r.isCorrect).length;
        dailyStats[dateKey].incorrectCount += session.studyRecords.filter((r) => !r.isCorrect).length;
      }
    });
    const result = Object.values(dailyStats).sort(
      (a, b) => a.date.localeCompare(b.date)
    );
    return result;
  } catch (error) {
    console.error("Calendar stats fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u30AB\u30EC\u30F3\u30C0\u30FC\u7D71\u8A08\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const calendar_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: calendar_get
}, Symbol.toStringTag, { value: 'Module' }));

const daily_get = defineEventHandler(async (event) => {
  try {
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: "asc"
      }
    });
    const dailyStats = {};
    sessions.forEach((session) => {
      const dateKey = session.sessionStart.toISOString().split("T")[0];
      if (!dailyStats[dateKey]) {
        dailyStats[dateKey] = {
          date: dateKey,
          sessionCount: 0,
          totalProblems: 0,
          correctCount: 0,
          incorrectCount: 0
        };
      }
      dailyStats[dateKey].sessionCount++;
      dailyStats[dateKey].totalProblems += session.studyRecords.length;
      dailyStats[dateKey].correctCount += session.studyRecords.filter((r) => r.isCorrect).length;
      dailyStats[dateKey].incorrectCount += session.studyRecords.filter((r) => !r.isCorrect).length;
    });
    const result = Object.values(dailyStats).sort(
      (a, b) => a.date.localeCompare(b.date)
    );
    return result;
  } catch (error) {
    console.error("Daily stats fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u65E5\u5225\u7D71\u8A08\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const daily_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: daily_get
}, Symbol.toStringTag, { value: 'Module' }));

const export_get = defineEventHandler(async (event) => {
  try {
    const studyRecords = await prisma.studyRecord.findMany({
      include: {
        session: true,
        problem: {
          include: {
            language: true,
            genre: true
          }
        }
      },
      orderBy: {
        answeredAt: "desc"
      }
    });
    const headers = [
      "\u30BB\u30C3\u30B7\u30E7\u30F3ID",
      "\u554F\u984CID",
      "\u554F\u984C\u6587",
      "\u554F\u984C\u30BF\u30A4\u30D7",
      "\u8A00\u8A9E",
      "\u30B8\u30E3\u30F3\u30EB",
      "\u96E3\u6613\u5EA6",
      "\u6B63\u89E3",
      "\u30E6\u30FC\u30B6\u30FC\u306E\u89E3\u7B54",
      "\u89E3\u7B54\u65E5\u6642",
      "\u89E3\u7B54\u6642\u9593\uFF08\u79D2\uFF09"
    ];
    const rows = studyRecords.map((record) => {
      var _a, _b;
      return [
        record.sessionId,
        record.problemId,
        `"${record.problem.questionText.replace(/"/g, '""')}"`,
        // ダブルクォートをエスケープ
        record.problem.questionType,
        ((_a = record.problem.language) == null ? void 0 : _a.name) || "",
        ((_b = record.problem.genre) == null ? void 0 : _b.name) || "",
        record.problem.difficulty || "",
        record.isCorrect ? "\u25CB" : "\xD7",
        record.userAnswer ? `"${record.userAnswer.replace(/"/g, '""')}"` : "",
        new Date(record.answeredAt).toLocaleString("ja-JP"),
        record.timeSpent || ""
      ];
    });
    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");
    const bom = "\uFEFF";
    const csvWithBom = bom + csv;
    setResponseHeaders(event, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="study_records_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`
    });
    return csvWithBom;
  } catch (error) {
    console.error("Export error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u30C7\u30FC\u30BF\u306E\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const export_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: export_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const totalProblems = await prisma.problem.count();
    const totalSessions = await prisma.studySession.count();
    const totalAnswers = await prisma.studyRecord.count();
    const correctAnswers = await prisma.studyRecord.count({
      where: { isCorrect: true }
    });
    const correctRate = totalAnswers > 0 ? Math.round(correctAnswers / totalAnswers * 100) : 0;
    const byLanguageRaw = await prisma.problem.groupBy({
      by: ["languageId"],
      _count: true,
      where: {
        languageId: { not: null }
      }
    });
    const languageIds = byLanguageRaw.map((item) => item.languageId).filter((id) => id !== null);
    const languages = await prisma.language.findMany({
      where: { id: { in: languageIds } }
    });
    const byLanguage = byLanguageRaw.map((item) => {
      const language = languages.find((l) => l.id === item.languageId);
      return {
        language: (language == null ? void 0 : language.name) || "\u4E0D\u660E",
        count: item._count
      };
    });
    const byGenreRaw = await prisma.problem.groupBy({
      by: ["genreId"],
      _count: true,
      where: {
        genreId: { not: null }
      }
    });
    const genreIds = byGenreRaw.map((item) => item.genreId).filter((id) => id !== null);
    const genres = await prisma.genre.findMany({
      where: { id: { in: genreIds } }
    });
    const byGenre = byGenreRaw.map((item) => {
      const genre = genres.find((g) => g.id === item.genreId);
      return {
        genre: (genre == null ? void 0 : genre.name) || "\u4E0D\u660E",
        count: item._count
      };
    });
    return {
      totalProblems,
      totalSessions,
      totalAnswers,
      correctRate,
      byLanguage,
      byGenre
    };
  } catch (error) {
    console.error("Stats fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7D71\u8A08\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const monthly_get = defineEventHandler(async (event) => {
  try {
    const twelveMonthsAgo = /* @__PURE__ */ new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: twelveMonthsAgo
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: "asc"
      }
    });
    const monthlyStats = {};
    sessions.forEach((session) => {
      const sessionDate = new Date(session.sessionStart);
      const year = sessionDate.getFullYear();
      const month = sessionDate.getMonth() + 1;
      const monthKey = `${year}-${String(month).padStart(2, "0")}`;
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthKey,
          year,
          monthNumber: month,
          sessionCount: 0,
          totalProblems: 0,
          correctCount: 0,
          incorrectCount: 0
        };
      }
      monthlyStats[monthKey].sessionCount++;
      monthlyStats[monthKey].totalProblems += session.studyRecords.length;
      monthlyStats[monthKey].correctCount += session.studyRecords.filter((r) => r.isCorrect).length;
      monthlyStats[monthKey].incorrectCount += session.studyRecords.filter((r) => !r.isCorrect).length;
    });
    const result = Object.values(monthlyStats).sort(
      (a, b) => a.month.localeCompare(b.month)
    );
    return result;
  } catch (error) {
    console.error("Monthly stats fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u6708\u9593\u7D71\u8A08\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const monthly_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: monthly_get
}, Symbol.toStringTag, { value: 'Module' }));

const problems_get = defineEventHandler(async (event) => {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        language: true,
        genre: true,
        studyRecords: {
          orderBy: {
            answeredAt: "desc"
          }
        }
      }
    });
    const problemStats = problems.map((problem) => {
      var _a, _b;
      const totalAttempts = problem.studyRecords.length;
      const correctAttempts = problem.studyRecords.filter((r) => r.isCorrect).length;
      const correctRate = totalAttempts > 0 ? Math.round(correctAttempts / totalAttempts * 100) : null;
      const lastStudied = problem.studyRecords.length > 0 ? problem.studyRecords[0].answeredAt : null;
      return {
        id: problem.id,
        questionText: problem.questionText.substring(0, 100) + (problem.questionText.length > 100 ? "..." : ""),
        questionType: problem.questionType,
        language: ((_a = problem.language) == null ? void 0 : _a.name) || null,
        genre: ((_b = problem.genre) == null ? void 0 : _b.name) || null,
        difficulty: problem.difficulty,
        totalAttempts,
        correctAttempts,
        incorrectAttempts: totalAttempts - correctAttempts,
        correctRate,
        lastStudied
      };
    });
    problemStats.sort((a, b) => {
      if (a.correctRate === null && b.correctRate === null) return 0;
      if (a.correctRate === null) return 1;
      if (b.correctRate === null) return -1;
      return a.correctRate - b.correctRate;
    });
    return problemStats;
  } catch (error) {
    console.error("Problem stats fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u554F\u984C\u5225\u7D71\u8A08\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const problems_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: problems_get
}, Symbol.toStringTag, { value: 'Module' }));

const recentSessions_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const limit = Number(query.limit) || 10;
    const sessions = await prisma.studySession.findMany({
      take: limit,
      orderBy: {
        sessionStart: "desc"
      },
      include: {
        studyRecords: {
          include: {
            problem: {
              include: {
                language: true,
                genre: true
              }
            }
          }
        }
      }
    });
    const result = sessions.map((session) => {
      const totalProblems = session.studyRecords.length;
      const correctCount = session.studyRecords.filter((r) => r.isCorrect).length;
      const correctRate = totalProblems > 0 ? Math.round(correctCount / totalProblems * 100) : 0;
      return {
        id: session.id,
        sessionStart: session.sessionStart,
        sessionEnd: session.sessionEnd,
        totalProblems,
        correctCount,
        incorrectCount: totalProblems - correctCount,
        correctRate
      };
    });
    return result;
  } catch (error) {
    console.error("Recent sessions fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u6700\u8FD1\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const recentSessions_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: recentSessions_get
}, Symbol.toStringTag, { value: 'Module' }));

const weakProblems_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const limit = Number(query.limit) || 10;
    const problems = await prisma.problem.findMany({
      where: {
        studyRecords: {
          some: {}
        }
      },
      include: {
        language: true,
        genre: true,
        studyRecords: true
      }
    });
    const problemStats = problems.map((problem) => {
      var _a, _b;
      const totalAttempts = problem.studyRecords.length;
      const correctAttempts = problem.studyRecords.filter((r) => r.isCorrect).length;
      const correctRate = totalAttempts > 0 ? correctAttempts / totalAttempts * 100 : 0;
      return {
        id: problem.id,
        questionText: problem.questionText,
        questionType: problem.questionType,
        language: ((_a = problem.language) == null ? void 0 : _a.name) || null,
        genre: ((_b = problem.genre) == null ? void 0 : _b.name) || null,
        difficulty: problem.difficulty,
        totalAttempts,
        correctAttempts,
        incorrectAttempts: totalAttempts - correctAttempts,
        correctRate: Math.round(correctRate)
      };
    }).filter((stat) => stat.totalAttempts >= 2).sort((a, b) => a.correctRate - b.correctRate).slice(0, limit);
    return problemStats;
  } catch (error) {
    console.error("Weak problems fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u82E6\u624B\u306A\u554F\u984C\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const weakProblems_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: weakProblems_get
}, Symbol.toStringTag, { value: 'Module' }));

const weekly_get = defineEventHandler(async (event) => {
  try {
    const twelveWeeksAgo = /* @__PURE__ */ new Date();
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);
    const sessions = await prisma.studySession.findMany({
      where: {
        sessionStart: {
          gte: twelveWeeksAgo
        }
      },
      include: {
        studyRecords: true
      },
      orderBy: {
        sessionStart: "asc"
      }
    });
    const weeklyStats = {};
    sessions.forEach((session) => {
      const sessionDate = new Date(session.sessionStart);
      const dayOfWeek = sessionDate.getDay();
      const weekStart = new Date(sessionDate);
      weekStart.setDate(sessionDate.getDate() - dayOfWeek);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      const weekKey = weekStart.toISOString().split("T")[0];
      if (!weeklyStats[weekKey]) {
        weeklyStats[weekKey] = {
          weekStart: weekKey,
          weekEnd: weekEnd.toISOString().split("T")[0],
          sessionCount: 0,
          totalProblems: 0,
          correctCount: 0,
          incorrectCount: 0
        };
      }
      weeklyStats[weekKey].sessionCount++;
      weeklyStats[weekKey].totalProblems += session.studyRecords.length;
      weeklyStats[weekKey].correctCount += session.studyRecords.filter((r) => r.isCorrect).length;
      weeklyStats[weekKey].incorrectCount += session.studyRecords.filter((r) => !r.isCorrect).length;
    });
    const result = Object.values(weeklyStats).sort(
      (a, b) => a.weekStart.localeCompare(b.weekStart)
    );
    return result;
  } catch (error) {
    console.error("Weekly stats fetch error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u9031\u9593\u7D71\u8A08\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
    });
  }
});

const weekly_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: weekly_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
