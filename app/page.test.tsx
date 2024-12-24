import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (fetch as jest.Mock).mockClear();
  });

  it("should render CameraScreen component on initial load", () => {
    render(<HomePage />);

    // Assuming CameraScreen has a specific text or role you can query
    const cameraScreenElement = screen.getByTestId("camera-screen");
    expect(cameraScreenElement).toBeInTheDocument();
  });

  it("should display ExplanationScreen after shutter button pressed", async () => {
    render(<HomePage />);

    // Assuming the shutter button has a test ID of "shutter-button"
    const shutterButton = screen.getByTestId("shutter-button");

    // Wrap the click event in act to simulate browser behavior
    await act(async () => {
      fireEvent.click(shutterButton);
    });

    // Assuming ExplanationScreen has a specific test ID you can query
    const explanationScreenElement = screen.getByTestId("explanation-screen");
    expect(explanationScreenElement).toBeInTheDocument();
  });

  it("should show streamed explanation text on ExplanationScreen after shutter button pressed", async () => {
    render(<HomePage />);

    // Assuming the shutter button has a test ID of "shutter-button"
    const shutterButton = screen.getByTestId("shutter-button");

    // Wrap the click event in act to simulate browser behavior
    await act(async () => {
      fireEvent.click(shutterButton);
    });

    // Wait for the ExplanationScreen to appear
    const explanationScreenElement = await screen.findByTestId(
      "explanation-screen"
    );

    // Verify the mock explanation is rendered
    await waitFor(() => {
      expect(explanationScreenElement).toHaveTextContent("Mock explanation");
    });
  });
});

describe("Navigation Bar", () => {
  test("opens history drawer on drawer button press", () => {
    render(<HomePage />);

    const drawerButton = screen.getByTestId("drawer-button");
    fireEvent.click(drawerButton);

    const historyDrawer = screen.getByTestId("history-drawer");
    expect(historyDrawer).toBeVisible();
  });
});
