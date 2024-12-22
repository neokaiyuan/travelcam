"use client";

import React, { useState } from "react";
import CameraScreen from "./components/CameraScreen";
import HistoryDrawer from "./components/HistoryDrawer";
import Navbar from "./components/Navbar";

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <div>
      <Navbar />
      <CameraScreen />
      <HistoryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
