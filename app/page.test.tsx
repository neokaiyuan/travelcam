import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (fetch as jest.Mock).mockClear();
  });

  it("should render the CameraScreen component", () => {
    render(<HomePage />);

    // Assuming CameraScreen has a specific text or role you can query
    const cameraScreenElement = screen.getByTestId("camera-screen");
    expect(cameraScreenElement).toBeInTheDocument();
  });

  it("should display the ExplanationScreen when the shutter button is pressed", () => {
    render(<HomePage />);

    // Assuming the shutter button has a test ID of "shutter-button"
    const shutterButton = screen.getByTestId("shutter-button");
    fireEvent.click(shutterButton);

    // Assuming ExplanationScreen has a specific test ID you can query
    const explanationScreenElement = screen.getByTestId("explanation-screen");
    expect(explanationScreenElement).toBeInTheDocument();
  });
});
