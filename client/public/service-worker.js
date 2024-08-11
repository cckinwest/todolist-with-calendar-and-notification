/* eslint-disable no-restricted-globals */
/*
import { registerRoute, Route } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

precacheAndRoute(self.__WB_MANIFEST);

const staticRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new CacheFirst({
    cacheName: "staticCache",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  })
);

const dynamicRoute = new Route(
  ({ request }) => {
    return request.destination === "style" || request.destination === "script";
  },
  new StaleWhileRevalidate({
    cacheName: "dynamicCache",
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

registerRoute(staticRoute);
registerRoute(dynamicRoute);*/

self.addEventListener("install", (event) => {
  console.log("The service worker is installing.");
});

self.addEventListener("activate", (event) => {
  console.log("The service worker is activated.");
});

self.addEventListener("push", (event) => {
  console.log(`Push received.`);

  const { title, text } = event.data.json();

  const options = {
    body: text,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
