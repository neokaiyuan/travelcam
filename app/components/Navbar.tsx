import React from "react";
import { FaCamera, FaBars } from "react-icons/fa";

interface NavbarProps {
  toggleDrawer: () => void;
}

export default function Navbar({ toggleDrawer }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <button onClick={toggleDrawer}>
          <FaBars size={24} color="white" />
        </button>
      </div>
      <div className="navbar-title">Wandercam</div>
      <div className="navbar-camera-icon">
        <FaCamera size={24} color="white" />
      </div>
    </nav>
  );
}
