import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  beforeAll(() => {
    // Mock the getUserMedia function
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: jest.fn().mockResolvedValue({
          getTracks: () => [{ stop: jest.fn() }],
        }),
      },
      writable: true,
    });
  });

  it("should render the CameraScreen component", () => {
    render(<HomePage />);

    // Assuming CameraScreen has a specific text or role you can query
    const cameraScreenElement = screen.getByTestId("camera-screen");
    expect(cameraScreenElement).toBeInTheDocument();
  });
});
