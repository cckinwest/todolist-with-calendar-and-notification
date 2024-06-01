import React from "react";
import { useState, useEffect } from "react";

function ExpireForm({ limit }) {
  const [remain, setRemain] = useState(limit);
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (remain > 0) {
        setRemain(remain - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const outlayStyle = {
    backgroundColor: "white",
    opacity: 0.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formStyle = {
    backgroundColor: "#FAF9F6",
    padding: "20px",
    height: "50vh",
    width: "33vw",
  };

  const formClose = () => {
    setIsClose(true);
  };

  return (
    <div>
      {!isClose && (
        <div className="outlay" style={outlayStyle}>
          {remain > 0 ? (
            <div className="expireForm" style={formStyle}>
              <p>Your token is active for {remain} seconds.</p>
              <button>Reactivate the token</button>
            </div>
          ) : (
            <div className="expireForm" style={formStyle}>
              <p>Your token is expired.</p>
              <button>Login again</button>
            </div>
          )}
          <button className="formClose" onClick={formClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpireForm;
