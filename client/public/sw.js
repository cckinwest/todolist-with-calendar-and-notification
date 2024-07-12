self.addEventListener("push", (event) => {
  console.log("Push received.");

  const { title, text } = event.data.json();

  const options = {
    body: text,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
