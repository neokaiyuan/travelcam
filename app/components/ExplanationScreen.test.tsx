import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ExplanationScreen from "./ExplanationScreen"; // Adjust the import path as necessary
import { HistoryElement } from "../types/types";

describe("ExplanationScreen", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (fetch as jest.Mock).mockClear();
  });

  it("should render the API response on the ExplanationScreen", async () => {
    // Mock props with explicit types
    const mockHistory: Array<HistoryElement> = [
      {
        timeImageTaken: new Date(),
        base64Image: "mockImageData",
        explanation: "mockExplanation",
        isExplanationFetched: true,
      },
    ];
    const mockSetHistory = jest.fn();
    const mockSelectedHistoryElementIndex = 0;

    // Render the ExplanationScreen with mocked props
    render(
      <ExplanationScreen
        history={mockHistory}
        setHistory={mockSetHistory}
        selectedHistoryElementIndex={mockSelectedHistoryElementIndex}
      />
    );

    // Wait for the ExplanationScreen to appear
    const explanationScreenElement = await screen.findByTestId(
      "explanation-screen"
    );

    // Check if the explanation text is rendered
    await waitFor(() => {
      expect(explanationScreenElement).toHaveTextContent("mockExplanation");
    });
  });
});
