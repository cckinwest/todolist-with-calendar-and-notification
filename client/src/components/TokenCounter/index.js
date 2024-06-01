import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function TokenCounter() {
  const [isExpire, setIsExpire] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  let user;

  const token = localStorage.getItem("token");
  if (token) {
    user = jwtDecode(token);
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      if (token && Date.now() / 1000 < user.exp) {
        setTimeLeft(Math.round(user.exp - Date.now() / 1000));
      } else {
        setIsExpire(true);
        localStorage.removeItem("token");
        window.location.assign("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      {!isExpire && <p>TimeLeft: {timeLeft} seconds</p>}
      <p>{isExpire ? "Your token is expired." : "Your token is active."}</p>
    </div>
  );
}

export default TokenCounter;
