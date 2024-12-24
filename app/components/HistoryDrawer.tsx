"use client";

import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HistoryElement } from "../types/types";
import "./HistoryDrawer.css";

interface HistoryDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  history: HistoryElement[];
  selectedHistoryElementIndex: number;
  selectHistoryElement: (index: number) => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  toggleDrawer,
  history,
  selectedHistoryElementIndex,
  selectHistoryElement,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        toggleDrawer();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDrawer]);

  return (
    <>
      {isOpen && (
        <div ref={drawerRef} className="drawer">
          <div className="drawer-header">
            <h2 className="drawer-title">History</h2>
            <button onClick={toggleDrawer} className="drawer-close-button">
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div>
            {history.length === 0 ? (
              <p className="no-history-message">
                It looks like you have no history yet! Take a picture to see it
                in your history drawer.
              </p>
            ) : (
              history
                .slice() // Copy the array to avoid modifying the original history array
                .reverse() // Reverse the array to display in reverse chronological order
                .map((element, index) => (
                  <button
                    key={index}
                    onClick={() => selectHistoryElement(index)}
                    className={`history-element ${
                      selectedHistoryElementIndex === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={element.base64Image}
                      alt="History Image Thumbnail"
                      className="thumbnail"
                    />
                    <div className="text-container">
                      <p>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short", // 3-letter month abbreviation
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }).format(new Date(element.timeImageTaken))}
                      </p>
                      <p className="preview-text">
                        {element.explanation.replace(/\n/g, " ")}
                      </p>
                    </div>
                  </button>
                ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryDrawer;
