"use client";

import React, { useState } from "react";
import OpenAI from "openai";
import CameraScreen from "./components/CameraScreen";
import HistoryDrawer from "./components/HistoryDrawer";
import Navbar from "./components/Navbar";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default function RootPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <div>
      <Navbar toggleDrawer={toggleDrawer} />
      <CameraScreen />
      <HistoryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}
