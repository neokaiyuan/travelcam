import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HistoryElement } from "../types/types"; // Ensure this import is correct

interface HistoryDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  history: HistoryElement[];
  selectedHistoryElementIndex: number | null;
  setSelectedHistoryElementIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  toggleDrawer,
  selectedHistoryElementIndex,
  setSelectedHistoryElementIndex,
  history,
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
            {history.map((element, index) => (
              <button
                key={index}
                onClick={() => setSelectedHistoryElementIndex(index)}
                className="history-element"
              >
                <img
                  src={element.base64Image}
                  alt="History Image Thumbnail"
                  className="thumbnail"
                />
                <div className="text-container">
                  <p>{new Date(element.timeImageTaken).toLocaleString()}</p>
                  <p className="single-line-text">
                    {element.explanation.replace(/\n/g, " ")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryDrawer;
