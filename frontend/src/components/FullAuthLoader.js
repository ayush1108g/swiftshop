import React from "react";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";

const FullAuthLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
          width: "40vw",
          backgroundColor: "white",
          borderRadius: "10px",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            color: "black",
          }}
        >
          <h1>Authenticating &nbsp;</h1>
        </div>
        <Loader visible={true} distance={10} />
      </div>
    </div>
  );
};

export default FullAuthLoader;
