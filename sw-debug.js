"use strict";
(function () {
  var cacheVersion = "20180527";
  var staticImageCacheName = "image" + cacheVersion;
  var staticAssetsCacheName = "assets" + cacheVersion;
  var contentCacheName = "content" + cacheVersion;
  var vendorCacheName = "vendor" + cacheVersion;
  var maxEntries = 100;
  self.importScripts("/lib/sw-toolbox/sw-toolbox.js");
  self.toolbox.options.debug = false;
  self.toolbox.options.networkTimeoutSeconds = 3;

  self.toolbox.router.get("/images/(.*)", self.toolbox.cacheFirst, {
    cache: {
      name: staticImageCacheName,
      maxEntries: maxEntries
    }
  });

  self.toolbox.router.get('/js/(.*)', self.toolbox.cacheFirst, {
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });
  self.toolbox.router.get('/css/(.*)', self.toolbox.cacheFirst, {
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });
  self.toolbox.router.get('/search.json', self.toolbox.cacheFirst, {
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });
  self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
    origin: /cdn\.lishaoy\.net/,
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });
  self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
    origin: /cdn\.bootcss\.com/,
    cache: {
      name: staticAssetsCacheName,
      maxEntries: maxEntries
    }
  });
  self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
    origin: /(www\.google-analytics\.com|ssl\.google-analytics\.com)/,
    cache: {
      name: vendorCacheName,
      maxEntries: maxEntries
    }
  });
  self.toolbox.router.get('/*', self.toolbox.networkFirst, {
    cache: {
      name: contentCacheName,
      maxEntries: maxEntries
    }
  });
  self.addEventListener("install", function (event) {
    return event.waitUntil(self.skipWaiting())
  });
  self.addEventListener("activate", function (event) {
    return event.waitUntil(self.clients.claim())
  })
})();
