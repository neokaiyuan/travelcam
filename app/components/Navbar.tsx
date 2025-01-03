import React from "react";
import { FaCamera, FaBars } from "react-icons/fa";
import "./Navbar.css";

interface NavbarProps {
  toggleDrawer: () => void;
  showCamera: () => void;
}

export default function Navbar({ toggleDrawer, showCamera }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-icon">
        <button onClick={toggleDrawer} data-testid="drawer-button">
          <FaBars size={24} />
        </button>
      </div>
      <div className="navbar-title">Travelcam</div>
      <div className="navbar-icon">
        <button onClick={showCamera}>
          <FaCamera size={24} />
        </button>
      </div>
    </nav>
  );
}
