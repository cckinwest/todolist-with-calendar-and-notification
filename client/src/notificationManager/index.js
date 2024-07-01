class NotificationManager {
  checkIfNotificationSupported() {
    return "Notification" in window;
  }

  getNotificaionConsent() {
    if (self.checkIfNotificationSupported()) {
      Notification.requestPermission().then(
        (permission) => {
          return permission === "granted";
        },
        (err) => {
          console.log(`Error in requesting permission: ${err}`);
          return false;
        }
      );
    } else {
      console.log("Notification not supported!");
      return false;
    }
  }

  checkIfServiceWorkerSupported() {
    return "serviceWorker" in navigator;
  }

  registerServiceWorker(path) {
    if (self.checkIfServiceWorkerSupported()) {
      navigator.serviceWorker.register(path).then(
        (serviceWorkerRegistration) => {
          console.log(
            `Service Worker is registered with scope: ${serviceWorkerRegistration.scope}`
          );
          return serviceWorkerRegistration;
        },
        (err) => {
          console.log(`Error in registration: ${err}`);
          return null;
        }
      );
    } else {
      console.log("Service Worker not supported!");
      return null;
    }
  }

  subscribeNotificationPush(serviceWorkerRegistration, publicKey) {
    if (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager
        .subscribe({
          userVisibleOnly: true, //no slient push is allowed, i.e. no push message can be sent without showing the notification.
          applicationServerKey: publicKey, //the VAPID pair of public and private key are used to identify your app to which the user subscribe.
        })
        .then(
          //browser makes a network request to a push service who will generate the endpoint, which is unique to the user. Then the endpoint will be wrapped in the pushSubscription obj
          (pushSubscription) => {
            console.log(
              `Notification service is subscribed with endpoint: ${pushSubscription.endpoint}`
            );
            return pushSubscription;
          },
          (err) => {
            console.log(`Error in subscription: ${err}`);
            return null;
          }
        );
    } else {
      return null;
    }
  }
}

export default new NotificationManager();
