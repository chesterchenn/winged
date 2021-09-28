import React from "react";
import reactDOM from "react-dom";
import "./app.scss";

const ele = (
  <div>
    <div className="container">
    <div className="wrapper">Content</div>
    </div>
    <div className="container">
      <div className="quarter-sider">Header</div>
      <div className="quarter-content">Content</div>
    </div>
    <div className="container"> 
      <div className="quarter-content">Content</div>
      <div className="quarter-sider">Header</div>
    </div>
    <div className="container">
      <div className="third-sider">Header</div>
      <div className="third-content">Content</div>
    </div>
    <div className="container">
      <div className="third-content">Content</div>
      <div className="third-sider">Header</div>
    </div>
    <div className="container">
      <div className="third-sider">Header</div>
      <div className="third-sider">Header</div>
      <div className="third-sider">Header</div>
    </div>
    <div className="container"> 
      <div className="quarter-sider">Header</div>
      <div className="quarter-sider">Header</div>
      <div className="quarter-sider">Header</div>
      <div className="quarter-sider">Header</div>
    </div>
  </div>
);

reactDOM.render(ele, document.getElementById("root"));
