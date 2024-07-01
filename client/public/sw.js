self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  // Add a call to skipWaiting here if you want to trigger
  // the waiting service worker to become the active service worker immediately
  // self.skipWaiting();
});
