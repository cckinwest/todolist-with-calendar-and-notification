import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

if ("Notification" in window) {
  Notification.requestPermission().then((res) => {
    const msg =
      res === "granted" ? "Notification granted!" : "Notification denied!";

    const notification = new Notification(msg);
  });
} else {
  console.log("Notification not supported.");
}

if ("serviceWorker" in navigator) {
  console.log("Service worker supported!");
  navigator.serviceWorker.register("/sw.js").then(
    (swRegistration) => {
      swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC,
        })
        .then(
          (pushSubscription) => {
            console.log(`Subscription endpoint: ${pushSubscription.endpoint}`);
          },
          (error) => {
            console.log(`There are errors in subscription. ${error}`);
          }
        );
    },
    (error) => {
      console.log(`Registration failure: ${error}`);
    }
  );
} else {
  console.log("Service worker is not supported!");
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
