import React from "react";
import { FaCamera } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <div className="icon-bar long"></div>
        <div className="icon-bar short"></div>
      </div>
      <div className="navbar-title">Wandercam</div>
      <div className="navbar-camera-icon">
        <FaCamera size={24} color="white" />
      </div>
    </nav>
  );
}
