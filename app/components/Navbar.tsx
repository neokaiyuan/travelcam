import React from "react";
import { FaCamera, FaBars } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <FaBars size={24} color="white" />
      </div>
      <div className="navbar-title">Wandercam</div>
      <div className="navbar-camera-icon">
        <FaCamera size={24} color="white" />
      </div>
    </nav>
  );
}
