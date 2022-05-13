import React from "react";
import { Button } from "react-bootstrap";
function Dialog({ message, onDialog, nameProduct }: any) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onDialog(false)}
    >
      <div
        className="bg-light"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "25%",
          left: "50%",
          // transform: "translate(-50%,-50%)",

          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ color: "#111", fontSize: "16px" }}>{message}</h3>
        <h1 style={{ color: "blue", fontSize: "24px" }}>{nameProduct}</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button className="btn-danger" onClick={() => onDialog(true)}>
            Yes
          </Button>
          <Button className="ml-4 btn-success" onClick={() => onDialog(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
