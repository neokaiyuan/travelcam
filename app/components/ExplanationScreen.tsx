"use client";

import React, { useEffect } from "react";
import Image from "next/image";
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
  useEffect(() => {
    // Do nothing if no photos taken
    if (history.length === 0) {
      return;
    }

    // Do nothing if explanation already generated
    if (history[selectedHistoryElementIndex].explanation) {
      return;
    }

    // Fetch explanation of current image from OpenAI
    const fetchExplanation = async () => {
      // Do not fetch explanation if it is being or has already been fetched
      if (history[selectedHistoryElementIndex].isExplanationFetched) {
        return;
      }
      history[selectedHistoryElementIndex].isExplanationFetched = true;

      try {
        // Send the image to the API to get an explanation
        const response = await fetch("/api/explain", {
          method: "POST",
          body: JSON.stringify({
            base64Image: history[selectedHistoryElementIndex].base64Image,
          }),
        });

        if (!response.body) {
          throw new Error("Did not receive ReadableStream from API");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let explanation = "";

        // Decode the response stream and save it in local state
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

    fetchExplanation();
  }, [history, setHistory, selectedHistoryElementIndex]);

  if (history.length === 0) {
    console.error("Showing explanation screen before any photos taken");
    return null;
  }

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
    <div data-testid="explanation-screen">
      <Image
        src={currHistoryElement.base64Image}
        alt="Current Image"
        width={640}
        height={480}
      />
      <div className="explanation-container">
        <p>{formattedDate}</p>
        <br />
        {!currHistoryElement.explanation ? (
          <p>Fetching explanation...</p>
        ) : (
          <p className="explanation-text">{currHistoryElement.explanation}</p>
        )}
      </div>
    </div>
  );
};

export default ExplanationScreen;
