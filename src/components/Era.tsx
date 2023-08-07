// import React from "react";
import "./Era.css";

export const Era = ({ title }: { title: string }) => {
  return (
    <div className="eraContainer">
      <img src="/src/assets/link_impa.png" className="backgroundImgEra" />
      <div className="mask1" />
      <div className="mask2" />
      <div className="mask3" />
      <div className="mask4" />
      <h1 className="title">{title}</h1>
    </div>
  );
};