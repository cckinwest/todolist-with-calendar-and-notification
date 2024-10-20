const CACHE_NAME = "v8";

const urlsToCache = [
  "/",
  "/asset-manifest.json",
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/robots.txt",
  "/service-worker.js",
  "/manifest.json",
  "/static/js/845.542b102c.chunk.js",
  "/static/js/845.542b102c.chunk.js.map",
  "/static/js/main.eb6c46f4.js",
  "/static/js/main.eb6c46f4.js.LICENSE.txt",
  "/static/js/main.eb6c46f4.js.map",
  "/static/css/main.46b98132.css",
  "/static/css/main.46b98132.css.map",
  "/static/media/bootstrap-icons.39795c0b4513de014cf8.woff",
  "/static/media/bootstrap-icons.b7bcc075b395c14ce8c2.woff2",
  "/static/media/todolistIcon.42dd5c93e2a8aaf3032a.jpg",
];

const apiEndpoint = "https://localhost:3000";
//"https://schedule-calendar-notification-2df5a697a30a.herokuapp.com";

self.addEventListener("install", (event) => {
  console.log("The service worker is installing.");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((response) => {
        return response || fetch(event.request);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting cache ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", (event) => {
  console.log(`Push received.`);

  const { title, text, id, startDate } = event.data.json();

  const options = {
    body: text,
    tag: id,
    data: startDate,
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  const taskId = event.notification.tag;

  var url = `${apiEndpoint}/dashboard/${taskId}`;

  console.log(url);

  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function (clientList) {
      clientList.forEach((client) => {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      });

      console.log(url);

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
