import React from "react";
import { useState } from "react";

import { Button } from "react-bootstrap";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  window.addEventListener("beforeinstallprompt", (e) => {
    setDeferredPrompt(e);
  });

  const handleClick = () => {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the add to home screen prompt");
      } else {
        console.log("User dismissed the add to home screen prompt");
      }

      setDeferredPrompt(null);
    });
  };

  return (
    deferredPrompt && (
      <Button variant="outline-success" onClick={handleClick}>
        Add to home screen
      </Button>
    )
  );
}

export default InstallButton;
