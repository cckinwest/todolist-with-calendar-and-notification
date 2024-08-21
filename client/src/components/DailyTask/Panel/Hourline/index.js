import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Hourline({ hour }) {
  const h = hour;

  const style = {
    position: "absolute",
    width: "100%",
    top: `calc(${h} * 100%/24)`,
    textAlign: "center",
  };

  return (
    <div style={style}>
      <hr style={{ margin: "0", left: "0", borderTop: "1px solid grey" }} />
      <p
        style={{
          margin: "0",
          top: `calc(${h} * 100%/24)`,
          left: `calc(50%)`,
          transform: "translate(-50%, -50%)",
          position: "absolute",
          padding: "5px",
          color: "grey",
        }}
        className="bg-light"
      >
        {h < 12 ? `${h}AM` : h > 12 ? `${h - 12}PM` : "12PM"}
      </p>
    </div>
  );
}

export default Hourline;
