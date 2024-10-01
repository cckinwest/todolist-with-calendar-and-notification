const CACHE_NAME = "v7";

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
  "/static/js/main.83beed1b.js",
  "/static/js/main.83beed1b.js.LICENSE.txt",
  "/static/js/main.83beed1b.js.map",
  "/static/css/main.46b98132.css",
  "/static/css/main.46b98132.css.map",
  "/static/media/bootstrap-icons.39795c0b4513de014cf8.woff",
  "/static/media/bootstrap-icons.b7bcc075b395c14ce8c2.woff2",
  "/static/media/todolistIcon.42dd5c93e2a8aaf3032a.jpg",
];

const apiEndpoint =
  "https://schedule-calendar-notification-2df5a697a30a.herokuapp.com/";

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
    actions: [
      {
        action: "off-action",
        title: "Don't notify again.",
      },
      {
        action: "continue-action",
        title: "Pls notify again.",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  const isPattern = event.notification.data.length > 0;

  var endpoint = `${apiEndpoint}/todo/update`;

  var data = {
    id: event.notification.tag,
    notification: false,
  };

  if (isPattern) {
    endpoint = `${apiEndpoint}/pattern/update`;
    data = {
      patternId: event.notification.tag,
      notification: false,
    };
  }

  if (!event.action) {
    console.log(`On notification click: ${event.notification.title}`);
    return;
  }

  switch (event.action) {
    case "off-action":
      event.waitUntil(
        fetch(endpoint, {
          body: JSON.stringify(data),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("There were errors in network.");
            }

            clients
              .matchAll({ type: "window", includeUncontrolled: true })
              .then(function (clients) {
                const targetUrl = `${apiEndpoint}/calendar`;
                clients.forEach((client) => {
                  console.log(client.url);
                  if (client.url === targetUrl && "focus" in client) {
                    client.focus();
                    return client
                      .navigate(targetUrl)
                      .then(() => client.reload());
                  }
                });
              });

            return res.json();
          })
          .then((data) => {
            console.log(`Updated data: ${data}`);
          })
          .catch((err) => {
            console.log(err);
          })
      );

      break;
    case "continue-action":
      console.log(event.notification.tag);
      console.log(`Ok will notify you again!`);
      break;
  }
});
