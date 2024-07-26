export const getNotificationConsent = async () => {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
      console.log(`Permission status: ${Notification.permission}`);
      window.location.reload();
    } else {
      console.log(`Notifcation is ${Notification.permission}.`);
    }

    return Notification.permission;
  } else {
    console.error("Notification is not supported!");

    return "not supported";
  }
};

export const serviceWorkerRegistration = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const swReg = await navigator.serviceWorker.getRegistration();
      if (swReg) {
        console.log(
          `Service Worker has already been registered with scope: ${swReg.scope}`
        );
        return swReg;
      } else {
        try {
          const registration = await navigator.serviceWorker.register(
            "./sw.js"
          );
          console.log(
            `Service Worker registered with scope: ${registration.scope}`
          );
          return registration;
        } catch (err) {
          console.log(`There are some errors: ${err}`);
        }
      }
    } catch (err) {
      console.error(`There are some errors: ${err}`);
      return null;
    }
  } else {
    console.error("Service Worker is not supported!");
    return null;
  }
};

export const notificationSubscription = async () => {
  try {
    const swReg = await navigator.serviceWorker.ready;
    console.log(`A service worker is active: ${swReg.active}`);

    const pushSubscription = await swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC,
    });

    console.log(
      `The subscription is success with endpoint: ${pushSubscription.endpoint}`
    );

    return pushSubscription;
  } catch (err) {
    console.error(`There are some errors: ${err}`);
    return null;
  }
};
