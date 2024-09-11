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
    actions: [
      {
        action: "know-action",
        title: "I get it!",
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
  if (!event.action) {
    console.log(`On notification click: ${event.notification.title}`);
    return;
  }

  switch (event.action) {
    case "know-action":
      console.log(`Ok so don't need to notify you again!`);
      break;
    case "continue-action":
      console.log(`Ok will notify you again!`);
      break;
  }

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      clientList.forEach((client) => {
        console.log(client.url);
      });
    })
  );
});
