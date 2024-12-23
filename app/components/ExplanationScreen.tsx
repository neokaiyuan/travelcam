import React, { useEffect } from "react";
import { HistoryElement } from "../types/types";
import "./ExplanationScreen.css";

interface ExplanationScreenProps {
  history: HistoryElement[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryElement[]>>;
  selectedHistoryElementIndex: number;
}

const ExplanationScreen: React.FC<ExplanationScreenProps> = ({
  history,
  setHistory,
  selectedHistoryElementIndex,
}) => {
  if (history.length === 0) {
    console.error("Showing explanation screen before any photos taken");
    return null;
  }

  // Fetch explanation of current image from OpenAI
  const fetchExplanation = async () => {
    // Do not fetch explanation if it is being or has already been fetched
    if (history[selectedHistoryElementIndex].isExplanationFetched) {
      return;
    }
    history[selectedHistoryElementIndex].isExplanationFetched = true;

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        body: JSON.stringify({
          base64Image: history[selectedHistoryElementIndex].base64Image,
        }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let explanation = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Extract the relevant text content from the chunk
        const textContent = chunk
          .split("\n") // Each chunk can have multiple lines
          .filter((line) => line.startsWith("0")) // 0 means model response text
          // Remove leading 0:" and trailing " characters, and replace \n with actual newline character
          .map((line) => line.slice(3, -1).replaceAll("\\n", "\n"))
          .join("");

        explanation += textContent;

        // Update the history with the new explanation chunk
        setHistory((prevHistory) =>
          prevHistory.map((element, index) =>
            index === selectedHistoryElementIndex
              ? { ...element, explanation }
              : element
          )
        );
      }
    } catch (error) {
      history[selectedHistoryElementIndex].isExplanationFetched = false;
      console.error("Failed to fetch explanation:", error);
    }
  };

  // Use useEffect to only trigger this logic when selectedHistoryElementIndex changes
  useEffect(() => {
    // Do nothing if explanation already generated
    if (history[selectedHistoryElementIndex].explanation) {
      return;
    }
    fetchExplanation();
  }, [selectedHistoryElementIndex]);

  const currHistoryElement = history[selectedHistoryElementIndex];
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(currHistoryElement.timeImageTaken);

  return (
    <div>
      <img src={currHistoryElement.base64Image} alt="Current Image" />
      <div className="explanation-container">
        <p>{formattedDate}</p>
        <br />
        {currHistoryElement.explanation && (
          <p className="explanation-text">{currHistoryElement.explanation}</p>
        )}
      </div>
    </div>
  );
};

export default ExplanationScreen;
