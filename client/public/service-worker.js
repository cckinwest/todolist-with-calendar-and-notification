self.addEventListener("install", (event) => {
  console.log("The service worker is installing.");
});

self.addEventListener("activate", (event) => {
  console.log("The service worker is activated.");
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

  var endpoint = "http://localhost:3002/todo/update";

  var data = {
    id: event.notification.tag,
    notification: false,
  };

  if (isPattern) {
    endpoint = "http://localhost:3002/pattern/update";
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
