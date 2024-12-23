import React from "react";
import { HistoryElement } from "../types/types";

interface ExplanationScreenProps {
  history: HistoryElement[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryElement[]>>;
  selectedHistoryElementIndex: number | null;
}

const ExplanationScreen: React.FC<ExplanationScreenProps> = ({
  history,
  setHistory,
  selectedHistoryElementIndex,
}) => {
  const currHistoryElement =
    selectedHistoryElementIndex !== null
      ? history[selectedHistoryElementIndex]
      : history[history.length - 1];

  return (
    <div>
      <img
        src={`data:image/jpeg;base64,${currHistoryElement.base64Image}`}
        alt="Captured"
      />
      <p>Taken on: {currHistoryElement.timeImageTaken.toLocaleString()}</p>
      {currHistoryElement.explanation && (
        <p>Explanation: {currHistoryElement.explanation}</p>
      )}
    </div>
  );
};

export default ExplanationScreen;
