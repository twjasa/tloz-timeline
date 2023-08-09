// import React from "react";
import "./Era.css";

export const Era = ({ title }: { title: string }) => {
  return (
    <div className="eraContainer">
      <div className="triangleContainer" />
      <div className="emptyTriangle" />
      <div className="line0" />
      <div className="line1" />
      <div className="line2" />
      <div className="line3" />
      <div className="innerContainer" style={{ overflow: "hidden" }}>
        <img src="/src/assets/link_impa.png" className="backgroundImgEra" />
        {/* <div className="mask3" /> */}
        {/* <div className="mask4" /> */}
        <h1 className="title">{title}</h1>
      </div>
    </div>
  );
};
