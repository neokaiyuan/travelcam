import React from "react";
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
  return (
    <>
      {isOpen && (
        <div className="drawer">
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
                      <p>{new Date(element.timeImageTaken).toLocaleString()}</p>
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
