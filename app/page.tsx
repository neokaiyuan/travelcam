import React from "react";
import CameraScreen from "./components/CameraScreen";

function HomePage() {
  return (
    <div>
      <nav className="top-nav">{/* Navigation bar content */}</nav>
      <CameraScreen />
    </div>
  );
}

export default HomePage;
