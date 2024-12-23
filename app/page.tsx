"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CameraScreen from "./components/CameraScreen";
import ExplanationScreen from "./components/ExplanationScreen";
import HistoryDrawer from "./components/HistoryDrawer";
import { HistoryElement } from "./types/types";

export default function RootPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showExplanationScreen, setShowExplanationScreen] =
    useState<boolean>(false);
  const [latestPhoto, setLatestPhoto] = useState<string>("");
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [selectedHistoryElementIndex, setSelectedHistoryElementIndex] =
    useState<number | null>(null);

  useEffect(() => {
    // Add latest photo to history
    const newHistoryElement: HistoryElement = {
      timeImageTaken: new Date(),
      base64Image: latestPhoto,
      explanation: "",
    };
    setHistory([...history, newHistoryElement]);

    // Show ExplanationScreen
    setShowExplanationScreen(true);
  }, [latestPhoto]);

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <div>
      <Navbar toggleDrawer={toggleDrawer} />
      {showExplanationScreen ? (
        <ExplanationScreen
          history={history}
          setHistory={setHistory}
          selectedHistoryElementIndex={selectedHistoryElementIndex}
        />
      ) : (
        <CameraScreen setLatestPhoto={setLatestPhoto} />
      )}
      <HistoryDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        selectedHistoryElementIndex={selectedHistoryElementIndex}
        setSelectedHistoryElementIndex={setSelectedHistoryElementIndex}
      />
    </div>
  );
}
