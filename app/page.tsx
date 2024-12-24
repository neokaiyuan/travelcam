"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import CameraScreen from "./components/CameraScreen";
import ExplanationScreen from "./components/ExplanationScreen";
import HistoryDrawer from "./components/HistoryDrawer";
import { HistoryElement } from "./types/types";
import "./page.css";

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [showExplanationScreen, setShowExplanationScreen] =
    useState<boolean>(false);
  const [history, setHistory] = useState<HistoryElement[]>([]);
  const [selectedHistoryElementIndex, setSelectedHistoryElementIndex] =
    useState<number>(-1); // -1 means no selected history element; it does not access last element in array

  // Autoscroll when generated explanation exceeds screen height
  const homePageRef = useRef<HTMLDivElement>(null);
  const currentExplanation = history[selectedHistoryElementIndex]?.explanation;
  useEffect(() => {
    if (homePageRef.current) {
      homePageRef.current.scrollTop = homePageRef.current.scrollHeight;
    }
  }, [currentExplanation]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const showCamera = () => {
    setIsDrawerOpen(false);
    setShowExplanationScreen(false);
  };

  const saveLatestPhoto = (base64Image: string) => {
    // Add latest photo to history
    const newHistoryElement: HistoryElement = {
      timeImageTaken: new Date(),
      base64Image: base64Image,
      explanation: "",
      isExplanationFetched: false,
    };
    setHistory([...history, newHistoryElement]);
    // Select the latest photo in history drawer
    setSelectedHistoryElementIndex(history.length); // The history variable in this context has not been updated with the new element yet
    // Show explanation screen
    setShowExplanationScreen(true);
  };

  // Select a history element to show its explanation
  const selectHistoryElement = (index: number) => {
    setSelectedHistoryElementIndex(index);
    setIsDrawerOpen(false);
    setShowExplanationScreen(true);
  };

  return (
    <div ref={homePageRef} className="home-page-container">
      <Navbar toggleDrawer={toggleDrawer} showCamera={showCamera} />
      {showExplanationScreen ? (
        <ExplanationScreen
          history={history}
          setHistory={setHistory}
          selectedHistoryElementIndex={selectedHistoryElementIndex}
        />
      ) : (
        <CameraScreen saveLatestPhoto={saveLatestPhoto} />
      )}
      <HistoryDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        history={history}
        selectedHistoryElementIndex={selectedHistoryElementIndex}
        selectHistoryElement={selectHistoryElement}
      />
    </div>
  );
}
